package org.sm.events.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
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
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private ZonedDateTime endDate;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "description")
    private String description;

    @Column(name = "hours")
    private Integer hours;

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

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Event startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Event endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
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
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", location='" + getLocation() + "'" +
            ", maxParticipants=" + getMaxParticipants() +
            ", description='" + getDescription() + "'" +
            ", hours=" + getHours() +
            "}";
    }
}
