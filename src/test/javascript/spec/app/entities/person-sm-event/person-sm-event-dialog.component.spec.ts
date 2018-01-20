/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { PersonSmEventDialogComponent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event-dialog.component';
import { PersonSmEventService } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.service';
import { PersonSmEvent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.model';
import { FamilySmEventService } from '../../../../../../main/webapp/app/entities/family-sm-event';

describe('Component Tests', () => {

    describe('PersonSmEvent Management Dialog Component', () => {
        let comp: PersonSmEventDialogComponent;
        let fixture: ComponentFixture<PersonSmEventDialogComponent>;
        let service: PersonSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [PersonSmEventDialogComponent],
                providers: [
                    FamilySmEventService,
                    PersonSmEventService
                ]
            })
            .overrideTemplate(PersonSmEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSmEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonSmEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.person = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonSmEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.person = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
