import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventSmEvent } from './event-sm-event.model';
import { EventSmEventService } from './event-sm-event.service';

@Injectable()
export class EventSmEventPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
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
                    if (event.startDate) {
                        event.startDate = {
                            year: event.startDate.getFullYear(),
                            month: event.startDate.getMonth() + 1,
                            day: event.startDate.getDate()
                        };
                    }
                    if (event.endDate) {
                        event.endDate = {
                            year: event.endDate.getFullYear(),
                            month: event.endDate.getMonth() + 1,
                            day: event.endDate.getDate()
                        };
                    }
                    if (event.signUpStartDate) {
                        event.signUpStartDate = {
                            year: event.signUpStartDate.getFullYear(),
                            month: event.signUpStartDate.getMonth() + 1,
                            day: event.signUpStartDate.getDate()
                        };
                    }
                    if (event.firstRateDate) {
                        event.firstRateDate = {
                            year: event.firstRateDate.getFullYear(),
                            month: event.firstRateDate.getMonth() + 1,
                            day: event.firstRateDate.getDate()
                        };
                    }
                    if (event.secondRateDate) {
                        event.secondRateDate = {
                            year: event.secondRateDate.getFullYear(),
                            month: event.secondRateDate.getMonth() + 1,
                            day: event.secondRateDate.getDate()
                        };
                    }
                    if (event.signUpStartTime) {
                        event.signUpStartTime = {
                            hour: event.signUpStartTime.split(':')[0],
                            minute: event.signUpStartTime.split(':')[1]
                        }
                    }
                    /*event.startDate = this.datePipe
                        .transform(event.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    event.endDate = this.datePipe
                        .transform(event.endDate, 'yyyy-MM-ddTHH:mm:ss');*/
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
