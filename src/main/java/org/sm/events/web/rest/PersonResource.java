package org.sm.events.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.service.EventService;
import org.sm.events.service.ParticipantService;
import org.sm.events.service.PersonService;
import org.sm.events.web.rest.errors.BadRequestAlertException;
import org.sm.events.web.rest.util.HeaderUtil;
import org.sm.events.web.rest.util.PaginationUtil;
import org.sm.events.service.dto.PersonDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Person.
 */
@RestController
@RequestMapping("/api")
public class PersonResource {

    private final Logger log = LoggerFactory.getLogger(PersonResource.class);

    private static final String ENTITY_NAME = "person";

    private final PersonService personService;

    private final ParticipantService participantService;

    private final EventService eventService;

    public PersonResource(PersonService personService, ParticipantService participantService, EventService eventService) {
        this.personService = personService;
        this.participantService = participantService;
        this.eventService = eventService;
    }

    /**
     * POST  /people : Create a new person.
     *
     * @param personDTO the personDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personDTO, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/people")
    @Timed
    public ResponseEntity<PersonDTO> createPerson(@RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to save Person : {}", personDTO);
        if (personDTO.getId() != null) {
            throw new BadRequestAlertException("A new person cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PersonDTO result = personService.save(personDTO);
        return ResponseEntity.created(new URI("/api/people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /people/family : Create a new child.
     *
     * @param personDTO the personDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personDTO, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/people/family")
    @Timed
    public ResponseEntity<PersonDTO> createChild(@RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to save Person : {}", personDTO);
        if (personDTO.getId() != null) {
            throw new BadRequestAlertException("A new person cannot already have an ID", ENTITY_NAME, "idexists");
        }
        personDTO = personService.createChild(personDTO);

        return ResponseEntity.created(new URI("/api/people/family" + personDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, personDTO.getFirstName() + " " + personDTO.getLastName()))
            .body(personDTO);
    }

    /**
     * GET  /people/family/:id  Get the child.
     *
     * @param  id the id of the child (Person)
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/people/family/{id}")
    @Timed
    public ResponseEntity<PersonDTO> getChild(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to get child (Person) of id : {}", id);
        PersonDTO childDto = personService.findOneWithCurrentUserAsParent(id);
        if (childDto == null) {
            throw new BadRequestAlertException("No such child or child belongs to another family ", ENTITY_NAME, "");
        }

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(childDto));
    }

    /**
     * PUT  /people/family : Updates an existing person.
     *
     * @param personDTO the personDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personDTO,
     * or with status 400 (Bad Request) if the personDTO is not valid,
     * or with status 500 (Internal Server Error) if the personDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/people/family")
    @Timed
    public ResponseEntity<PersonDTO> updateChild(@RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to update child (Person) : {}", personDTO);
        if (personDTO.getId() == null) {
            return createChild(personDTO);
        }
        PersonDTO result = personService.updateChild(personDTO);
        if(result == null) {
            throw new BadRequestAlertException("No such child or child belongs to another family ", ENTITY_NAME, "");
        }
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getFirstName() + " " + result.getLastName()))
            .body(result);
    }

    /**
     * PUT  /people : Updates an existing person.
     *
     * @param personDTO the personDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personDTO,
     * or with status 400 (Bad Request) if the personDTO is not valid,
     * or with status 500 (Internal Server Error) if the personDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/people")
    @Timed
    public ResponseEntity<PersonDTO> updatePerson(@RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to update Person : {}", personDTO);
        if (personDTO.getId() == null) {
            return createPerson(personDTO);
        }
        PersonDTO result = personService.save(personDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /people : get all the people.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/people")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllPeople(Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonDTO> page = personService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people/family : get all the people in family of current user.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/people/family")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllPeopleInFamily(Pageable pageable) {
        log.debug("REST request to get a page of People in family");
        PersonDTO personDTO = personService.findOneByCurrentUser();

        Page<PersonDTO> page = personService.findAllByFamilyId(pageable, personDTO.getFamilyId());
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people/family/children : get all children in family of current user.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/people/family/children")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllChildrenInFamily(Pageable pageable) {
        log.debug("REST request to get all children in family");
        PersonDTO personDTO = personService.findOneByCurrentUser();

        List<PersonDTO> children = personService.findAllByFamilyIdAndPersonTypeOrderByFirstName(personDTO.getFamilyId(), PersonType.CHILD);

        return new ResponseEntity<>(children, HttpStatus.OK);
    }

    /**
     * GET  /people/family/children/event/{eventId} : get all children in family of current user available for event (eventId).
     *
     * @param eventId id of the event
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/people/family/children/event/{eventId}")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllChildrenInFamilyForEvent(@PathVariable Long eventId) {
        log.debug("REST request to get all children in family available for the event");
        PersonDTO personDTO = personService.findOneByCurrentUser();
        if(personDTO == null) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
        }
        List<PersonDTO> children = personService.findAllByFamilyIdAndPersonTypeOrderByFirstName(personDTO.getFamilyId(), PersonType.CHILD);

        children = participantService.validateParticipants(children, eventId);

        return new ResponseEntity<>(children.stream()
            .filter(u -> participantService.findOneByPersonIdAndEventIdAndStatus(u.getId(), eventId, ParticipantStatus.SIGNED) == null)
            .collect(Collectors.toList()), HttpStatus.OK);
    }

    /**
     * GET  /people/:id : get the "id" person.
     *
     * @param id the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @GetMapping("/people/{id}")
    @Timed
    public ResponseEntity<PersonDTO> getPerson(@PathVariable Long id) {
        log.debug("REST request to get Person : {}", id);
        PersonDTO personDTO = personService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personDTO));
    }

    /**
     * DELETE  /people/:id : delete the "id" person.
     *
     * @param id the id of the personDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/people/{id}")
    @Timed
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        personService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * DELETE  /people/family/:id : delete the child of current user with "id"
     *
     * @param id the id of the personDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/people/family/{id}")
    @Timed
    public ResponseEntity<Void> deleteChild(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        PersonDTO personDTO = personService.findOneWithCurrentUserAsParent(id);
        if(personDTO == null) {
            throw new BadRequestAlertException("No such child or child belongs to another family ", ENTITY_NAME, "");
        }
        personService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME,
            personDTO.getFirstName() + " " + personDTO.getLastName())).build();
    }
}
