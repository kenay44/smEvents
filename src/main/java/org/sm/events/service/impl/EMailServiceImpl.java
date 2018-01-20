package org.sm.events.service.impl;

import org.sm.events.service.EMailService;
import org.sm.events.domain.EMail;
import org.sm.events.repository.EMailRepository;
import org.sm.events.service.dto.EMailDTO;
import org.sm.events.service.mapper.EMailMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing EMail.
 */
@Service
@Transactional
public class EMailServiceImpl implements EMailService {

    private final Logger log = LoggerFactory.getLogger(EMailServiceImpl.class);

    private final EMailRepository eMailRepository;

    private final EMailMapper eMailMapper;

    public EMailServiceImpl(EMailRepository eMailRepository, EMailMapper eMailMapper) {
        this.eMailRepository = eMailRepository;
        this.eMailMapper = eMailMapper;
    }

    /**
     * Save a eMail.
     *
     * @param eMailDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EMailDTO save(EMailDTO eMailDTO) {
        log.debug("Request to save EMail : {}", eMailDTO);
        EMail eMail = eMailMapper.toEntity(eMailDTO);
        eMail = eMailRepository.save(eMail);
        return eMailMapper.toDto(eMail);
    }

    /**
     * Get all the eMails.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EMailDTO> findAll() {
        log.debug("Request to get all EMails");
        return eMailRepository.findAll().stream()
            .map(eMailMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one eMail by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EMailDTO findOne(Long id) {
        log.debug("Request to get EMail : {}", id);
        EMail eMail = eMailRepository.findOne(id);
        return eMailMapper.toDto(eMail);
    }

    /**
     * Delete the eMail by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EMail : {}", id);
        eMailRepository.delete(id);
    }
}
