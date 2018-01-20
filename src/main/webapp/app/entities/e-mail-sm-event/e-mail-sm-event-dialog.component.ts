import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EMailSmEvent } from './e-mail-sm-event.model';
import { EMailSmEventPopupService } from './e-mail-sm-event-popup.service';
import { EMailSmEventService } from './e-mail-sm-event.service';
import { EventSmEvent, EventSmEventService } from '../event-sm-event';
import { PersonSmEvent, PersonSmEventService } from '../person-sm-event';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-e-mail-sm-event-dialog',
    templateUrl: './e-mail-sm-event-dialog.component.html'
})
export class EMailSmEventDialogComponent implements OnInit {

    eMail: EMailSmEvent;
    isSaving: boolean;

    events: EventSmEvent[];

    people: PersonSmEvent[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eMailService: EMailSmEventService,
        private eventService: EventSmEventService,
        private personService: PersonSmEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.eventService.query()
            .subscribe((res: ResponseWrapper) => { this.events = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.eMail.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eMailService.update(this.eMail));
        } else {
            this.subscribeToSaveResponse(
                this.eMailService.create(this.eMail));
        }
    }

    private subscribeToSaveResponse(result: Observable<EMailSmEvent>) {
        result.subscribe((res: EMailSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EMailSmEvent) {
        this.eventManager.broadcast({ name: 'eMailListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEventById(index: number, item: EventSmEvent) {
        return item.id;
    }

    trackPersonById(index: number, item: PersonSmEvent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-e-mail-sm-event-popup',
    template: ''
})
export class EMailSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eMailPopupService: EMailSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eMailPopupService
                    .open(EMailSmEventDialogComponent as Component, params['id']);
            } else {
                this.eMailPopupService
                    .open(EMailSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
