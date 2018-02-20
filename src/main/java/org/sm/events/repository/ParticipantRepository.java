package org.sm.events.repository;

import org.sm.events.domain.Participant;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.service.dto.EventDTO;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the Participant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByEventId(Long id);

    Participant findOneByPersonIdAndEventIdAndStatus(Long id, Long eventId, ParticipantStatus status);

    Participant findOneByPersonIdAndEventId(Long id, Long eventId);

    Participant findAllByPersonId(Long id);

    @Query("Select participant from Participant participant inner join participant.event e " +
        "where participant.id <> :participantId and participant.person.id = :personId " +
        "and (e.startDate <= :endDate and e.endDate >= :startDate)")
    List<Participant> finAllOthersByPersonIdAndEventTimeFrame(@Param("personId") Long personId,
                                                              @Param("startDate") ZonedDateTime startDate,
                                                              @Param("endDate") ZonedDateTime endDate,
                                                              @Param("participantId") Long participantId);

    List<Participant> findAllByEventIdAndStatusOrderBySignedDate(Long id, ParticipantStatus signed);
}
