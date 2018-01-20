/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SmEventsTestModule } from '../../../test.module';
import { EMailSmEventDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event-delete-dialog.component';
import { EMailSmEventService } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.service';

describe('Component Tests', () => {

    describe('EMailSmEvent Management Delete Component', () => {
        let comp: EMailSmEventDeleteDialogComponent;
        let fixture: ComponentFixture<EMailSmEventDeleteDialogComponent>;
        let service: EMailSmEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EMailSmEventDeleteDialogComponent],
                providers: [
                    EMailSmEventService
                ]
            })
            .overrideTemplate(EMailSmEventDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EMailSmEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EMailSmEventService);
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
