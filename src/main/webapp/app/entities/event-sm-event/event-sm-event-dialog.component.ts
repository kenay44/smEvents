import { Component, OnInit, OnDestroy, Directive, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventPopupService } from './event-sm-event-popup.service';
import { EventSmEventService } from './event-sm-event.service';
import { NG_VALIDATORS, FormControl, ValidatorFn, Validators } from '@angular/forms';

class MyValidators {
    static min(minValue: Number) {
        return function(control: FormControl) {
            const currentValue = control.value;
            if (minValue > Number(currentValue)) {
                return {
                    min: {
                        value: currentValue,
                        required: minValue
                    }
                }
            }
            return null;
        }
    }

    static max(maxValue: Number) {
        return function(control: FormControl) {
            const currentValue = control.value;
            if (maxValue < Number(currentValue)) {
                return {
                    max: {
                        value: currentValue,
                        required: maxValue
                    }
                }
            }
            return null;
        }
    }
}

@Directive({
    selector: '[jhiMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MinValueValidatorDirective,
        multi: true
    }]
})
export class MinValueValidatorDirective implements OnChanges {
    @Input('jhiMin') jhiMin: string;
    private valFn: ValidatorFn;

    ngOnChanges(): void {
        if (this.jhiMin) {
            this.valFn = MyValidators.min(Number(this.jhiMin));
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: FormControl) {
        return this.valFn(control);
    }
}

@Directive({
    selector: '[jhiMax][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: MaxValueValidatorDirective,
        multi: true
    }]
})
export class MaxValueValidatorDirective implements OnChanges {
    @Input('jhiMax') jhiMax: string;
    private valFn: ValidatorFn;

    ngOnChanges(): void {
        if (this.jhiMax) {
            this.valFn = MyValidators.max(Number(this.jhiMax));
        } else {
            this.valFn = Validators.nullValidator;
        }
    }

    validate(control: FormControl) {
        return this.valFn(control);
    }
}

@Component({
    selector: 'jhi-event-sm-event-dialog',
    templateUrl: './event-sm-event-dialog.component.html'
})
export class EventSmEventDialogComponent implements OnInit {

    event: EventSmEvent;
    isSaving: boolean;
    eventTypes: string[];

    constructor(
        public activeModal: NgbActiveModal,
        private timePickerConfig: NgbTimepickerConfig,
        private eventService: EventSmEventService,
        private eventManager: JhiEventManager,
    ) {
        timePickerConfig.spinners = false;
        timePickerConfig.size = 'small';
    }

    ngOnInit() {
        this.isSaving = false;
        this.eventTypes = ['CRUISE', 'FIRST_TACK', 'BOSUN_WORKS'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<EventSmEvent>) {
        result.subscribe((res: EventSmEvent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EventSmEvent) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-event-sm-event-popup',
    template: ''
})
export class EventSmEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventSmEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventSmEventDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventSmEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
