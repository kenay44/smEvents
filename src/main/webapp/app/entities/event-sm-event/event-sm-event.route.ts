import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EventSmEventComponent } from './event-sm-event.component';
import { EventSmEventDetailComponent } from './event-sm-event-detail.component';
import { EventSmEventPopupComponent } from './event-sm-event-dialog.component';
import { EventSmEventDeletePopupComponent } from './event-sm-event-delete-dialog.component';
import {EventSmEventSigningComponent} from './event-sm-event-signing.component';

export const eventRoute: Routes = [
    {
        path: 'event-sm-event',
        component: EventSmEventComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-sm-event/:id',
        component: EventSmEventDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-sm-event/:id/signing',
        component: EventSmEventSigningComponent,
        data: {
            authorities: ['ROLE_PARENT', 'ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.signing.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-sm-event-new',
        component: EventSmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-sm-event/:id/edit',
        component: EventSmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-sm-event/:id/delete',
        component: EventSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
