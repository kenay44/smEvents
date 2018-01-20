import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FamilySmEvent } from './family-sm-event.model';
import { FamilySmEventService } from './family-sm-event.service';

@Component({
    selector: 'jhi-family-sm-event-detail',
    templateUrl: './family-sm-event-detail.component.html'
})
export class FamilySmEventDetailComponent implements OnInit, OnDestroy {

    family: FamilySmEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private familyService: FamilySmEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFamilies();
    }

    load(id) {
        this.familyService.find(id).subscribe((family) => {
            this.family = family;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFamilies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'familyListModification',
            (response) => this.load(this.family.id)
        );
    }
}
