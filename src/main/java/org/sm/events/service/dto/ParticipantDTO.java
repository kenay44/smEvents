package org.sm.events.service.dto;


import org.sm.events.domain.enumeration.ParticipantStatus;
import org.sm.events.domain.enumeration.ParticipantType;
import org.sm.events.domain.enumeration.Task;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Objects;

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

    private String eventName;

    private String firstName;

    private String lastName;

    private ParticipantStatus status;

    private ZonedDateTime statusChanged;

    private String changedBy;

    private Boolean canRemove;

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

    public ParticipantStatus getStatus() {
        return status;
    }

    public void setStatus(ParticipantStatus status) {
        this.status = status;
    }

    public ZonedDateTime getStatusChanged() {
        return statusChanged;
    }

    public void setStatusChanged(ZonedDateTime statusChanged) {
        this.statusChanged = statusChanged;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public Boolean getCanRemove() {
        return canRemove;
    }

    public void setCanRemove(Boolean canRemove) {
        this.canRemove = canRemove;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
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
            "id=" + id +
            ", role=" + role +
            ", participantType=" + participantType +
            ", signedDate=" + signedDate +
            ", founding=" + founding +
            ", payed=" + payed +
            ", personId=" + personId +
            ", eventId=" + eventId +
            ", eventName='" + eventName + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", status=" + status +
            ", statusChanged=" + statusChanged +
            ", changedBy='" + changedBy + '\'' +
            ", canRemove=" + canRemove +
            '}';
    }
}
