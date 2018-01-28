package org.sm.events.service.mapper.decorators;

import org.sm.events.domain.Person;
import org.sm.events.domain.User;
import org.sm.events.repository.PersonRepository;
import org.sm.events.service.dto.UserDTO;
import org.sm.events.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import javax.inject.Inject;

public class UserMapperDecorator extends UserMapper {

    @Autowired
    @Qualifier("delegate")
    private UserMapper delegate;

    @Inject
    private PersonRepository personRepository;

    @Override
    public UserDTO userToUserDTO(User user) {
        UserDTO userDTO = super.userToUserDTO(user);
        Person person = personRepository.findOneByUser(user);
        if(person != null){
            userDTO.setPhoneNumber(person.getPhone());
        }
        return userDTO;
    }
}
