import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ChildSmEventComponent } from './child-sm-event.component';
import { ChildSmEventDetailComponent } from './child-sm-event-detail.component';
import { ChildSmEventPopupComponent } from './child-sm-event-dialog.component';
import { ChildSmEventDeletePopupComponent } from './child-sm-event-delete-dialog.component';

export const childRoute: Routes = [
    {
        path: 'child-sm-event',
        component: ChildSmEventComponent,
        data: {
            authorities: ['ROLE_PARENT'],
            pageTitle: 'smEventsApp.child.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'child-sm-event/:id',
        component: ChildSmEventDetailComponent,
        data: {
            authorities: ['ROLE_PARENT'],
            pageTitle: 'smEventsApp.child.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const childPopupRoute: Routes = [
    {
        path: 'child-sm-event-new',
        component: ChildSmEventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.child.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'child-sm-event/:id/edit',
        component: ChildSmEventPopupComponent,
        data: {
            authorities: ['ROLE_PARENT'],
            pageTitle: 'smEventsApp.child.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'child-sm-event/:id/delete',
        component: ChildSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'smEventsApp.child.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
