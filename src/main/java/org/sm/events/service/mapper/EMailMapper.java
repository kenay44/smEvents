package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.EMailDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EMail and its DTO EMailDTO.
 */
@Mapper(componentModel = "spring", uses = {EventMapper.class, PersonMapper.class})
public interface EMailMapper extends EntityMapper<EMailDTO, EMail> {

    @Mapping(source = "event.id", target = "eventId")
    @Mapping(source = "person.id", target = "personId")
    EMailDTO toDto(EMail eMail);

    @Mapping(source = "eventId", target = "event")
    @Mapping(source = "personId", target = "person")
    EMail toEntity(EMailDTO eMailDTO);

    default EMail fromId(Long id) {
        if (id == null) {
            return null;
        }
        EMail eMail = new EMail();
        eMail.setId(id);
        return eMail;
    }
}
