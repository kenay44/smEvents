import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParticipantSmEventComponent } from './participant-sm-event.component';
import { ParticipantSmEventDetailComponent } from './participant-sm-event-detail.component';
import { ParticipantSmEventPopupComponent } from './participant-sm-event-dialog.component';
import { ParticipantSmEventDeletePopupComponent } from './participant-sm-event-delete-dialog.component';

export const participantRoute: Routes = [
    {
        path: 'participant-sm-event',
        component: ParticipantSmEventComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'participant-sm-event/:id',
        component: ParticipantSmEventDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const participantPopupRoute: Routes = [
    {
        path: 'participant-sm-event-new',
        component: ParticipantSmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'smEventsApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participant-sm-event/:id/edit',
        component: ParticipantSmEventPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PARENT'],
            pageTitle: 'smEventsApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'participant-sm-event/:id/delete',
        component: ParticipantSmEventDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PARENT'],
            pageTitle: 'smEventsApp.participant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
