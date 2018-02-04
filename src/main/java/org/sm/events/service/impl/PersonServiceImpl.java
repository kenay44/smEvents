package org.sm.events.service.impl;

import org.sm.events.domain.Family;
import org.sm.events.domain.User;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.security.AuthoritiesConstants;
import org.sm.events.security.SecurityUtils;
import org.sm.events.service.PersonService;
import org.sm.events.domain.Person;
import org.sm.events.repository.PersonRepository;
import org.sm.events.service.UserService;
import org.sm.events.service.dto.PersonDTO;
import org.sm.events.service.mapper.PersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sm.events.web.rest.errors.BadRequestAlertException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Person.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    private final Logger log = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    private final UserService userService;

    public PersonServiceImpl(PersonRepository personRepository, PersonMapper personMapper, UserService userService) {
        this.personRepository = personRepository;
        this.personMapper = personMapper;
        this.userService = userService;
    }

    /**
     * Save a person.
     *
     * @param personDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonDTO save(PersonDTO personDTO) {
        log.debug("Request to save Person : {}", personDTO);
        Person person = personMapper.toEntity(personDTO);
        person = personRepository.save(person);
        return personMapper.toDto(person);
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all People");
        return personRepository.findAll(pageable)
            .map(personMapper::toDto);
    }

    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PersonDTO findOne(Long id) {
        log.debug("Request to get Person : {}", id);
        Person person = personRepository.findOne(id);
        return personMapper.toDto(person);
    }

    @Override
    @Transactional(readOnly = true)
    public PersonDTO findOneByUser(User user) {
        log.debug("Request to get Person for user : {}", user);
        Person person = personRepository.findOneByUser(user);
        return personMapper.toDto(person);
    }

    /**
     * Delete the person by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Person : {}", id);
        personRepository.delete(id);
    }

    @Override
    public PersonDTO createChild(PersonDTO personDTO) throws BadRequestAlertException {
        if(!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.PARENT))
            throw new BadRequestAlertException("Current user is not a parent.", "person", "");
        User user = userService.getUserWithAuthorities().get();
        Person parent = personRepository.findOneByUser(user);
        personDTO.setFamilyId(parent.getFamily().getId());
        personDTO.setPersonType(PersonType.CHILD);
        Person result = personRepository.save(personMapper.toEntity(personDTO));
        return personMapper.toDto(result);
    }

    @Override
    public PersonDTO findOneByCurrentUser() {
        User user = userService.getUserWithAuthorities().get();
        Person person = personRepository.findOneByUser(user);
        return personMapper.toDto(person);
    }

    @Override
    public Page<PersonDTO> findAllByFamilyId(Pageable pageable, Long familyId) {
        return personRepository.findAllByFamilyId(familyId, pageable)
            .map(personMapper::toDto);
    }

    @Override
    public List<PersonDTO> findAllByFamilyIdAndPersonTypeOrderByFirstName(Long familyId, PersonType personType) {
        return personRepository.findAllByFamilyIdAndPersonType(familyId, personType)
            .stream().map(personMapper::toDto)
            .collect(Collectors.toList());
    }
}
