package org.sm.events.service.impl;

import org.sm.events.config.ThymeleafConfiguration;
import org.sm.events.security.SecurityUtils;
import org.sm.events.service.EventService;
import org.sm.events.domain.Event;
import org.sm.events.repository.EventRepository;
import org.sm.events.service.MailService;
import org.sm.events.service.UserService;
import org.sm.events.service.dto.EventDTO;
import org.sm.events.service.mapper.EventMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import java.io.File;
import java.io.FileReader;
import java.net.URL;
import java.net.URLClassLoader;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;


/**
 * Service Implementation for managing Event.
 */
@Service
@Transactional
public class EventServiceImpl implements EventService {

    private final Logger log = LoggerFactory.getLogger(EventServiceImpl.class);

    private final EventRepository eventRepository;

    private final EventMapper eventMapper;

    private final ThymeleafConfiguration thymeleafConfiguration;

    private final SpringTemplateEngine templateEngine;

    private final MailService mailService;

    private final UserService userService;

    public EventServiceImpl(EventRepository eventRepository, EventMapper eventMapper, ThymeleafConfiguration thymeleafConfiguration, SpringTemplateEngine templateEngine, MailService mailService, UserService userService) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
        this.thymeleafConfiguration = thymeleafConfiguration;
        this.templateEngine = templateEngine;
        this.mailService = mailService;
        this.userService = userService;
    }

    /**
     * Save a event.
     *
     * @param eventDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EventDTO save(EventDTO eventDTO) {
        log.debug("Request to save Event : {}", eventDTO);
        Event event = eventMapper.toEntity(eventDTO);
        event = eventRepository.save(event);
        return eventMapper.toDto(event);
    }

    /**
     * Get all the events.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Events");
        return eventRepository.findAll(pageable)
            .map(eventMapper::toDto);
    }

    /**
     * Get one event by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EventDTO findOne(Long id) {
        log.debug("Request to get Event : {}", id);
        Event event = eventRepository.findOne(id);
        return eventMapper.toDto(event);
    }

    /**
     * Delete the event by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Event : {}", id);
        eventRepository.delete(id);
    }

    @Override
    public Page<EventDTO> findAllPublished(Pageable pageable) {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        return eventRepository.finAllPublished(pageable, today, now)
            .map(eventMapper::toDto);
    }
}
