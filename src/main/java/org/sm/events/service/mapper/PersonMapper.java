package org.sm.events.service.mapper;

import org.sm.events.domain.*;
import org.sm.events.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {FamilyMapper.class})
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {

    @Mapping(source = "family.id", target = "familyId")
    PersonDTO toDto(Person person);

//    @Mapping(target = "participants", ignore = true)
//    @Mapping(target = "eMails", ignore = true)
    @Mapping(source = "familyId", target = "family")
    Person toEntity(PersonDTO personDTO);

    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
