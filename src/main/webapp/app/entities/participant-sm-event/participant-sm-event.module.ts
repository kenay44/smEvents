import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    ParticipantSmEventService,
    ParticipantSmEventPopupService,
    ParticipantSmEventComponent,
    ParticipantSmEventDetailComponent,
    ParticipantSmEventDialogComponent,
    ParticipantSmEventPopupComponent,
    ParticipantSmEventDeletePopupComponent,
    ParticipantSmEventDeleteDialogComponent,
    participantRoute,
    participantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...participantRoute,
    ...participantPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParticipantSmEventComponent,
        ParticipantSmEventDetailComponent,
        ParticipantSmEventDialogComponent,
        ParticipantSmEventDeleteDialogComponent,
        ParticipantSmEventPopupComponent,
        ParticipantSmEventDeletePopupComponent,
    ],
    entryComponents: [
        ParticipantSmEventComponent,
        ParticipantSmEventDialogComponent,
        ParticipantSmEventPopupComponent,
        ParticipantSmEventDeleteDialogComponent,
        ParticipantSmEventDeletePopupComponent,
    ],
    providers: [
        ParticipantSmEventService,
        ParticipantSmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsParticipantSmEventModule {}
