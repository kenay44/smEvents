package org.sm.events.service;

import org.sm.events.domain.Family;
import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.sm.events.service.dto.FamilyDTO;
import org.sm.events.service.dto.PersonDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Family.
 */
public interface FamilyService {

    /**
     * Save a family.
     *
     * @param familyDTO the entity to save
     * @return the persisted entity
     */
    FamilyDTO save(FamilyDTO familyDTO);

    /**
     * Get all the families.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FamilyDTO> findAll(Pageable pageable);

    /**
     * Get the "id" family.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FamilyDTO findOne(Long id);

    /**
     * Delete the "id" family.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    Family createFamilyForUser(User user, String familyName);
}
