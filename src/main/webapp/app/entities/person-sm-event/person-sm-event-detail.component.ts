import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PersonSmEvent } from './person-sm-event.model';
import { PersonSmEventService } from './person-sm-event.service';

@Component({
    selector: 'jhi-person-sm-event-detail',
    templateUrl: './person-sm-event-detail.component.html'
})
export class PersonSmEventDetailComponent implements OnInit, OnDestroy {

    person: PersonSmEvent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private personService: PersonSmEventService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPeople();
    }

    load(id) {
        this.personService.find(id).subscribe((person) => {
            this.person = person;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe(
            'personListModification',
            (response) => this.load(this.person.id)
        );
    }
}
