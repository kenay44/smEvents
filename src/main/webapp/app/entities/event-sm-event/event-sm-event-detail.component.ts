import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventService } from './event-sm-event.service';

@Component({
    selector: 'jhi-event-sm-event-detail',
    templateUrl: './event-sm-event-detail.component.html'
})
export class EventSmEventDetailComponent implements OnInit, OnDestroy {

    event: EventSmEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventService: EventSmEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvents();
    }

    load(id) {
        this.eventService.find(id).subscribe((event) => {
            this.event = event;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventListModification',
            (response) => this.load(this.event.id)
        );
    }
}
