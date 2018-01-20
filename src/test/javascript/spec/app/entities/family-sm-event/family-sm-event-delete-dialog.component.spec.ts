/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { FamilySmEventDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event-delete-dialog.component';
import { FamilySmEventService } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.service';

describe('Component Tests', () => {

    describe('FamilySmEvent Management Delete Component', () => {
        let comp: FamilySmEventDeleteDialogComponent;
        let fixture: ComponentFixture<FamilySmEventDeleteDialogComponent>;
        let service: FamilySmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [FamilySmEventDeleteDialogComponent],
                providers: [
                    FamilySmEventService
                ]
            })
            .overrideTemplate(FamilySmEventDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilySmEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilySmEventService);
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
