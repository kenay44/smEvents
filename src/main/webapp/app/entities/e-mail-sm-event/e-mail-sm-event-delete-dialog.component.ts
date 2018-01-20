import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EMailSmEvent } from './e-mail-sm-event.model';
import { EMailSmEventPopupService } from './e-mail-sm-event-popup.service';
import { EMailSmEventService } from './e-mail-sm-event.service';

@Component({
    selector: 'jhi-e-mail-sm-event-delete-dialog',
    templateUrl: './e-mail-sm-event-delete-dialog.component.html'
})
export class EMailSmEventDeleteDialogComponent {

    eMail: EMailSmEvent;

    constructor(
        private eMailService: EMailSmEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eMailService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eMailListModification',
                content: 'Deleted an eMail'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-e-mail-sm-event-delete-popup',
    template: ''
})
export class EMailSmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eMailPopupService: EMailSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eMailPopupService
                .open(EMailSmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
