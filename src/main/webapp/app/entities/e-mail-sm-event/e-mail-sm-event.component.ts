import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EMailSmEvent } from './e-mail-sm-event.model';
import { EMailSmEventService } from './e-mail-sm-event.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-e-mail-sm-event',
    templateUrl: './e-mail-sm-event.component.html'
})
export class EMailSmEventComponent implements OnInit, OnDestroy {
eMails: EMailSmEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private eMailService: EMailSmEventService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.eMailService.query().subscribe(
            (res: ResponseWrapper) => {
                this.eMails = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEMails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EMailSmEvent) {
        return item.id;
    }
    registerChangeInEMails() {
        this.eventSubscriber = this.eventManager.subscribe('eMailListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
