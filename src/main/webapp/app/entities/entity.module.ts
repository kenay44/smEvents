import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SmEventsEventSmEventModule } from './event-sm-event/event-sm-event.module';
import { SmEventsPersonSmEventModule } from './person-sm-event/person-sm-event.module';
import { SmEventsParticipantSmEventModule } from './participant-sm-event/participant-sm-event.module';
import { SmEventsFamilySmEventModule } from './family-sm-event/family-sm-event.module';
import { SmEventsEMailSmEventModule } from './e-mail-sm-event/e-mail-sm-event.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SmEventsEventSmEventModule,
        SmEventsPersonSmEventModule,
        SmEventsParticipantSmEventModule,
        SmEventsFamilySmEventModule,
        SmEventsEMailSmEventModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsEntityModule {}
