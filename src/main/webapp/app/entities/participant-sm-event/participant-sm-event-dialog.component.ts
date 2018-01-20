import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParticipantSmEvent } from './participant-sm-event.model';
import { ParticipantSmEventPopupService } from './participant-sm-event-popup.service';
import { ParticipantSmEventService } from './participant-sm-event.service';
import { PersonSmEvent, PersonSmEventService } from '../person-sm-event';
import { EventSmEvent, EventSmEventService } from '../event-sm-event';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-participant-sm-event-dialog',
    templateUrl: './participant-sm-event-dialog.component.html'
})
export class ParticipantSmEventDialogComponent implements OnInit {

    participant: ParticipantSmEvent;
    isSaving: boolean;

    people: PersonSmEvent[];

    events: EventSmEvent[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private participantService: ParticipantSmEventService,
        private personService: PersonSmEventService,
        private eventService: EventSmEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.eventService.query()
            .subscribe((res: ResponseWrapper) => { this.events = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.participant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.participantService.update(this.participant));
        } else {
            this.subscribeToSaveResponse(
                this.participantService.create(this.participant));
        }
    }

    private subscribeToSaveResponse(result: Observable<ParticipantSmEvent>) {
        result.subscribe((res: ParticipantSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ParticipantSmEvent) {
        this.eventManager.broadcast({ name: 'participantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: PersonSmEvent) {
        return item.id;
    }

    trackEventById(index: number, item: EventSmEvent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-participant-sm-event-popup',
    template: ''
})
export class ParticipantSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private participantPopupService: ParticipantSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.participantPopupService
                    .open(ParticipantSmEventDialogComponent as Component, params['id']);
            } else {
                this.participantPopupService
                    .open(ParticipantSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
