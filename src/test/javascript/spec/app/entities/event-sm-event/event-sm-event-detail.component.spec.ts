/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SmEventsTestModule } from '../../../test.module';
import { EventSmEventDetailComponent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event-detail.component';
import { EventSmEventService } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.service';
import { EventSmEvent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.model';

describe('Component Tests', () => {

    describe('EventSmEvent Management Detail Component', () => {
        let comp: EventSmEventDetailComponent;
        let fixture: ComponentFixture<EventSmEventDetailComponent>;
        let service: EventSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EventSmEventDetailComponent],
                providers: [
                    EventSmEventService
                ]
            })
            .overrideTemplate(EventSmEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventSmEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new EventSmEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.event).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
