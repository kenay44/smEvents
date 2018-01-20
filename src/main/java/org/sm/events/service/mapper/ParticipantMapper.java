package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.ParticipantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Participant and its DTO ParticipantDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, EventMapper.class})
public interface ParticipantMapper extends EntityMapper<ParticipantDTO, Participant> {

    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "event.id", target = "eventId")
    ParticipantDTO toDto(Participant participant);

    @Mapping(source = "personId", target = "person")
    @Mapping(source = "eventId", target = "event")
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
