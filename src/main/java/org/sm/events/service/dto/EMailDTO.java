package org.sm.events.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import org.sm.events.domain.enumeration.EmailType;
import org.sm.events.domain.enumeration.EMailStatus;

/**
 * A DTO for the EMail entity.
 */
public class EMailDTO implements Serializable {

    private Long id;

    private EmailType emailType;

    private EMailStatus status;

    private Long eventId;

    private Long personId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmailType getEmailType() {
        return emailType;
    }

    public void setEmailType(EmailType emailType) {
        this.emailType = emailType;
    }

    public EMailStatus getStatus() {
        return status;
    }

    public void setStatus(EMailStatus status) {
        this.status = status;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EMailDTO eMailDTO = (EMailDTO) o;
        if(eMailDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eMailDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EMailDTO{" +
            "id=" + getId() +
            ", emailType='" + getEmailType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
