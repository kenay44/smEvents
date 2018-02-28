import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { PersonSmEvent, PersonSmEventService } from '../person-sm-event';
import { EventSmEvent, EventSmEventService} from '../event-sm-event';
import { Principal, ResponseWrapper } from '../../shared';
import {ParticipantSmEvent} from '../participant-sm-event/participant-sm-event.model';
import {ParticipantSmEventService} from '../participant-sm-event/participant-sm-event.service';
import {ParticipantType} from '../participant-sm-event';

@Component({
    selector: 'jhi-event-sm-event-signing',
    templateUrl: './event-sm-event-signing.component.html'
})
export class EventSmEventSigningComponent implements OnInit, OnDestroy {

    children: PersonSmEvent[];
    participants: ParticipantSmEvent[];
    event: EventSmEvent;
    currentAccount: any;
    eventSubscriber: Subscription;
    subscription: Subscription;
    isSigningFor: boolean;
    queryCount: any;

    constructor(
        private participantService: ParticipantSmEventService,
        private personService: PersonSmEventService,
        private eventService: EventSmEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute
    ) {
        this.children = [];
        this.participants = [];
    }

    loadAll() {
        this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
    }

    reset() {
        this.children = [];
        this.participants = [];
        this.loadAll();
    }

    ngOnInit() {
        this.isSigningFor = false;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.loadAll();
        this.registerChangeInPeople();
    }

    load(eventId) {
        this.personService.getUserChildrenForEvent(eventId)
            .subscribe(
                (res: ResponseWrapper) => this.onSuccess(this.children, res.json),
                (res: ResponseWrapper) => this.onError(res.json)
            );
        this.participantService.getEventParticipants(eventId)
            .subscribe(
                (res: ResponseWrapper) => this.onSuccess(this.participants, res.json),
                (res: ResponseWrapper) => this.onError(res.json)
            );
        this.eventService.find(eventId).subscribe((event) => {
            this.event = event;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PersonSmEvent) {
        return item.id;
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe('participantListModification', (response) => this.reset());
    }

    select(childId) {
        this.children.filter((child) => child.id === childId).every((child) => child.selected = !child.selected);
    }

    signInSelected() {
        this.isSigningFor = true;
        this.subscribeForSaveResponse(
            this.participantService.addChildren(this.prepareParticipants()));
    }

    isPrimary(participant: ParticipantSmEvent) {
        return ParticipantType.PRIMARY === participant.participantType;
    }

    private subscribeForSaveResponse(result) {
        result.subscribe((res: ResponseWrapper) =>
            this.onSignForSuccess(res), (res: Response) => this.onSignForError());
    }

    private onSignForSuccess(result: ResponseWrapper) {
        this.eventManager.broadcast({name: 'participantListModification', content: 'OK'});
        this.isSigningFor = false;
    }

    private onSignForError() {

    }

    private prepareParticipants(): ParticipantSmEvent[] {
        const newParticipants: ParticipantSmEvent[] = [];
        this.children
            .filter((child) => child.selected)
            .forEach((child) => newParticipants.push(this.newParticipant(child)));
        return newParticipants;
    }

    private newParticipant(child): ParticipantSmEvent {
        const participant: ParticipantSmEvent = new ParticipantSmEvent();
        participant.eventId = this.event.id;
        participant.personId = child.id;
        return participant;
    }

    private onSuccess(result, data) {
        for (let i = 0; i < data.length; i++) {
            result.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
