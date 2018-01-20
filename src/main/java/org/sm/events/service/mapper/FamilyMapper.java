package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.FamilyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Family and its DTO FamilyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FamilyMapper extends EntityMapper<FamilyDTO, Family> {


    @Mapping(target = "people", ignore = true)
    Family toEntity(FamilyDTO familyDTO);

    default Family fromId(Long id) {
        if (id == null) {
            return null;
        }
        Family family = new Family();
        family.setId(id);
        return family;
    }
}
