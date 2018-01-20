/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SmEventsTestModule } from '../../../test.module';
import { ParticipantSmEventComponent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.component';
import { ParticipantSmEventService } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.service';
import { ParticipantSmEvent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.model';

describe('Component Tests', () => {

    describe('ParticipantSmEvent Management Component', () => {
        let comp: ParticipantSmEventComponent;
        let fixture: ComponentFixture<ParticipantSmEventComponent>;
        let service: ParticipantSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [ParticipantSmEventComponent],
                providers: [
                    ParticipantSmEventService
                ]
            })
            .overrideTemplate(ParticipantSmEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParticipantSmEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipantSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ParticipantSmEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.participants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
