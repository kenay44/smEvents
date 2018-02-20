package org.sm.events.service.impl;

import org.sm.events.domain.User;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.domain.enumeration.Task;
import org.sm.events.security.AuthoritiesConstants;
import org.sm.events.security.SecurityUtils;
import org.sm.events.service.EventService;
import org.sm.events.service.ParticipantService;
import org.sm.events.domain.Participant;
import org.sm.events.repository.ParticipantRepository;
import org.sm.events.service.PersonService;
import org.sm.events.service.UserService;
import org.sm.events.service.dto.EventDTO;
import org.sm.events.service.dto.ParticipantDTO;
import org.sm.events.service.dto.PersonDTO;
import org.sm.events.service.mapper.ParticipantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
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

    private final EventService eventService;

    public ParticipantServiceImpl(ParticipantRepository participantRepository, ParticipantMapper participantMapper, PersonService personService, UserService userService, EventService eventService) {
        this.participantRepository = participantRepository;
        this.participantMapper = participantMapper;
        this.personService = personService;
        this.userService = userService;
        this.eventService = eventService;
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
    public Long createParticipants(Collection<ParticipantDTO> participantDTOs) {
        Long eventId = ((ParticipantDTO)participantDTOs.toArray()[0]).getEventId() ;
        EventDTO eventDto = eventService.findOne(eventId);
        participantDTOs.stream().forEach(u -> {
            Participant participant = participantRepository.findOneByPersonIdAndEventId(u.getPersonId(), eventId);
            if(participant != null && ParticipantStatus.SIGNED.equals(participant.getStatus()))
                return;

            if(participant == null) {
                participant = participantMapper.toEntity(u);
            }
            participant.setRole(Task.ROOK);
            participant.setSignedDate(ZonedDateTime.now());
            participant.setStatus(ParticipantStatus.SIGNED);
            participant.setChangedBy(null);
            participant.setStatusChanged(null);
            ParticipantDTO result = save(participant);
            List<Participant> otherEventsInSameTime = findAllOthersForPersonEndEventTimeFrame(u.getPersonId(), eventDto, result.getId());
            otherEventsInSameTime.stream().forEach(v -> delete(v.getId()));
        });
        return eventId;
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

    @Override
    public List<Participant> findAllOthersForPersonEndEventTimeFrame(Long personId, EventDTO eventDto, Long participantId) {
        return participantRepository.finAllOthersByPersonIdAndEventTimeFrame(personId, eventDto.getStartDate(), eventDto.getEndDate(), participantId);
    }

    @Override
    @Transactional
    public void removeChildFromEvent(Long participantId) {
        Participant participant = participantRepository.findOne(participantId);
        if(personService.isCurrentUserParentOf(participant)) {
            participant.setStatus(ParticipantStatus.REMOVED);
            participant.setStatusChanged(ZonedDateTime.now());
            User user = userService.getUserWithAuthorities().get();
            participant.setChangedBy(user);
            participantRepository.save(participant);
        }
    }
}
