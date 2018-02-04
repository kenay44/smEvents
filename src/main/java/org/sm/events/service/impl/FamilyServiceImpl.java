package org.sm.events.service.impl;

import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.repository.PersonRepository;
import org.sm.events.service.FamilyService;
import org.sm.events.domain.Family;
import org.sm.events.repository.FamilyRepository;
import org.sm.events.service.dto.FamilyDTO;
import org.sm.events.service.mapper.FamilyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Family.
 */
@Service
@Transactional
public class FamilyServiceImpl implements FamilyService {

    private final Logger log = LoggerFactory.getLogger(FamilyServiceImpl.class);

    private final FamilyRepository familyRepository;

    private final FamilyMapper familyMapper;

    private final PersonRepository personRepository;

    public FamilyServiceImpl(FamilyRepository familyRepository, FamilyMapper familyMapper, PersonRepository personRepository) {
        this.familyRepository = familyRepository;
        this.familyMapper = familyMapper;
        this.personRepository = personRepository;
    }

    /**
     * Save a family.
     *
     * @param familyDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FamilyDTO save(FamilyDTO familyDTO) {
        log.debug("Request to save Family : {}", familyDTO);
        Family family = familyMapper.toEntity(familyDTO);
        family = familyRepository.save(family);
        return familyMapper.toDto(family);
    }

    /**
     * Get all the families.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FamilyDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Families");
        return familyRepository.findAll(pageable)
            .map(familyMapper::toDto);
    }

    /**
     * Get one family by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public FamilyDTO findOne(Long id) {
        log.debug("Request to get Family : {}", id);
        Family family = familyRepository.findOne(id);
        return familyMapper.toDto(family);
    }

    /**
     * Delete the family by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Family : {}", id);
        familyRepository.delete(id);
    }

    @Override
    public Family createFamilyForUser(User user, String familyName) {
        Person person = personRepository.findOneByUser(user);
        Family family = person.getFamily();
        if(family == null)
            family = new Family();
        family.setName(familyName);
        family = familyRepository.save(family);
        person.setFamily(family);
        person.setPersonType(PersonType.PARENT);
        personRepository.save(person);
        family.getPeople().add(person);
        family = familyRepository.save(family);
        return family;
    }
}
