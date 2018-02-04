import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../../shared';
import {
    ChildSmEventService,
    ChildSmEventPopupService,
    ChildSmEventComponent,
    ChildSmEventDetailComponent,
    ChildSmEventDialogComponent,
    ChildSmEventPopupComponent,
    ChildSmEventDeletePopupComponent,
    ChildSmEventDeleteDialogComponent,
    childRoute,
    childPopupRoute,
} from './';

const ENTITY_STATES = [
    ...childRoute,
    ...childPopupRoute,
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ChildSmEventComponent,
        ChildSmEventDetailComponent,
        ChildSmEventDialogComponent,
        ChildSmEventDeleteDialogComponent,
        ChildSmEventPopupComponent,
        ChildSmEventDeletePopupComponent,
    ],
    entryComponents: [
        ChildSmEventComponent,
        ChildSmEventDialogComponent,
        ChildSmEventPopupComponent,
        ChildSmEventDeleteDialogComponent,
        ChildSmEventDeletePopupComponent,
    ],
    providers: [
        ChildSmEventService,
        ChildSmEventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsChildSmEventModule {}
