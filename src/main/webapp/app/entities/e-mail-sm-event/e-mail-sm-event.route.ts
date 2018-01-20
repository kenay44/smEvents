import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EMailSmEventComponent } from './e-mail-sm-event.component';
import { EMailSmEventDetailComponent } from './e-mail-sm-event-detail.component';
import { EMailSmEventPopupComponent } from './e-mail-sm-event-dialog.component';
import { EMailSmEventDeletePopupComponent } from './e-mail-sm-event-delete-dialog.component';

export const eMailRoute: Routes = [
    {
        path: 'e-mail-sm-event',
        component: EMailSmEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.eMail.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'e-mail-sm-event/:id',
        component: EMailSmEventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.eMail.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eMailPopupRoute: Routes = [
    {
        path: 'e-mail-sm-event-new',
        component: EMailSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.eMail.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'e-mail-sm-event/:id/edit',
        component: EMailSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.eMail.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'e-mail-sm-event/:id/delete',
        component: EMailSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.eMail.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
