/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { EventSmEventDialogComponent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event-dialog.component';
import { EventSmEventService } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.service';
import { EventSmEvent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.model';

describe('Component Tests', () => {

    describe('EventSmEvent Management Dialog Component', () => {
        let comp: EventSmEventDialogComponent;
        let fixture: ComponentFixture<EventSmEventDialogComponent>;
        let service: EventSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EventSmEventDialogComponent],
                providers: [
                    EventSmEventService
                ]
            })
            .overrideTemplate(EventSmEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventSmEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventSmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventSmEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EventSmEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.event = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eventListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
