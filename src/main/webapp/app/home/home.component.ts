import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { EventSmEvent, EventSmEventService } from '../entities/event-sm-event';

import {Account, ITEMS_PER_PAGE, LoginModalService, Principal, ResponseWrapper} from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    totalItems: number;
    events: EventSmEvent[];
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;

    constructor(
        protected principal: Principal,
        protected loginModalService: LoginModalService,
        protected eventManager: JhiEventManager,
        protected jhiAlertService: JhiAlertService,
        protected eventSmEventService: EventSmEventService,
        protected parseLinks: JhiParseLinks
    ) {
        this.events = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll() {
        this.eventSmEventService.queryPublished({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        })
        .subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.loadAll();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    protected onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.events.push(data[i]);
        }
    }

    protected onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    reset() {
        this.page = 0;
        this.events = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
}

@Component({
    selector: 'jhi-workshops',
    templateUrl: './workshop.component.html',
    styleUrls: [
        'home.css'
    ]
})
export class WorkshopComponent extends HomeComponent {

    constructor(
        protected principal: Principal,
        protected loginModalService: LoginModalService,
        protected eventManager: JhiEventManager,
        protected jhiAlertService: JhiAlertService,
        protected eventSmEventService: EventSmEventService,
        protected parseLinks: JhiParseLinks
    ) {
        super(principal, loginModalService, eventManager, jhiAlertService, eventSmEventService, parseLinks);
    }

    loadAll() {
        this.eventSmEventService.queryPublishedWorkshops({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        })
        .subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
}
