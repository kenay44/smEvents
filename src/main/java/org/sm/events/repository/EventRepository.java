package org.sm.events.repository;

import org.sm.events.domain.Event;
import org.sm.events.domain.enumeration.EventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


/**
 * Spring Data JPA repository for the Event entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("select event from Event event where (event.signUpStartDate < :today " +
        "or (event.signUpStartDate = :today and event.signUpStartTime < :now))" +
        "and event.eventType not like :eventType ")
    Page<Event> findAllPublishedNotOfType(Pageable pageable,
                                          @Param("today") LocalDate today, @Param("now") LocalTime now,
                                          @Param("eventType") EventType eventType);

    @Query("select event from Event event where (event.signUpStartDate < :today " +
        "or (event.signUpStartDate = :today and event.signUpStartTime < :now)) " +
        "and event.eventType = :eventType")
    Page<Event> findAllPublishedOfType(Pageable pageable,
                                        @Param("today") LocalDate today, @Param("now") LocalTime now,
                                        @Param("eventType") EventType eventType);
}
