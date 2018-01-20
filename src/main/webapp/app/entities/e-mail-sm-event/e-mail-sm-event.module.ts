import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    EMailSmEventService,
    EMailSmEventPopupService,
    EMailSmEventComponent,
    EMailSmEventDetailComponent,
    EMailSmEventDialogComponent,
    EMailSmEventPopupComponent,
    EMailSmEventDeletePopupComponent,
    EMailSmEventDeleteDialogComponent,
    eMailRoute,
    eMailPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eMailRoute,
    ...eMailPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EMailSmEventComponent,
        EMailSmEventDetailComponent,
        EMailSmEventDialogComponent,
        EMailSmEventDeleteDialogComponent,
        EMailSmEventPopupComponent,
        EMailSmEventDeletePopupComponent,
    ],
    entryComponents: [
        EMailSmEventComponent,
        EMailSmEventDialogComponent,
        EMailSmEventPopupComponent,
        EMailSmEventDeleteDialogComponent,
        EMailSmEventDeletePopupComponent,
    ],
    providers: [
        EMailSmEventService,
        EMailSmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsEMailSmEventModule {}
