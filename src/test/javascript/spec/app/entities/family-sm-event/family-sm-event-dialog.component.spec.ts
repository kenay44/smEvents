/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { FamilySmEventDialogComponent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event-dialog.component';
import { FamilySmEventService } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.service';
import { FamilySmEvent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.model';

describe('Component Tests', () => {

    describe('FamilySmEvent Management Dialog Component', () => {
        let comp: FamilySmEventDialogComponent;
        let fixture: ComponentFixture<FamilySmEventDialogComponent>;
        let service: FamilySmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [FamilySmEventDialogComponent],
                providers: [
                    FamilySmEventService
                ]
            })
            .overrideTemplate(FamilySmEventDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilySmEventDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilySmEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamilySmEvent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.family = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FamilySmEvent();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.family = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'familyListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
