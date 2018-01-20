package org.sm.events.service;

import org.sm.events.service.dto.EMailDTO;
import java.util.List;

/**
 * Service Interface for managing EMail.
 */
public interface EMailService {

    /**
     * Save a eMail.
     *
     * @param eMailDTO the entity to save
     * @return the persisted entity
     */
    EMailDTO save(EMailDTO eMailDTO);

    /**
     * Get all the eMails.
     *
     * @return the list of entities
     */
    List<EMailDTO> findAll();

    /**
     * Get the "id" eMail.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EMailDTO findOne(Long id);

    /**
     * Delete the "id" eMail.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
