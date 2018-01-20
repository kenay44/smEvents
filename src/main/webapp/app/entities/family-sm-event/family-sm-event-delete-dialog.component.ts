import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FamilySmEvent } from './family-sm-event.model';
import { FamilySmEventPopupService } from './family-sm-event-popup.service';
import { FamilySmEventService } from './family-sm-event.service';

@Component({
    selector: 'jhi-family-sm-event-delete-dialog',
    templateUrl: './family-sm-event-delete-dialog.component.html'
})
export class FamilySmEventDeleteDialogComponent {

    family: FamilySmEvent;

    constructor(
        private familyService: FamilySmEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.familyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'familyListModification',
                content: 'Deleted an family'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-family-sm-event-delete-popup',
    template: ''
})
export class FamilySmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private familyPopupService: FamilySmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.familyPopupService
                .open(FamilySmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
