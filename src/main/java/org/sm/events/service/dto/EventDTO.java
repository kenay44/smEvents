package org.sm.events.service.dto;


import org.sm.events.domain.enumeration.EventType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

/**
 * A DTO for the Event entity.
 */
public class EventDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private String location;

    private Integer maxParticipants;

    private String description;

    private Integer hours;

    private String commander;

    private String commanderEmail;

    private String commanderPhone;

    private EventType eventType;

    private Integer ageFrom;

    private Integer ageTo;

    private LocalDate firstRateDate;

    private LocalDate secondRateDate;

    private LocalDate signUpStartDate;

    private LocalTime signUpStartTime;

    private Long signedUp;

    private Long removed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public String getCommander() {
        return commander;
    }

    public void setCommander(String commander) {
        this.commander = commander;
    }

    public String getCommanderEmail() {
        return commanderEmail;
    }

    public void setCommanderEmail(String commanderEmail) {
        this.commanderEmail = commanderEmail;
    }

    public String getCommanderPhone() {
        return commanderPhone;
    }

    public void setCommanderPhone(String commanderPhone) {
        this.commanderPhone = commanderPhone;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Integer getAgeFrom() {
        return ageFrom;
    }

    public void setAgeFrom(Integer ageFrom) {
        this.ageFrom = ageFrom;
    }

    public Integer getAgeTo() {
        return ageTo;
    }

    public void setAgeTo(Integer ageTo) {
        this.ageTo = ageTo;
    }

    public LocalDate getFirstRateDate() {
        return firstRateDate;
    }

    public void setFirstRateDate(LocalDate firstRateDate) {
        this.firstRateDate = firstRateDate;
    }

    public LocalDate getSecondRateDate() {
        return secondRateDate;
    }

    public void setSecondRateDate(LocalDate secondRateDate) {
        this.secondRateDate = secondRateDate;
    }

    public LocalDate getSignUpStartDate() {
        return signUpStartDate;
    }

    public void setSignUpStartDate(LocalDate signUpStartDate) {
        this.signUpStartDate = signUpStartDate;
    }

    public LocalTime getSignUpStartTime() {
        return signUpStartTime;
    }

    public void setSignUpStartTime(LocalTime signUpStartTime) {
        this.signUpStartTime = signUpStartTime;
    }

    public Long getSignedUp() {
        return signedUp;
    }

    public void setSignedUp(Long signedUp) {
        this.signedUp = signedUp;
    }

    public Long getRemoved() {
        return removed;
    }

    public void setRemoved(Long removed) {
        this.removed = removed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EventDTO eventDTO = (EventDTO) o;
        if(eventDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), eventDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EventDTO{" +
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
            ", signed=" + signedUp +
            ", removed=" + removed +
            '}';
    }
}
