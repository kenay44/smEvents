package org.sm.events.web.rest;

import org.sm.events.SmEventsApp;

import org.sm.events.domain.Participant;
import org.sm.events.domain.Person;
import org.sm.events.domain.Event;
import org.sm.events.repository.ParticipantRepository;
import org.sm.events.service.EventService;
import org.sm.events.service.ParticipantService;
import org.sm.events.service.dto.ParticipantDTO;
import org.sm.events.service.mapper.ParticipantMapper;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static org.sm.events.web.rest.TestUtil.sameInstant;
import static org.sm.events.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.sm.events.web.rest.TestUtil.sameZoneInstant;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.sm.events.domain.enumeration.Task;
import org.sm.events.domain.enumeration.ParticipantType;
/**
 * Test class for the ParticipantResource REST controller.
 *
 * @see ParticipantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmEventsApp.class)
public class ParticipantResourceIntTest {

    private static final Task DEFAULT_ROLE = Task.COMMANDER;
    private static final Task UPDATED_ROLE = Task.OFFICER;

    private static final ParticipantType DEFAULT_PARTICIPANT_TYPE = ParticipantType.PRIMARY;
    private static final ParticipantType UPDATED_PARTICIPANT_TYPE = ParticipantType.RESERVE;

    private static final ZonedDateTime DEFAULT_SIGNED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_SIGNED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_FOUNDING = new BigDecimal(1);
    private static final BigDecimal UPDATED_FOUNDING = new BigDecimal(2);

    private static final BigDecimal DEFAULT_PAYED = new BigDecimal(1);
    private static final BigDecimal UPDATED_PAYED = new BigDecimal(2);

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ParticipantMapper participantMapper;

    @Autowired
    private ParticipantService participantService;

    @Autowired
    private EventService eventService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restParticipantMockMvc;

    private Participant participant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ParticipantResource participantResource = new ParticipantResource(participantService, eventService);
        this.restParticipantMockMvc = MockMvcBuilders.standaloneSetup(participantResource)
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
    public static Participant createEntity(EntityManager em) {
        Participant participant = new Participant()
            .role(DEFAULT_ROLE)
            .participantType(DEFAULT_PARTICIPANT_TYPE)
            .signedDate(DEFAULT_SIGNED_DATE)
            .founding(DEFAULT_FOUNDING)
            .payed(DEFAULT_PAYED);
        // Add required entity
        Person person = PersonResourceIntTest.createEntity(em);
        em.persist(person);
        em.flush();
        participant.setPerson(person);
        // Add required entity
        Event event = EventResourceIntTest.createEntity(em);
        em.persist(event);
        em.flush();
        participant.setEvent(event);
        return participant;
    }

    @Before
    public void initTest() {
        participant = createEntity(em);
    }

    @Test
    @Transactional
    public void createParticipant() throws Exception {
        int databaseSizeBeforeCreate = participantRepository.findAll().size();

        // Create the Participant
        ParticipantDTO participantDTO = participantMapper.toDto(participant);
        restParticipantMockMvc.perform(post("/api/participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participantDTO)))
            .andExpect(status().isCreated());

        // Validate the Participant in the database
        List<Participant> participantList = participantRepository.findAll();
        assertThat(participantList).hasSize(databaseSizeBeforeCreate + 1);
        Participant testParticipant = participantList.get(participantList.size() - 1);
        assertThat(testParticipant.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testParticipant.getParticipantType()).isEqualTo(DEFAULT_PARTICIPANT_TYPE);
        assertThat(testParticipant.getSignedDate()).isEqualTo(DEFAULT_SIGNED_DATE);
        assertThat(testParticipant.getFounding()).isEqualTo(DEFAULT_FOUNDING);
        assertThat(testParticipant.getPayed()).isEqualTo(DEFAULT_PAYED);
    }

    @Test
    @Transactional
    public void createParticipantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = participantRepository.findAll().size();

        // Create the Participant with an existing ID
        participant.setId(1L);
        ParticipantDTO participantDTO = participantMapper.toDto(participant);

        // An entity with an existing ID cannot be created, so this API call must fail
        restParticipantMockMvc.perform(post("/api/participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participantDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Participant in the database
        List<Participant> participantList = participantRepository.findAll();
        assertThat(participantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllParticipants() throws Exception {
        // Initialize the database
        participantRepository.saveAndFlush(participant);

        // Get all the participantList
        restParticipantMockMvc.perform(get("/api/participants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(participant.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())))
            .andExpect(jsonPath("$.[*].participantType").value(hasItem(DEFAULT_PARTICIPANT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].signedDate").value(hasItem(sameZoneInstant(DEFAULT_SIGNED_DATE))))
            .andExpect(jsonPath("$.[*].founding").value(hasItem(DEFAULT_FOUNDING.intValue())))
            .andExpect(jsonPath("$.[*].payed").value(hasItem(DEFAULT_PAYED.intValue())));
    }

    @Test
    @Transactional
    public void getParticipant() throws Exception {
        // Initialize the database
        participantRepository.saveAndFlush(participant);

        // Get the participant
        restParticipantMockMvc.perform(get("/api/participants/{id}", participant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(participant.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()))
            .andExpect(jsonPath("$.participantType").value(DEFAULT_PARTICIPANT_TYPE.toString()))
            .andExpect(jsonPath("$.signedDate").value(sameZoneInstant(DEFAULT_SIGNED_DATE)))
            .andExpect(jsonPath("$.founding").value(DEFAULT_FOUNDING.intValue()))
            .andExpect(jsonPath("$.payed").value(DEFAULT_PAYED.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingParticipant() throws Exception {
        // Get the participant
        restParticipantMockMvc.perform(get("/api/participants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateParticipant() throws Exception {
        // Initialize the database
        participantRepository.saveAndFlush(participant);
        int databaseSizeBeforeUpdate = participantRepository.findAll().size();

        // Update the participant
        Participant updatedParticipant = participantRepository.findOne(participant.getId());
        // Disconnect from session so that the updates on updatedParticipant are not directly saved in db
        em.detach(updatedParticipant);
        updatedParticipant
            .role(UPDATED_ROLE)
            .participantType(UPDATED_PARTICIPANT_TYPE)
            .signedDate(UPDATED_SIGNED_DATE)
            .founding(UPDATED_FOUNDING)
            .payed(UPDATED_PAYED);
        ParticipantDTO participantDTO = participantMapper.toDto(updatedParticipant);

        restParticipantMockMvc.perform(put("/api/participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participantDTO)))
            .andExpect(status().isOk());

        // Validate the Participant in the database
        List<Participant> participantList = participantRepository.findAll();
        assertThat(participantList).hasSize(databaseSizeBeforeUpdate);
        Participant testParticipant = participantList.get(participantList.size() - 1);
        assertThat(testParticipant.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testParticipant.getParticipantType()).isEqualTo(UPDATED_PARTICIPANT_TYPE);
        assertThat(testParticipant.getSignedDate()).isEqualTo(UPDATED_SIGNED_DATE);
        assertThat(testParticipant.getFounding()).isEqualTo(UPDATED_FOUNDING);
        assertThat(testParticipant.getPayed()).isEqualTo(UPDATED_PAYED);
    }

    @Test
    @Transactional
    public void updateNonExistingParticipant() throws Exception {
        int databaseSizeBeforeUpdate = participantRepository.findAll().size();

        // Create the Participant
        ParticipantDTO participantDTO = participantMapper.toDto(participant);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restParticipantMockMvc.perform(put("/api/participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(participantDTO)))
            .andExpect(status().isCreated());

        // Validate the Participant in the database
        List<Participant> participantList = participantRepository.findAll();
        assertThat(participantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteParticipant() throws Exception {
        // Initialize the database
        participantRepository.saveAndFlush(participant);
        int databaseSizeBeforeDelete = participantRepository.findAll().size();

        // Get the participant
        restParticipantMockMvc.perform(delete("/api/participants/{id}", participant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Participant> participantList = participantRepository.findAll();
        assertThat(participantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Participant.class);
        Participant participant1 = new Participant();
        participant1.setId(1L);
        Participant participant2 = new Participant();
        participant2.setId(participant1.getId());
        assertThat(participant1).isEqualTo(participant2);
        participant2.setId(2L);
        assertThat(participant1).isNotEqualTo(participant2);
        participant1.setId(null);
        assertThat(participant1).isNotEqualTo(participant2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParticipantDTO.class);
        ParticipantDTO participantDTO1 = new ParticipantDTO();
        participantDTO1.setId(1L);
        ParticipantDTO participantDTO2 = new ParticipantDTO();
        assertThat(participantDTO1).isNotEqualTo(participantDTO2);
        participantDTO2.setId(participantDTO1.getId());
        assertThat(participantDTO1).isEqualTo(participantDTO2);
        participantDTO2.setId(2L);
        assertThat(participantDTO1).isNotEqualTo(participantDTO2);
        participantDTO1.setId(null);
        assertThat(participantDTO1).isNotEqualTo(participantDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(participantMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(participantMapper.fromId(null)).isNull();
    }
}
