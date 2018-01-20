/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SmEventsTestModule } from '../../../test.module';
import { EventSmEventComponent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.component';
import { EventSmEventService } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.service';
import { EventSmEvent } from '../../../../../../main/webapp/app/entities/event-sm-event/event-sm-event.model';

describe('Component Tests', () => {

    describe('EventSmEvent Management Component', () => {
        let comp: EventSmEventComponent;
        let fixture: ComponentFixture<EventSmEventComponent>;
        let service: EventSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [EventSmEventComponent],
                providers: [
                    EventSmEventService
                ]
            })
            .overrideTemplate(EventSmEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EventSmEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EventSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new EventSmEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.events[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
