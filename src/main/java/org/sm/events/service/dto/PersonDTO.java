package org.sm.events.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;

import org.sm.events.domain.enumeration.ClothingSize;
import org.sm.events.domain.enumeration.PersonType;
import org.sm.events.domain.enumeration.Sex;

/**
 * A DTO for the Person entity.
 */
public class PersonDTO implements Serializable {

    private Long id;

    private PersonType personType;

    private String firstName;

    private String lastName;

    private String phone;

    private Sex sex;

    private ClothingSize tShirtSize;

    private Integer birthYear;

    private String info;

    private Long familyId;

    private List<String> otherEvents;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonType getPersonType() {
        return personType;
    }

    public void setPersonType(PersonType personType) {
        this.personType = personType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public ClothingSize gettShirtSize() {
        return tShirtSize;
    }

    public void settShirtSize(ClothingSize tShirtSize) {
        this.tShirtSize = tShirtSize;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Long getFamilyId() {
        return familyId;
    }

    public void setFamilyId(Long familyId) {
        this.familyId = familyId;
    }

    public List<String> getOtherEvents() {
        return otherEvents;
    }

    public void setOtherEvents(List<String> otherEvents) {
        this.otherEvents = otherEvents;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonDTO personDTO = (PersonDTO) o;
        if(personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + id +
            ", personType=" + personType +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", phone='" + phone + '\'' +
            ", sex=" + sex +
            ", tShirtSize=" + tShirtSize +
            ", birthYear=" + birthYear +
            ", info='" + info + '\'' +
            ", familyId=" + familyId +
            ", otherEvents=" + otherEvents +
            '}';
    }
}
