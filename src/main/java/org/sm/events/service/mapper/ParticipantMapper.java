package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.ParticipantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Participant and its DTO ParticipantDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, EventMapper.class, User.class})
public interface ParticipantMapper extends EntityMapper<ParticipantDTO, Participant> {

    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "event.id", target = "eventId")
    @Mapping(source = "changedBy.login", target = "changedBy")
    @Mapping(target = "canRemove", ignore = true)
    @Mapping(source = "person.firstName", target = "firstName")
    @Mapping(source = "person.lastName", target = "lastName")
    @Mapping(source = "event.title", target = "eventName")
    ParticipantDTO toDto(Participant participant);

    @Mapping(source = "personId", target = "person")
    @Mapping(source = "eventId", target = "event")
    @Mapping(target = "changedBy", ignore = true)
    Participant toEntity(ParticipantDTO participantDTO);

    default Participant fromId(Long id) {
        if (id == null) {
            return null;
        }
        Participant participant = new Participant();
        participant.setId(id);
        return participant;
    }
}
