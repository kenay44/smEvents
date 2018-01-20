import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FamilySmEvent } from './family-sm-event.model';
import { FamilySmEventPopupService } from './family-sm-event-popup.service';
import { FamilySmEventService } from './family-sm-event.service';

@Component({
    selector: 'jhi-family-sm-event-dialog',
    templateUrl: './family-sm-event-dialog.component.html'
})
export class FamilySmEventDialogComponent implements OnInit {

    family: FamilySmEvent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private familyService: FamilySmEventService,
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
        if (this.family.id !== undefined) {
            this.subscribeToSaveResponse(
                this.familyService.update(this.family));
        } else {
            this.subscribeToSaveResponse(
                this.familyService.create(this.family));
        }
    }

    private subscribeToSaveResponse(result: Observable<FamilySmEvent>) {
        result.subscribe((res: FamilySmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FamilySmEvent) {
        this.eventManager.broadcast({ name: 'familyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-family-sm-event-popup',
    template: ''
})
export class FamilySmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilySmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.familyPopupService
                    .open(FamilySmEventDialogComponent as Component, params['id']);
            } else {
                this.familyPopupService
                    .open(FamilySmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
