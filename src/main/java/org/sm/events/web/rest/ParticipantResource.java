package org.sm.events.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.sm.events.domain.Event;
import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.service.EventService;
import org.sm.events.service.ParticipantService;
import org.sm.events.service.dto.EventDTO;
import org.sm.events.web.rest.errors.BadRequestAlertException;
import org.sm.events.web.rest.util.HeaderUtil;
import org.sm.events.web.rest.util.PaginationUtil;
import org.sm.events.service.dto.ParticipantDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Participant.
 */
@RestController
@RequestMapping("/api")
public class ParticipantResource {

    private final Logger log = LoggerFactory.getLogger(ParticipantResource.class);

    private static final String ENTITY_NAME = "participant";

    private final ParticipantService participantService;

    private final EventService eventService;

    public ParticipantResource(ParticipantService participantService, EventService eventService) {
        this.participantService = participantService;
        this.eventService = eventService;
    }

    /**
     * POST  /participants/sign/children : Create a new participants.
     *
     * @param participantDTOs the participantDTOs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participantDTO, or with status 400 (Bad Request) if the participant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participants/sign/children")
    @Timed
    public ResponseEntity<Void> createParticipant(@RequestBody Collection<ParticipantDTO> participantDTOs) throws URISyntaxException {
        log.debug("REST request to save Participants : {}", participantDTOs);
        if(participantDTOs.size() == 0)
            throw new BadRequestAlertException("No children selected for the event ", ENTITY_NAME, "");

        for(ParticipantDTO participantDTO: participantDTOs) {
            if (participantDTO.getId() != null) {
                throw new BadRequestAlertException("A new participant cannot already have an ID", ENTITY_NAME, "idexists");
            }
        }
        Long eventId = participantService.createParticipants(participantDTOs);

        return ResponseEntity.created(new URI(String.format("/api/event-sm-event/%s/signing", eventId)))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, eventId.toString()))
            .build();
    }

    /**
     * POST  /participants : Create a new participant.
     *
     * @param participantDTO the participantDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new participantDTO, or with status 400 (Bad Request) if the participant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/participants")
    @Timed
    public ResponseEntity<ParticipantDTO> createParticipant(@Valid @RequestBody ParticipantDTO participantDTO) throws URISyntaxException {
        log.debug("REST request to save Participant : {}", participantDTO);
        if (participantDTO.getId() != null) {
            throw new BadRequestAlertException("A new participant cannot already have an ID", ENTITY_NAME, "idexists");
        }

        ParticipantDTO result = participantService.saveDto(participantDTO);
        return ResponseEntity.created(new URI("/api/participants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .build();
    }

    /**
     * PUT  /participants : Updates an existing participant.
     *
     * @param participantDTO the participantDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated participantDTO,
     * or with status 400 (Bad Request) if the participantDTO is not valid,
     * or with status 500 (Internal Server Error) if the participantDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/participants")
    @Timed
    public ResponseEntity<ParticipantDTO> updateParticipant(@Valid @RequestBody ParticipantDTO participantDTO) throws URISyntaxException {
        log.debug("REST request to update Participant : {}", participantDTO);
        if (participantDTO.getId() == null) {
            return createParticipant(participantDTO);
        }
        ParticipantDTO result = participantService.saveDto(participantDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, participantDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /participants : get all the participants.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of participants in body
     */
    @GetMapping("/participants")
    @Timed
    public ResponseEntity<List<ParticipantDTO>> getAllParticipants(Pageable pageable) {
        log.debug("REST request to get a page of Participants");
        Page<ParticipantDTO> page = participantService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/participants");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /participants/event/{id} : get all participants for the event.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of participants in body
     */
    @GetMapping("/participants/event/{id}")
    @Timed
    public ResponseEntity<List<ParticipantDTO>> getAllParticipants(@PathVariable Long id) {
        log.debug("REST request to get all of Participants for the event id: {}", id);
        List<ParticipantDTO> participants = participantService.findAllForEvent(id, ParticipantStatus.SIGNED);
        return new ResponseEntity<>(participants,  HttpStatus.OK);
    }

    /**
     * GET  /participants/:id : get the "id" participant.
     *
     * @param id the id of the participantDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participantDTO, or with status 404 (Not Found)
     */
    @GetMapping("/participants/{id}")
    @Timed
    public ResponseEntity<ParticipantDTO> getParticipant(@PathVariable Long id) {
        log.debug("REST request to get Participant : {}", id);
        ParticipantDTO participantDTO = participantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(participantDTO));
    }

    /**
     * GET  /participants/:id : get the "id" participant.
     *
     * @param eventId the id of the participantDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the participantDTO, or with status 404 (Not Found)
     */
    @GetMapping("/participants/event/{eventId}/notify")
    @Timed
    public ResponseEntity<Void> notifyParticipants(@PathVariable Long eventId) {
        log.debug("REST request to notify participants form event : {}", eventId);
        participantService.notifyParticipants(eventId);
        EventDTO eventDto = eventService.findOne(eventId);
        return ResponseEntity.ok().headers(HeaderUtil.createCustomMessage(ENTITY_NAME,
            "notified", eventDto.getTitle())).build();
    }

    /**
     * DELETE  /participants/:id : delete the "id" participant.
     *
     * @param id the id of the participantDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participants/{id}")
    @Timed
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        log.debug("REST request to delete Participant : {}", id);
        participantService.removeChildFromEvent(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * DELETE  /participants/:id/child : delete the "id" participant.
     *
     * @param id the id of the participantDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/participants/{id}/child")
    @Timed
    public ResponseEntity<Void> removeChildFromEvent(@PathVariable Long id) {
        log.debug("REST request to remove child form event : {}", id);
        participantService.removeChildFromEvent(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
