/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SmEventsTestModule } from '../../../test.module';
import { EMailSmEventComponent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.component';
import { EMailSmEventService } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.service';
import { EMailSmEvent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.model';

describe('Component Tests', () => {

    describe('EMailSmEvent Management Component', () => {
        let comp: EMailSmEventComponent;
        let fixture: ComponentFixture<EMailSmEventComponent>;
        let service: EMailSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EMailSmEventComponent],
                providers: [
                    EMailSmEventService
                ]
            })
            .overrideTemplate(EMailSmEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EMailSmEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EMailSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EMailSmEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.eMails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
