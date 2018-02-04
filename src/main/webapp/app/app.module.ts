import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { SmEventsSharedModule, UserRouteAccessService } from './shared';
import { SmEventsAppRoutingModule} from './app-routing.module';
import { SmEventsHomeModule } from './home/home.module';
import { SmEventsAdminModule } from './admin/admin.module';
import { SmEventsAccountModule } from './account/account.module';
import { SmEventsEntityModule } from './entities/entity.module';
import { SmEventsFamilyModule } from './family/family.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        SmEventsAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        SmEventsSharedModule,
        SmEventsHomeModule,
        SmEventsAdminModule,
        SmEventsAccountModule,
        SmEventsEntityModule,
        SmEventsFamilyModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class SmEventsAppModule {}
