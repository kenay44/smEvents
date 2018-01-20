import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PersonSmEvent } from './person-sm-event.model';
import { PersonSmEventPopupService } from './person-sm-event-popup.service';
import { PersonSmEventService } from './person-sm-event.service';

@Component({
    selector: 'jhi-person-sm-event-delete-dialog',
    templateUrl: './person-sm-event-delete-dialog.component.html'
})
export class PersonSmEventDeleteDialogComponent {

    person: PersonSmEvent;

    constructor(
        private personService: PersonSmEventService,
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
export class PersonSmEventDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personPopupService: PersonSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personPopupService
                .open(PersonSmEventDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
