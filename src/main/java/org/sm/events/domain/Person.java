package org.sm.events.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.sm.events.domain.enumeration.ClothingSize;
import org.sm.events.domain.enumeration.PersonType;

import org.sm.events.domain.enumeration.Sex;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "person_type")
    private PersonType personType;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private Sex sex;

    @Enumerated(EnumType.STRING)
    @Column(name = "t_shirt_size")
    private ClothingSize tShirtSize;

    @Column(name = "birth_year")
    private Integer birthYear;

    @Column(name = "info")
    private String info;

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Participant> participants = new HashSet<>();

    @OneToMany(mappedBy = "person")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EMail> eMails = new HashSet<>();

    @ManyToOne
    private Family family;

    @OneToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonType getPersonType() {
        return personType;
    }

    public Person personType(PersonType personType) {
        this.personType = personType;
        return this;
    }

    public void setPersonType(PersonType personType) {
        this.personType = personType;
    }

    public String getFirstName() {
        return firstName;
    }

    public Person firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Person lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public Person phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Sex getSex() {
        return sex;
    }

    public Person sex(Sex sex) {
        this.sex = sex;
        return this;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public ClothingSize gettShirtSize() {
        return tShirtSize;
    }

    public Person tShirtSize(ClothingSize tShirtSize) {
        this.tShirtSize = tShirtSize;
        return this;
    }

    public void settShirtSize(ClothingSize tShirtSize) {
        this.tShirtSize = tShirtSize;
    }

    public Integer getBirthYear() {
        return birthYear;
    }

    public Person birthYear(Integer birthYear) {
        this.birthYear = birthYear;
        return this;
    }

    public void setBirthYear(Integer birthYear) {
        this.birthYear = birthYear;
    }

    public String getInfo() {
        return info;
    }

    public Person info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public Person participants(Set<Participant> participants) {
        this.participants = participants;
        return this;
    }

    public Person addParticipant(Participant participant) {
        this.participants.add(participant);
        participant.setPerson(this);
        return this;
    }

    public Person removeParticipant(Participant participant) {
        this.participants.remove(participant);
        participant.setPerson(null);
        return this;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }

    public Set<EMail> getEMails() {
        return eMails;
    }

    public Person eMails(Set<EMail> eMails) {
        this.eMails = eMails;
        return this;
    }

    public Person addEMail(EMail eMail) {
        this.eMails.add(eMail);
        eMail.setPerson(this);
        return this;
    }

    public Person removeEMail(EMail eMail) {
        this.eMails.remove(eMail);
        eMail.setPerson(null);
        return this;
    }

    public void setEMails(Set<EMail> eMails) {
        this.eMails = eMails;
    }

    public Family getFamily() {
        return family;
    }

    public Person family(Family family) {
        this.family = family;
        return this;
    }

    public void setFamily(Family family) {
        this.family = family;
    }

    public User getUser() {
        return user;
    }

    public Person user(User user){
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", personType='" + getPersonType() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", sex='" + getSex() + "'" +
            ", tShirtSize='" + gettShirtSize() + "'" +
            ", birthYear=" + getBirthYear() +
            ", info='" + getInfo() + "'" +
            "}";
    }
}
