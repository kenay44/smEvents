import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParticipantSmEvent } from './participant-sm-event.model';
import { ParticipantSmEventService } from './participant-sm-event.service';

@Component({
    selector: 'jhi-participant-sm-event-detail',
    templateUrl: './participant-sm-event-detail.component.html'
})
export class ParticipantSmEventDetailComponent implements OnInit, OnDestroy {

    participant: ParticipantSmEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private participantService: ParticipantSmEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInParticipants();
    }

    load(id) {
        this.participantService.find(id).subscribe((participant) => {
            this.participant = participant;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInParticipants() {
        this.eventSubscriber = this.eventManager.subscribe(
            'participantListModification',
            (response) => this.load(this.participant.id)
        );
    }
}
