package org.sm.events.repository;

import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findOneByUser(User user);
}
