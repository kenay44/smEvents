import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ChildSmEvent } from './child-sm-event.model';
import { ChildSmEventPopupService } from './child-sm-event-popup.service';
import { ChildSmEventService } from './child-sm-event.service';
import { FamilySmEvent } from '../../entities/family-sm-event';

@Component({
    selector: 'jhi-child-sm-event-dialog',
    templateUrl: './child-sm-event-dialog.component.html'
})
export class ChildSmEventDialogComponent implements OnInit {

    person: ChildSmEvent;
    isSaving: boolean;

    families: FamilySmEvent[];
    clothSizes: string[];
    birthYears: number[];
    sexes: string[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personService: ChildSmEventService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clothSizes = ['XS_KIDS', 'S_KIDS', 'M_KIDS', 'L_KIDS', 'XL_KIDS', 'XS', 'S', 'M', 'L', 'XL'];
        this.sexes = ['MALE', 'FEMALE'];
        const firstYear = new Date().getFullYear() - 8;
        this.birthYears = [];
        for (let i = 0; i < 10; i ++) {
            this.birthYears.push(firstYear - i);
        }
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

    private subscribeToSaveResponse(result: Observable<ChildSmEvent>) {
        result.subscribe((res: ChildSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ChildSmEvent) {
        this.eventManager.broadcast({ name: 'personListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    // private onError(error: any) {
    //     this.jhiAlertService.error(error.message, null, null);
    // }

    trackFamilyById(index: number, item: FamilySmEvent) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-person-sm-event-popup',
    template: ''
})
export class ChildSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: ChildSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personPopupService
                    .open(ChildSmEventDialogComponent as Component, params['id']);
            } else {
                this.personPopupService
                    .open(ChildSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
