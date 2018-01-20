import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    FamilySmEventService,
    FamilySmEventPopupService,
    FamilySmEventComponent,
    FamilySmEventDetailComponent,
    FamilySmEventDialogComponent,
    FamilySmEventPopupComponent,
    FamilySmEventDeletePopupComponent,
    FamilySmEventDeleteDialogComponent,
    familyRoute,
    familyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...familyRoute,
    ...familyPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FamilySmEventComponent,
        FamilySmEventDetailComponent,
        FamilySmEventDialogComponent,
        FamilySmEventDeleteDialogComponent,
        FamilySmEventPopupComponent,
        FamilySmEventDeletePopupComponent,
    ],
    entryComponents: [
        FamilySmEventComponent,
        FamilySmEventDialogComponent,
        FamilySmEventPopupComponent,
        FamilySmEventDeleteDialogComponent,
        FamilySmEventDeletePopupComponent,
    ],
    providers: [
        FamilySmEventService,
        FamilySmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsFamilySmEventModule {}
