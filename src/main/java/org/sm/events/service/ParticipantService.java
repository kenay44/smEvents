package org.sm.events.service;

import org.sm.events.domain.Participant;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.service.dto.EventDTO;
import org.sm.events.service.dto.ParticipantDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;

/**
 * Service Interface for managing Participant.
 */
public interface ParticipantService {

    /**
     * Save a participant.
     *
     * @param participant the entity to save
     * @return the persisted entity
     */
    ParticipantDTO save(Participant participant);

    /**
     * Get all the participants.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ParticipantDTO> findAll(Pageable pageable);

    /**
     * Get all participants for the event.
     *
     * @return the list of entities
     */
    List<ParticipantDTO> findAllForEvent(Long id, ParticipantStatus status);

    /**
     * Get the "id" participant.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ParticipantDTO findOne(Long id);

    /**
     * Delete the "id" participant.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    List<Participant> findAllOthersForPersonEndEventTimeFrame(Long personId, EventDTO eventDto, Long participantId);

    void removeChildFromEvent(Long participantId);

    Long createParticipants(Collection<ParticipantDTO> participantDTOs);

    ParticipantDTO saveDto(ParticipantDTO participantDTO);

    Participant findOneByPersonIdAndEventIdAndStatus(Long id, Long eventId, ParticipantStatus signed);
}
