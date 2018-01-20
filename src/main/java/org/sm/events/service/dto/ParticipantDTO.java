package org.sm.events.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import org.sm.events.domain.enumeration.Task;
import org.sm.events.domain.enumeration.ParticipantType;

/**
 * A DTO for the Participant entity.
 */
public class ParticipantDTO implements Serializable {

    private Long id;

    private Task role;

    private ParticipantType participantType;

    private ZonedDateTime signedDate;

    private BigDecimal founding;

    private BigDecimal payed;

    private Long personId;

    private Long eventId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Task getRole() {
        return role;
    }

    public void setRole(Task role) {
        this.role = role;
    }

    public ParticipantType getParticipantType() {
        return participantType;
    }

    public void setParticipantType(ParticipantType participantType) {
        this.participantType = participantType;
    }

    public ZonedDateTime getSignedDate() {
        return signedDate;
    }

    public void setSignedDate(ZonedDateTime signedDate) {
        this.signedDate = signedDate;
    }

    public BigDecimal getFounding() {
        return founding;
    }

    public void setFounding(BigDecimal founding) {
        this.founding = founding;
    }

    public BigDecimal getPayed() {
        return payed;
    }

    public void setPayed(BigDecimal payed) {
        this.payed = payed;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ParticipantDTO participantDTO = (ParticipantDTO) o;
        if(participantDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), participantDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ParticipantDTO{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", participantType='" + getParticipantType() + "'" +
            ", signedDate='" + getSignedDate() + "'" +
            ", founding=" + getFounding() +
            ", payed=" + getPayed() +
            "}";
    }
}
