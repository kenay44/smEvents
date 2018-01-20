import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    PersonSmEventService,
    PersonSmEventPopupService,
    PersonSmEventComponent,
    PersonSmEventDetailComponent,
    PersonSmEventDialogComponent,
    PersonSmEventPopupComponent,
    PersonSmEventDeletePopupComponent,
    PersonSmEventDeleteDialogComponent,
    personRoute,
    personPopupRoute,
} from './';

const ENTITY_STATES = [
    ...personRoute,
    ...personPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PersonSmEventComponent,
        PersonSmEventDetailComponent,
        PersonSmEventDialogComponent,
        PersonSmEventDeleteDialogComponent,
        PersonSmEventPopupComponent,
        PersonSmEventDeletePopupComponent,
    ],
    entryComponents: [
        PersonSmEventComponent,
        PersonSmEventDialogComponent,
        PersonSmEventPopupComponent,
        PersonSmEventDeleteDialogComponent,
        PersonSmEventDeletePopupComponent,
    ],
    providers: [
        PersonSmEventService,
        PersonSmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsPersonSmEventModule {}
