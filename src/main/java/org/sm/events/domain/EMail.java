package org.sm.events.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import org.sm.events.domain.enumeration.EmailType;

import org.sm.events.domain.enumeration.EMailStatus;

/**
 * A EMail.
 */
@Entity
@Table(name = "e_mail")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EMail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "email_type")
    private EmailType emailType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private EMailStatus status;

    @ManyToOne
    private Event event;

    @ManyToOne(optional = false)
    @NotNull
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmailType getEmailType() {
        return emailType;
    }

    public EMail emailType(EmailType emailType) {
        this.emailType = emailType;
        return this;
    }

    public void setEmailType(EmailType emailType) {
        this.emailType = emailType;
    }

    public EMailStatus getStatus() {
        return status;
    }

    public EMail status(EMailStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(EMailStatus status) {
        this.status = status;
    }

    public Event getEvent() {
        return event;
    }

    public EMail event(Event event) {
        this.event = event;
        return this;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Person getPerson() {
        return person;
    }

    public EMail person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
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
        EMail eMail = (EMail) o;
        if (eMail.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eMail.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EMail{" +
            "id=" + getId() +
            ", emailType='" + getEmailType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
