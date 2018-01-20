import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EMailSmEvent } from './e-mail-sm-event.model';
import { EMailSmEventService } from './e-mail-sm-event.service';

@Component({
    selector: 'jhi-e-mail-sm-event-detail',
    templateUrl: './e-mail-sm-event-detail.component.html'
})
export class EMailSmEventDetailComponent implements OnInit, OnDestroy {

    eMail: EMailSmEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eMailService: EMailSmEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEMails();
    }

    load(id) {
        this.eMailService.find(id).subscribe((eMail) => {
            this.eMail = eMail;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEMails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eMailListModification',
            (response) => this.load(this.eMail.id)
        );
    }
}
