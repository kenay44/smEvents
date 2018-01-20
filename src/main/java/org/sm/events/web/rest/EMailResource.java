package org.sm.events.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.sm.events.service.EMailService;
import org.sm.events.web.rest.errors.BadRequestAlertException;
import org.sm.events.web.rest.util.HeaderUtil;
import org.sm.events.service.dto.EMailDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EMail.
 */
@RestController
@RequestMapping("/api")
public class EMailResource {

    private final Logger log = LoggerFactory.getLogger(EMailResource.class);

    private static final String ENTITY_NAME = "eMail";

    private final EMailService eMailService;

    public EMailResource(EMailService eMailService) {
        this.eMailService = eMailService;
    }

    /**
     * POST  /e-mails : Create a new eMail.
     *
     * @param eMailDTO the eMailDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eMailDTO, or with status 400 (Bad Request) if the eMail has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/e-mails")
    @Timed
    public ResponseEntity<EMailDTO> createEMail(@Valid @RequestBody EMailDTO eMailDTO) throws URISyntaxException {
        log.debug("REST request to save EMail : {}", eMailDTO);
        if (eMailDTO.getId() != null) {
            throw new BadRequestAlertException("A new eMail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EMailDTO result = eMailService.save(eMailDTO);
        return ResponseEntity.created(new URI("/api/e-mails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /e-mails : Updates an existing eMail.
     *
     * @param eMailDTO the eMailDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eMailDTO,
     * or with status 400 (Bad Request) if the eMailDTO is not valid,
     * or with status 500 (Internal Server Error) if the eMailDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/e-mails")
    @Timed
    public ResponseEntity<EMailDTO> updateEMail(@Valid @RequestBody EMailDTO eMailDTO) throws URISyntaxException {
        log.debug("REST request to update EMail : {}", eMailDTO);
        if (eMailDTO.getId() == null) {
            return createEMail(eMailDTO);
        }
        EMailDTO result = eMailService.save(eMailDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eMailDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /e-mails : get all the eMails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of eMails in body
     */
    @GetMapping("/e-mails")
    @Timed
    public List<EMailDTO> getAllEMails() {
        log.debug("REST request to get all EMails");
        return eMailService.findAll();
        }

    /**
     * GET  /e-mails/:id : get the "id" eMail.
     *
     * @param id the id of the eMailDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eMailDTO, or with status 404 (Not Found)
     */
    @GetMapping("/e-mails/{id}")
    @Timed
    public ResponseEntity<EMailDTO> getEMail(@PathVariable Long id) {
        log.debug("REST request to get EMail : {}", id);
        EMailDTO eMailDTO = eMailService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eMailDTO));
    }

    /**
     * DELETE  /e-mails/:id : delete the "id" eMail.
     *
     * @param id the id of the eMailDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/e-mails/{id}")
    @Timed
    public ResponseEntity<Void> deleteEMail(@PathVariable Long id) {
        log.debug("REST request to delete EMail : {}", id);
        eMailService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
