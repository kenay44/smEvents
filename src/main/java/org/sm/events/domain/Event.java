package org.sm.events.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.checkerframework.checker.units.qual.C;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.sm.events.domain.enumeration.EventType;
import org.springframework.cglib.core.Local;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "description")
    private String description;

    @Column(name = "hours")
    private Integer hours;

    @Column(name = "commander")
    private String commander;

    @Column(name = "commander_email")
    private String commanderEmail;

    @Column(name = "commander_phone")
    private String commanderPhone;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type")
    private EventType eventType;

    @Column(name = "age_from")
    private Integer ageFrom;

    @Column(name = "ageTo")
    private Integer ageTo;

    @Column(name = "first_rate_date")
    private LocalDate firstRateDate;

    @Column(name = "second_rate_date")
    private LocalDate secondRateDate;

    @Column(name = "sign_up_start_date")
    private LocalDate signUpStartDate;

    @Column(name = "sign_up_start_time")
    private LocalTime signUpStartTime;

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Participant> participants = new HashSet<>();

    @OneToMany(mappedBy = "event")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EMail> eMails = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Event title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public Event startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Event endDate(LocalDate endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public Event location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public Event maxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
        return this;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getHours() {
        return hours;
    }

    public Event hours(Integer hours) {
        this.hours = hours;
        return this;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public Event participants(Set<Participant> participants) {
        this.participants = participants;
        return this;
    }

    public Event addParticipant(Participant participant) {
        this.participants.add(participant);
        participant.setEvent(this);
        return this;
    }

    public Event removeParticipant(Participant participant) {
        this.participants.remove(participant);
        participant.setEvent(null);
        return this;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }

    public Set<EMail> getEMails() {
        return eMails;
    }

    public Event eMails(Set<EMail> eMails) {
        this.eMails = eMails;
        return this;
    }

    public Event addEMail(EMail eMail) {
        this.eMails.add(eMail);
        eMail.setEvent(this);
        return this;
    }

    public Event removeEMail(EMail eMail) {
        this.eMails.remove(eMail);
        eMail.setEvent(null);
        return this;
    }

    public void setEMails(Set<EMail> eMails) {
        this.eMails = eMails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public String getCommander() {
        return commander;
    }

    public void setCommander(String commander) {
        this.commander = commander;
    }

    public Event commander(String commander) {
        this.commander = commander;
        return this;
    }

    public String getCommanderEmail() {
        return commanderEmail;
    }

    public void setCommanderEmail(String commanderEmail) {
        this.commanderEmail = commanderEmail;
    }

    public Event commanderEmail(String commanderEmail) {
        this.commanderEmail = commanderEmail;
        return this;
    }

    public String getCommanderPhone() {
        return commanderPhone;
    }

    public Event commanderPhone(String commanderPhone) {
        this.commanderPhone = commanderPhone;
        return this;
    }

    public void setCommanderPhone(String commanderPhone) {
        this.commanderPhone = commanderPhone;
    }

    public EventType getEventType() {
        return eventType;
    }

    public Event eventType(EventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Integer getAgeFrom() {
        return ageFrom;
    }

    public Event ageFrom(Integer ageFrom) {
        this.ageFrom = ageFrom;
        return this;
    }

    public void setAgeFrom(Integer ageFrom) {
        this.ageFrom = ageFrom;
    }

    public Integer getAgeTo() {
        return ageTo;
    }

    public Event ageTo(Integer ageTo) {
        this.ageTo = ageTo;
        return this;
    }

    public void setAgeTo(Integer ageTo) {
        this.ageTo = ageTo;
    }

    public LocalDate getFirstRateDate() {
        return firstRateDate;
    }

    public Event firstRateDate(LocalDate firstRateDate) {
        this.firstRateDate = firstRateDate;
        return this;
    }

    public void setFirstRateDate(LocalDate firstRateDate) {
        this.firstRateDate = firstRateDate;
    }

    public LocalDate getSecondRateDate() {
        return secondRateDate;
    }

    public Event secondRateDate(LocalDate secondRateDate) {
        this.secondRateDate = secondRateDate;
        return this;
    }

    public void setSecondRateDate(LocalDate secondRateDate) {
        this.secondRateDate = secondRateDate;
    }

    public LocalDate getSignUpStartDate() {
        return signUpStartDate;
    }

    public Event signUpStartDate(LocalDate signUpStartDate) {
        this.signUpStartDate = signUpStartDate;
        return this;
    }

    public void setSignUpStartDate(LocalDate signUpStartDate) {
        this.signUpStartDate = signUpStartDate;
    }

    public LocalTime getSignUpStartTime() {
        return signUpStartTime;
    }

    public Event signUpStartTime(LocalTime signUpStartTime) {
        this.signUpStartTime = signUpStartTime;
        return this;
    }

    public void setSignUpStartTime(LocalTime signUpStartTime) {
        this.signUpStartTime = signUpStartTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Event event = (Event) o;
        if (event.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + id +
            ", title='" + title + '\'' +
            ", startDate=" + startDate +
            ", endDate=" + endDate +
            ", location='" + location + '\'' +
            ", maxParticipants=" + maxParticipants +
            ", description='" + description + '\'' +
            ", hours=" + hours +
            ", commander='" + commander + '\'' +
            ", commanderEmail='" + commanderEmail + '\'' +
            ", commanderPhone='" + commanderPhone + '\'' +
            ", eventType=" + eventType +
            ", ageFrom=" + ageFrom +
            ", ageTo=" + ageTo +
            ", firstRateDate=" + firstRateDate +
            ", secondRateDate=" + secondRateDate +
            ", signUpStartDate=" + signUpStartDate +
            ", signUpStartTime=" + signUpStartTime +
            '}';
    }
}
