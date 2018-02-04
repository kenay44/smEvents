import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { PersonSmEvent, PersonSmEventService } from '../person-sm-event';
import { Principal, ResponseWrapper } from '../../shared';
import {ParticipantSmEvent} from '../participant-sm-event/participant-sm-event.model';
import {ParticipantSmEventService} from '../participant-sm-event/participant-sm-event.service';

@Component({
    selector: 'jhi-event-sm-event-signing',
    templateUrl: './event-sm-event-signing.component.html'
})
export class EventSmEventSigningComponent implements OnInit, OnDestroy {

    children: PersonSmEvent[];
    participants: ParticipantSmEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    subscription: Subscription;
    queryCount: any;

    constructor(
        private participantService: ParticipantSmEventService,
        private personService: PersonSmEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        this.children = [];
        this.participants = [];
    }

    loadAll() {
        this.personService.getUserChildren()
        .subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json),
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.participantService.getEvenParticipants().subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPeople();
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPeople();
    }

    load(eventId) {
        this.participantService.findAllForEvent(eventId).subscribe((participants) => {
        this.participants = participants;
    });
}

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PersonSmEvent) {
        return item.id;
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe('personListModification', (response) => this.reset());
    }

    private onSuccess(data) {
        for (let i = 0; i < data.length; i++) {
            this.children.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
