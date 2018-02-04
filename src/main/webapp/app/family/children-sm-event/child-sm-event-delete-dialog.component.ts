import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ChildSmEvent } from './child-sm-event.model';
import { ChildSmEventPopupService } from './child-sm-event-popup.service';
import { ChildSmEventService } from './child-sm-event.service';

@Component({
    selector: 'jhi-child-sm-event-delete-dialog',
    templateUrl: './child-sm-event-delete-dialog.component.html'
})
export class ChildSmEventDeleteDialogComponent {

    person: ChildSmEvent;

    constructor(
        private personService: ChildSmEventService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personListModification',
                content: 'Deleted an person'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-person-sm-event-delete-popup',
    template: ''
})
export class ChildSmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: ChildSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personPopupService
                .open(ChildSmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
