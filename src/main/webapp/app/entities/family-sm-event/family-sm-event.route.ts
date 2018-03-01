import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FamilySmEventComponent } from './family-sm-event.component';
import { FamilySmEventDetailComponent } from './family-sm-event-detail.component';
import { FamilySmEventPopupComponent } from './family-sm-event-dialog.component';
import { FamilySmEventDeletePopupComponent } from './family-sm-event-delete-dialog.component';

export const familyRoute: Routes = [
    {
        path: 'family-sm-event',
        component: FamilySmEventComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'family-sm-event/:id',
        component: FamilySmEventDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyPopupRoute: Routes = [
    {
        path: 'family-sm-event-new',
        component: FamilySmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family-sm-event/:id/edit',
        component: FamilySmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'family-sm-event/:id/delete',
        component: FamilySmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
