package org.sm.events.service;

import io.undertow.util.BadRequestException;
import org.sm.events.domain.Family;
import org.sm.events.domain.Participant;
import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.service.dto.FamilyDTO;
import org.sm.events.service.dto.PersonDTO;
import org.sm.events.web.rest.errors.BadRequestAlertException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.List;

/**
 * Service Interface for managing Person.
 */
public interface PersonService {

    /**
     * Save a person.
     *
     * @param personDTO the entity to save
     * @return the persisted entity
     */
    PersonDTO save(PersonDTO personDTO);

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PersonDTO> findAll(Pageable pageable);

    /**
     * Get the "id" person.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PersonDTO findOne(Long id);

    /**
     * Delete the "id" person.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    PersonDTO findOneByUser(User user);

    PersonDTO findOneByCurrentUser();

    PersonDTO createChild(PersonDTO personDTO) throws BadRequestAlertException;

    Page<PersonDTO> findAllByFamilyId(Pageable pageable, Long familyId);

    List<PersonDTO> findAllByFamilyIdAndPersonTypeOrderByFirstName(Long familyId, PersonType personType);

    boolean isCurrentUserParentOf(Participant participant);

    PersonDTO findOneWithCurrentUserAsParent(Long id);

    PersonDTO updateChild(PersonDTO personDTO);

    Person findParentForFamily(Long familyId);
}
