import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    EventSmEventService,
    EventSmEventPopupService,
    EventSmEventComponent,
    EventSmEventDetailComponent,
    EventSmEventDialogComponent,
    EventSmEventPopupComponent,
    EventSmEventDeletePopupComponent,
    EventSmEventDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EventSmEventComponent,
        EventSmEventDetailComponent,
        EventSmEventDialogComponent,
        EventSmEventDeleteDialogComponent,
        EventSmEventPopupComponent,
        EventSmEventDeletePopupComponent,
    ],
    entryComponents: [
        EventSmEventComponent,
        EventSmEventDialogComponent,
        EventSmEventPopupComponent,
        EventSmEventDeleteDialogComponent,
        EventSmEventDeletePopupComponent,
    ],
    providers: [
        EventSmEventService,
        EventSmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsEventSmEventModule {}
