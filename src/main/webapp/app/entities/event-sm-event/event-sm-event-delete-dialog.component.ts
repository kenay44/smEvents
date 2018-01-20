import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventPopupService } from './event-sm-event-popup.service';
import { EventSmEventService } from './event-sm-event.service';

@Component({
    selector: 'jhi-event-sm-event-delete-dialog',
    templateUrl: './event-sm-event-delete-dialog.component.html'
})
export class EventSmEventDeleteDialogComponent {

    event: EventSmEvent;

    constructor(
        private eventService: EventSmEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventListModification',
                content: 'Deleted an event'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-event-sm-event-delete-popup',
    template: ''
})
export class EventSmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventPopupService
                .open(EventSmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
