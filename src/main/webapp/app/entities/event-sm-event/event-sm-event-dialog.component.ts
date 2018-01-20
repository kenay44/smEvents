import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventPopupService } from './event-sm-event-popup.service';
import { EventSmEventService } from './event-sm-event.service';

@Component({
    selector: 'jhi-event-sm-event-dialog',
    templateUrl: './event-sm-event-dialog.component.html'
})
export class EventSmEventDialogComponent implements OnInit {

    event: EventSmEvent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private eventService: EventSmEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<EventSmEvent>) {
        result.subscribe((res: EventSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EventSmEvent) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-event-sm-event-popup',
    template: ''
})
export class EventSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventSmEventDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
