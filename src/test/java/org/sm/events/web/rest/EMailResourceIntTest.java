package org.sm.events.web.rest;

import org.sm.events.SmEventsApp;

import org.sm.events.domain.EMail;
import org.sm.events.domain.Person;
import org.sm.events.repository.EMailRepository;
import org.sm.events.service.EMailService;
import org.sm.events.service.dto.EMailDTO;
import org.sm.events.service.mapper.EMailMapper;
import org.sm.events.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.sm.events.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.sm.events.domain.enumeration.EmailType;
import org.sm.events.domain.enumeration.EMailStatus;
/**
 * Test class for the EMailResource REST controller.
 *
 * @see EMailResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmEventsApp.class)
public class EMailResourceIntTest {

    private static final EmailType DEFAULT_EMAIL_TYPE = EmailType.PARTICIPANT_ADDED;
    private static final EmailType UPDATED_EMAIL_TYPE = EmailType.PARTICIPANT_ADDED;

    private static final EMailStatus DEFAULT_STATUS = EMailStatus.PREPARED;
    private static final EMailStatus UPDATED_STATUS = EMailStatus.SENT;

    @Autowired
    private EMailRepository eMailRepository;

    @Autowired
    private EMailMapper eMailMapper;

    @Autowired
    private EMailService eMailService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEMailMockMvc;

    private EMail eMail;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EMailResource eMailResource = new EMailResource(eMailService);
        this.restEMailMockMvc = MockMvcBuilders.standaloneSetup(eMailResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EMail createEntity(EntityManager em) {
        EMail eMail = new EMail()
            .emailType(DEFAULT_EMAIL_TYPE)
            .status(DEFAULT_STATUS);
        // Add required entity
        Person person = PersonResourceIntTest.createEntity(em);
        em.persist(person);
        em.flush();
        eMail.setPerson(person);
        return eMail;
    }

    @Before
    public void initTest() {
        eMail = createEntity(em);
    }

    @Test
    @Transactional
    public void createEMail() throws Exception {
        int databaseSizeBeforeCreate = eMailRepository.findAll().size();

        // Create the EMail
        EMailDTO eMailDTO = eMailMapper.toDto(eMail);
        restEMailMockMvc.perform(post("/api/e-mails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eMailDTO)))
            .andExpect(status().isCreated());

        // Validate the EMail in the database
        List<EMail> eMailList = eMailRepository.findAll();
        assertThat(eMailList).hasSize(databaseSizeBeforeCreate + 1);
        EMail testEMail = eMailList.get(eMailList.size() - 1);
        assertThat(testEMail.getEmailType()).isEqualTo(DEFAULT_EMAIL_TYPE);
        assertThat(testEMail.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createEMailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eMailRepository.findAll().size();

        // Create the EMail with an existing ID
        eMail.setId(1L);
        EMailDTO eMailDTO = eMailMapper.toDto(eMail);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEMailMockMvc.perform(post("/api/e-mails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eMailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EMail in the database
        List<EMail> eMailList = eMailRepository.findAll();
        assertThat(eMailList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEMails() throws Exception {
        // Initialize the database
        eMailRepository.saveAndFlush(eMail);

        // Get all the eMailList
        restEMailMockMvc.perform(get("/api/e-mails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eMail.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailType").value(hasItem(DEFAULT_EMAIL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }

    @Test
    @Transactional
    public void getEMail() throws Exception {
        // Initialize the database
        eMailRepository.saveAndFlush(eMail);

        // Get the eMail
        restEMailMockMvc.perform(get("/api/e-mails/{id}", eMail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eMail.getId().intValue()))
            .andExpect(jsonPath("$.emailType").value(DEFAULT_EMAIL_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEMail() throws Exception {
        // Get the eMail
        restEMailMockMvc.perform(get("/api/e-mails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEMail() throws Exception {
        // Initialize the database
        eMailRepository.saveAndFlush(eMail);
        int databaseSizeBeforeUpdate = eMailRepository.findAll().size();

        // Update the eMail
        EMail updatedEMail = eMailRepository.findOne(eMail.getId());
        // Disconnect from session so that the updates on updatedEMail are not directly saved in db
        em.detach(updatedEMail);
        updatedEMail
            .emailType(UPDATED_EMAIL_TYPE)
            .status(UPDATED_STATUS);
        EMailDTO eMailDTO = eMailMapper.toDto(updatedEMail);

        restEMailMockMvc.perform(put("/api/e-mails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eMailDTO)))
            .andExpect(status().isOk());

        // Validate the EMail in the database
        List<EMail> eMailList = eMailRepository.findAll();
        assertThat(eMailList).hasSize(databaseSizeBeforeUpdate);
        EMail testEMail = eMailList.get(eMailList.size() - 1);
        assertThat(testEMail.getEmailType()).isEqualTo(UPDATED_EMAIL_TYPE);
        assertThat(testEMail.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingEMail() throws Exception {
        int databaseSizeBeforeUpdate = eMailRepository.findAll().size();

        // Create the EMail
        EMailDTO eMailDTO = eMailMapper.toDto(eMail);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEMailMockMvc.perform(put("/api/e-mails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eMailDTO)))
            .andExpect(status().isCreated());

        // Validate the EMail in the database
        List<EMail> eMailList = eMailRepository.findAll();
        assertThat(eMailList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEMail() throws Exception {
        // Initialize the database
        eMailRepository.saveAndFlush(eMail);
        int databaseSizeBeforeDelete = eMailRepository.findAll().size();

        // Get the eMail
        restEMailMockMvc.perform(delete("/api/e-mails/{id}", eMail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EMail> eMailList = eMailRepository.findAll();
        assertThat(eMailList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EMail.class);
        EMail eMail1 = new EMail();
        eMail1.setId(1L);
        EMail eMail2 = new EMail();
        eMail2.setId(eMail1.getId());
        assertThat(eMail1).isEqualTo(eMail2);
        eMail2.setId(2L);
        assertThat(eMail1).isNotEqualTo(eMail2);
        eMail1.setId(null);
        assertThat(eMail1).isNotEqualTo(eMail2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EMailDTO.class);
        EMailDTO eMailDTO1 = new EMailDTO();
        eMailDTO1.setId(1L);
        EMailDTO eMailDTO2 = new EMailDTO();
        assertThat(eMailDTO1).isNotEqualTo(eMailDTO2);
        eMailDTO2.setId(eMailDTO1.getId());
        assertThat(eMailDTO1).isEqualTo(eMailDTO2);
        eMailDTO2.setId(2L);
        assertThat(eMailDTO1).isNotEqualTo(eMailDTO2);
        eMailDTO1.setId(null);
        assertThat(eMailDTO1).isNotEqualTo(eMailDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(eMailMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(eMailMapper.fromId(null)).isNull();
    }
}
