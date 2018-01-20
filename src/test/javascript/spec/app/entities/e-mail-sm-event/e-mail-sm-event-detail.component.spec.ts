/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SmEventsTestModule } from '../../../test.module';
import { EMailSmEventDetailComponent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event-detail.component';
import { EMailSmEventService } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.service';
import { EMailSmEvent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.model';

describe('Component Tests', () => {

    describe('EMailSmEvent Management Detail Component', () => {
        let comp: EMailSmEventDetailComponent;
        let fixture: ComponentFixture<EMailSmEventDetailComponent>;
        let service: EMailSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EMailSmEventDetailComponent],
                providers: [
                    EMailSmEventService
                ]
            })
            .overrideTemplate(EMailSmEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EMailSmEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EMailSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EMailSmEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.eMail).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
