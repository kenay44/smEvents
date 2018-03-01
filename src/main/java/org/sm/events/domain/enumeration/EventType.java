package org.sm.events.domain.enumeration;

public enum EventType {
    CRUISE("cruiseSignUpEmail", true),
    FIRST_TACK("firstTackSignUpEmail", true),
    CLASSES("classesSignUpEmail", false),
    BOSUN_WORKS("bosunWorksSignUpEmail", false);

    private final String thymeleafTemplate;
    private final boolean sendEmailAutomaticly;

    EventType(String templateName, boolean sendEmail) {
        this.thymeleafTemplate = templateName;
        this.sendEmailAutomaticly = sendEmail;
    }

    public String getThymeleafTemplate() {
        return thymeleafTemplate;
    }

    public boolean isSendEmailAutomaticly() {
        return sendEmailAutomaticly;
    }
}
