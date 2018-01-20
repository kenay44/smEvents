import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PersonSmEventComponent } from './person-sm-event.component';
import { PersonSmEventDetailComponent } from './person-sm-event-detail.component';
import { PersonSmEventPopupComponent } from './person-sm-event-dialog.component';
import { PersonSmEventDeletePopupComponent } from './person-sm-event-delete-dialog.component';

export const personRoute: Routes = [
    {
        path: 'person-sm-event',
        component: PersonSmEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'person-sm-event/:id',
        component: PersonSmEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.person.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personPopupRoute: Routes = [
    {
        path: 'person-sm-event-new',
        component: PersonSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-sm-event/:id/edit',
        component: PersonSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'person-sm-event/:id/delete',
        component: PersonSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.person.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
