import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventService } from './event-sm-event.service';

@Injectable()
export class EventSmEventPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private eventService: EventSmEventService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.eventService.find(id).subscribe((event) => {
                    event.startDate = this.datePipe
                        .transform(event.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    event.endDate = this.datePipe
                        .transform(event.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.eventModalRef(component, event);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventModalRef(component, new EventSmEvent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventModalRef(component: Component, event: EventSmEvent): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.event = event;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
