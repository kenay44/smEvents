package org.sm.events.repository;

import org.sm.events.domain.Event;
import org.sm.events.domain.Participant;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.domain.enumeration.ParticipantType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


/**
 * Spring Data JPA repository for the Participant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    List<Participant> findAllByEventIdAndStatusOrderBySignedDateAscIdAsc(Long eventId, ParticipantStatus status);

    Participant findTopByEventIdAndStatusAndParticipantTypeOrderBySignedDateAscIdAsc(Long eventId, ParticipantStatus status, ParticipantType type);

    Participant findOneByPersonIdAndEventIdAndStatus(Long id, Long eventId, ParticipantStatus status);

    Participant findOneByPersonIdAndEventId(Long id, Long eventId);

    @Query("Select participant from Participant participant inner join participant.event e " +
        "where e.id <> :eventId and participant.person.id = :personId " +
        "and (e.startDate <= :endDate and e.endDate >= :startDate) " +
        "and participant.participantType = :participantType and participant.status = :signed")
    List<Participant> finAllOthersByPersonIdAndEventTimeFrame(@Param("personId") Long personId,
                                                              @Param("startDate") LocalDate startDate,
                                                              @Param("endDate") LocalDate endDate,
                                                              @Param("eventId") Long eventId,
                                                              @Param("participantType") ParticipantType participantType,
                                                              @Param("signed") ParticipantStatus signed);

    @EntityGraph(value = "Participant.detail", type = EntityGraph.EntityGraphType.FETCH, attributePaths = "person.family")
    List<Participant> findAllByEventIdAndStatusOrderBySignedDate(Long id, ParticipantStatus signed);

    Long countByEventAndStatus(Event event, ParticipantStatus status);

    Long countByEvent(Event event);
}
