package org.sm.events.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sm.events.domain.*;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.domain.enumeration.ParticipantType;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.domain.enumeration.Task;
import org.sm.events.repository.EventRepository;
import org.sm.events.repository.FamilyRepository;
import org.sm.events.repository.ParticipantRepository;
import org.sm.events.repository.PersonRepository;
import org.sm.events.security.AuthoritiesConstants;
import org.sm.events.security.SecurityUtils;
import org.sm.events.service.MailService;
import org.sm.events.service.ParticipantService;
import org.sm.events.service.PersonService;
import org.sm.events.service.UserService;
import org.sm.events.service.dto.EventDTO;
import org.sm.events.service.dto.ParticipantDTO;
import org.sm.events.service.dto.PersonDTO;
import org.sm.events.service.mapper.EventMapper;
import org.sm.events.service.mapper.ParticipantMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.function.BiConsumer;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Participant.
 */
@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    private final Logger log = LoggerFactory.getLogger(ParticipantServiceImpl.class);

    private final ParticipantRepository participantRepository;

    private final ParticipantMapper participantMapper;

    private final PersonService personService;

    private final UserService userService;

    private final EventRepository eventRepository;

    private final PersonRepository personRepository;

    private final EventMapper eventMapper;

    private final MailService mailService;

    public ParticipantServiceImpl(ParticipantRepository participantRepository, ParticipantMapper participantMapper, PersonService personService, UserService userService, EventRepository eventRepository, PersonRepository personRepository, EventMapper eventMapper, MailService mailService) {
        this.participantRepository = participantRepository;
        this.participantMapper = participantMapper;
        this.personService = personService;
        this.userService = userService;
        this.eventRepository = eventRepository;
        this.personRepository = personRepository;
        this.eventMapper = eventMapper;
        this.mailService = mailService;
    }

    /**
     * Save a participant.
     *
     * @param participant the entity to save
     * @return the persisted entity
     */
    @Override
    public ParticipantDTO save(Participant participant) {
        log.debug("Request to save Participant : {}", participant);
        participant = participantRepository.save(participant);
        return participantMapper.toDto(participant);
    }

    @Override
    @Transactional
    public Long createParticipants(Collection<ParticipantDTO> participantDTOs) {
        log.debug("Request to create Participants : {}", participantDTOs);
        Long eventId = ((ParticipantDTO)participantDTOs.toArray()[0]).getEventId() ;
        EventDTO eventDto = eventMapper.toDto(eventRepository.findOne(eventId));
        participantDTOs.stream().map(u -> createParticipant(eventDto, u))
            .filter(Objects::nonNull)
            .forEach(participant -> {
                if(eventDto.getEventType().isSendEmailAutomaticly()) {
                    notifyParticipant(participant, mailService::sendEventSignUpEmail);
                }
            });
        return eventId;
    }

    public Participant createParticipant(EventDTO eventDto, ParticipantDTO u) {
        Participant participant = participantRepository.findOneByPersonIdAndEventId(u.getPersonId(), eventDto.getId());
        if(participant != null && ParticipantStatus.SIGNED.equals(participant.getStatus()))
            return null;

        if(participant == null) {
            participant = participantMapper.toEntity(u);
        }
        participant.setRole(Task.ROOK);
        participant.setSignedDate(ZonedDateTime.now());
        participant.setStatus(ParticipantStatus.SIGNED);
        participant.setChangedBy(null);
        participant.setStatusChanged(null);
        Participant result = participantRepository.save(participant);
        List<Participant> participants = participantRepository
            .findAllByEventIdAndStatusOrderBySignedDateAscIdAsc(eventDto.getId(), ParticipantStatus.SIGNED);
        int position = participants.indexOf(result);
        if(position < eventDto.getMaxParticipants()) {
            result.setParticipantType(ParticipantType.PRIMARY);
        } else {
            result.setParticipantType(ParticipantType.RESERVE);
        }
        participant = participantRepository.save(result);
        List<Participant> otherParticipationsInSameTime = findAllOthersForPersonEndEventTimeFrame(u.getPersonId(), eventDto);
        otherParticipationsInSameTime.stream().forEach(v -> removeChildFromEvent(v.getId()));
        return participant;
    }

    @Override
    public ParticipantDTO saveDto(ParticipantDTO participantDTO) {
        Participant participant = participantMapper.toEntity(participantDTO);
        return save(participant);
    }

    /**
     * Get all the participants.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ParticipantDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Participants");
        return participantRepository.findAll(pageable)
            .map(participantMapper::toDto);
    }

    @Override
    public List<ParticipantDTO> findAllForEvent(Long id, ParticipantStatus status) {
        log.debug("Request to get all participants for the event: {}", id);
        List<ParticipantDTO> eventParticipants = participantRepository.findAllByEventIdAndStatusOrderBySignedDate(id, status)
            .stream().map(participantMapper::toDto)
            .collect(Collectors.toList());
        if(!SecurityUtils.isAuthenticated() || !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.PARENT))
            return eventParticipants;

        PersonDTO parentDto = personService.findOneByCurrentUser();
        List<Long> childrenIds = personService
            .findAllByFamilyIdAndPersonTypeOrderByFirstName(parentDto.getFamilyId(), PersonType.CHILD)
            .stream().map(u -> u.getId())
            .collect(Collectors.toList());

        List<ParticipantDTO> removableParticipants = eventParticipants.stream()
            .map(u -> {
                if(childrenIds.contains(u.getPersonId())) {
                    u.setCanRemove(true);
                }
                return u;
            }).collect(Collectors.toList());
        return removableParticipants;
    }

    /**
     * Get one participant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ParticipantDTO findOne(Long id) {
        log.debug("Request to get Participant : {}", id);
        Participant participant = participantRepository.findOne(id);
        return participantMapper.toDto(participant);
    }

    /**
     * Delete the participant by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Participant : {}", id);
        participantRepository.delete(id);
    }

    @Override
    public Participant findOneByPersonIdAndEventIdAndStatus(Long id, Long eventId, ParticipantStatus status) {
        return participantRepository.findOneByPersonIdAndEventIdAndStatus(id, eventId, status);
    }

    /**
     * Finds all other participations for which the person (personId) is signed and their time frame is colliding with
     * this event (eventDto) and where the person is signed as a primary participant and not removed
     *
     * @param personId id of the person - participations we are looking for
     * @param eventDto even for which we are checking if  others are colliding
     * @return list of colliding participations
     */
    @Override
    public List<Participant> findAllOthersForPersonEndEventTimeFrame(Long personId, EventDTO eventDto) {
        return participantRepository.finAllOthersByPersonIdAndEventTimeFrame(personId, eventDto.getStartDate(),
            eventDto.getEndDate(), eventDto.getId(), ParticipantType.PRIMARY, ParticipantStatus.SIGNED);
    }

    @Override
    @Transactional
    public void removeChildFromEvent(Long participantId) {
        Participant participant = participantRepository.findOne(participantId);
        ParticipantType type = participant.getParticipantType();
        if(personService.isCurrentUserParentOf(participant) || SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            participant.setStatus(ParticipantStatus.REMOVED);
            participant.setParticipantType(null);
            participant.setStatusChanged(ZonedDateTime.now());
            User user = userService.getUserWithAuthorities().get();
            participant.setChangedBy(user);
            participantRepository.save(participant);
            if(ParticipantType.PRIMARY.equals(type)) {
                updateExistingParticipants(participant.getEvent());
            }

        }
    }

    private void updateExistingParticipants(Event event) {
        log.debug("Updating top participant in reserve for event [{}]: {}", event.getId(), event.getTitle());
        Participant participant = participantRepository
            .findTopByEventIdAndStatusAndParticipantTypeOrderBySignedDateAscIdAsc(event.getId(), ParticipantStatus.SIGNED, ParticipantType.RESERVE);
        if(participant != null) {
            log.debug("Moving participant [{}]: {} from reserve to primary", participant.getId(),
                participant.getPerson().getFirstName() + " " + participant.getPerson().getLastName());
            participant.setParticipantType(ParticipantType.PRIMARY);
            participant = participantRepository.save(participant);
            notifyParticipant(participant, mailService::sendEventSignUpEmail);
        }
    }

    @Override
    public List<PersonDTO> validateParticipants(List<PersonDTO> children, Long eventId) {
        EventDTO eventDto = eventMapper.toDto(eventRepository.findOne(eventId));
        for(PersonDTO child : children) {
            List<Participant> otherAssignments = findAllOthersForPersonEndEventTimeFrame(child.getId(), eventDto);
            if(otherAssignments.size() > 0) {
                List<String> otherEvents = otherAssignments.stream()
                    .map(u -> u.getEvent().getTitle())
                    .collect(Collectors.toList());
                child.setOtherEvents(otherEvents);
            }
        }
        return children;
    }

    @Override
    public Long countParticipants(Event event, ParticipantStatus status) {
        if(status != null)
        {
            return participantRepository.countByEventAndStatus(event, status);
        }
        return participantRepository.countByEvent(event);
    }

    @Override
    @Async
    public void notifyParticipants(Long eventId) {
        List<Participant> participants = participantRepository.findAllByEventIdAndStatusOrderBySignedDate(eventId, ParticipantStatus.SIGNED);
        participants.stream().forEach(participant -> {
            notifyParticipant(participant, mailService::sendEventSignUpEmail);
            try {
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

    }

    @Async
    @Transactional
    public void notifyParticipant(Participant participant, BiConsumer<User, Participant> sender) {
        Person child = personRepository.findOne(participant.getPerson().getId());
        Person parent = personService.findParentForFamily(child.getFamily().getId());
        sender.accept(parent.getUser(), participant);
    }
}
