/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { EMailSmEventDialogComponent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event-dialog.component';
import { EMailSmEventService } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.service';
import { EMailSmEvent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.model';
import { EventSmEventService } from '../../../../../../main/webapp/app/entities/event-sm-event';
import { PersonSmEventService } from '../../../../../../main/webapp/app/entities/person-sm-event';

describe('Component Tests', () => {

    describe('EMailSmEvent Management Dialog Component', () => {
        let comp: EMailSmEventDialogComponent;
        let fixture: ComponentFixture<EMailSmEventDialogComponent>;
        let service: EMailSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EMailSmEventDialogComponent],
                providers: [
                    EventSmEventService,
                    PersonSmEventService,
                    EMailSmEventService
                ]
            })
            .overrideTemplate(EMailSmEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EMailSmEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EMailSmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EMailSmEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.eMail = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eMailListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EMailSmEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.eMail = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'eMailListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
