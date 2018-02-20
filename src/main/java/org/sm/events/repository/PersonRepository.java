package org.sm.events.repository;

import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.service.dto.PersonDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findOneByUser(User user);

    Page<Person> findAllByFamilyId(Long familyId, Pageable pageable);

    List<Person> findAllByFamilyIdAndPersonType(Long familyId, PersonType personType);

    Person findOneByUserLogin(String login);
}
