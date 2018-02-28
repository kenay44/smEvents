package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.EventDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring")
public interface EventMapper extends EntityMapper<EventDTO, Event> {

//    @Mapping(target = "participants", ignore = true)
//    @Mapping(target = "eMails", ignore = true)
//    abstract Event toEntity(EventDTO eventDTO);

    default Event fromId(Long id) {
        if (id == null) {
            return null;
        }
        Event event = new Event();
        event.setId(id);
        return event;
    }
}
