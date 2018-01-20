package org.sm.events.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

import org.sm.events.domain.enumeration.Task;

import org.sm.events.domain.enumeration.ParticipantType;

/**
 * A Participant.
 */
@Entity
@Table(name = "participant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Participant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_role")
    private Task role;

    @Enumerated(EnumType.STRING)
    @Column(name = "participant_type")
    private ParticipantType participantType;

    @Column(name = "signed_date")
    private ZonedDateTime signedDate;

    @Column(name = "founding", precision=10, scale=2)
    private BigDecimal founding;

    @Column(name = "payed", precision=10, scale=2)
    private BigDecimal payed;

    @ManyToOne(optional = false)
    @NotNull
    private Person person;

    @ManyToOne(optional = false)
    @NotNull
    private Event event;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getRole() {
        return role;
    }

    public Participant role(Task role) {
        this.role = role;
        return this;
    }

    public void setRole(Task role) {
        this.role = role;
    }

    public ParticipantType getParticipantType() {
        return participantType;
    }

    public Participant participantType(ParticipantType participantType) {
        this.participantType = participantType;
        return this;
    }

    public void setParticipantType(ParticipantType participantType) {
        this.participantType = participantType;
    }

    public ZonedDateTime getSignedDate() {
        return signedDate;
    }

    public Participant signedDate(ZonedDateTime signedDate) {
        this.signedDate = signedDate;
        return this;
    }

    public void setSignedDate(ZonedDateTime signedDate) {
        this.signedDate = signedDate;
    }

    public BigDecimal getFounding() {
        return founding;
    }

    public Participant founding(BigDecimal founding) {
        this.founding = founding;
        return this;
    }

    public void setFounding(BigDecimal founding) {
        this.founding = founding;
    }

    public BigDecimal getPayed() {
        return payed;
    }

    public Participant payed(BigDecimal payed) {
        this.payed = payed;
        return this;
    }

    public void setPayed(BigDecimal payed) {
        this.payed = payed;
    }

    public Person getPerson() {
        return person;
    }

    public Participant person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Event getEvent() {
        return event;
    }

    public Participant event(Event event) {
        this.event = event;
        return this;
    }

    public void setEvent(Event event) {
        this.event = event;
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
        Participant participant = (Participant) o;
        if (participant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), participant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Participant{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", participantType='" + getParticipantType() + "'" +
            ", signedDate='" + getSignedDate() + "'" +
            ", founding=" + getFounding() +
            ", payed=" + getPayed() +
            "}";
    }
}
