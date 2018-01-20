import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ParticipantSmEvent } from './participant-sm-event.model';
import { ParticipantSmEventPopupService } from './participant-sm-event-popup.service';
import { ParticipantSmEventService } from './participant-sm-event.service';

@Component({
    selector: 'jhi-participant-sm-event-delete-dialog',
    templateUrl: './participant-sm-event-delete-dialog.component.html'
})
export class ParticipantSmEventDeleteDialogComponent {

    participant: ParticipantSmEvent;

    constructor(
        private participantService: ParticipantSmEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.participantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'participantListModification',
                content: 'Deleted an participant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-participant-sm-event-delete-popup',
    template: ''
})
export class ParticipantSmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private participantPopupService: ParticipantSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.participantPopupService
                .open(ParticipantSmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
