import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SmEventsChildSmEventModule } from './children-sm-event/child-sm-event.module';

@NgModule({
    imports: [
        SmEventsChildSmEventModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmEventsFamilyModule {}
