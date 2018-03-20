import { Routes } from '@angular/router';

import { HomeComponent } from './';
import { WorkshopComponent } from './home.component';

export const homeRoutes: Routes = [{
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }, {
        path: 'workshops',
        component: WorkshopComponent,
        data: {
            authorities: [],
            pageTitle: 'home.workshops.title'
        }
    }
];
