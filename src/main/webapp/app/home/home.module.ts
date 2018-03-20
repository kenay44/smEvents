import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmEventsSharedModule } from '../shared';

import { homeRoutes, HomeComponent } from './';
import {WorkshopComponent} from './home.component'

const ENTITY_STATES = [
    ...homeRoutes
];

@NgModule({
    imports: [
        SmEventsSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HomeComponent,
        WorkshopComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsHomeModule {}
