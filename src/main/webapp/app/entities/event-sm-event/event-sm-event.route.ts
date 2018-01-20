import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EventSmEventComponent } from './event-sm-event.component';
import { EventSmEventDetailComponent } from './event-sm-event-detail.component';
import { EventSmEventPopupComponent } from './event-sm-event-dialog.component';
import { EventSmEventDeletePopupComponent } from './event-sm-event-delete-dialog.component';

export const eventRoute: Routes = [
    {
        path: 'event-sm-event',
        component: EventSmEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event-sm-event/:id',
        component: EventSmEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-sm-event-new',
        component: EventSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-sm-event/:id/edit',
        component: EventSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event-sm-event/:id/delete',
        component: EventSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
