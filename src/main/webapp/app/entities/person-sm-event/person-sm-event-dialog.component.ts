import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PersonSmEvent } from './person-sm-event.model';
import { PersonSmEventPopupService } from './person-sm-event-popup.service';
import { PersonSmEventService } from './person-sm-event.service';
import { FamilySmEvent, FamilySmEventService } from '../family-sm-event';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-person-sm-event-dialog',
    templateUrl: './person-sm-event-dialog.component.html'
})
export class PersonSmEventDialogComponent implements OnInit {

    person: PersonSmEvent;
    isSaving: boolean;

    families: FamilySmEvent[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: PersonSmEventService,
        private familyService: FamilySmEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.familyService.query()
            .subscribe((res: ResponseWrapper) => { this.families = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(
                this.personService.create(this.person));
        }
    }

    private subscribeToSaveResponse(result: Observable<PersonSmEvent>) {
        result.subscribe((res: PersonSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PersonSmEvent) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFamilyById(index: number, item: FamilySmEvent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-person-sm-event-popup',
    template: ''
})
export class PersonSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(PersonSmEventDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(PersonSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
