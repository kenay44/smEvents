/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { ParticipantSmEventDialogComponent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event-dialog.component';
import { ParticipantSmEventService } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.service';
import { ParticipantSmEvent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.model';
import { PersonSmEventService } from '../../../../../../main/webapp/app/entities/person-sm-event';
import { EventSmEventService } from '../../../../../../main/webapp/app/entities/event-sm-event';

describe('Component Tests', () => {

    describe('ParticipantSmEvent Management Dialog Component', () => {
        let comp: ParticipantSmEventDialogComponent;
        let fixture: ComponentFixture<ParticipantSmEventDialogComponent>;
        let service: ParticipantSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [ParticipantSmEventDialogComponent],
                providers: [
                    PersonSmEventService,
                    EventSmEventService,
                    ParticipantSmEventService
                ]
            })
            .overrideTemplate(ParticipantSmEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParticipantSmEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipantSmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParticipantSmEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.participant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'participantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParticipantSmEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.participant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'participantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
