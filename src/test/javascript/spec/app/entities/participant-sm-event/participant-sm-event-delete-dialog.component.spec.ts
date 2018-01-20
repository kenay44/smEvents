/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { ParticipantSmEventDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event-delete-dialog.component';
import { ParticipantSmEventService } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.service';

describe('Component Tests', () => {

    describe('ParticipantSmEvent Management Delete Component', () => {
        let comp: ParticipantSmEventDeleteDialogComponent;
        let fixture: ComponentFixture<ParticipantSmEventDeleteDialogComponent>;
        let service: ParticipantSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [ParticipantSmEventDeleteDialogComponent],
                providers: [
                    ParticipantSmEventService
                ]
            })
            .overrideTemplate(ParticipantSmEventDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParticipantSmEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipantSmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
