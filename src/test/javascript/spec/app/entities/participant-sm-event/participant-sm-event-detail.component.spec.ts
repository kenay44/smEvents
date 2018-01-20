/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SmEventsTestModule } from '../../../test.module';
import { ParticipantSmEventDetailComponent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event-detail.component';
import { ParticipantSmEventService } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.service';
import { ParticipantSmEvent } from '../../../../../../main/webapp/app/entities/participant-sm-event/participant-sm-event.model';

describe('Component Tests', () => {

    describe('ParticipantSmEvent Management Detail Component', () => {
        let comp: ParticipantSmEventDetailComponent;
        let fixture: ComponentFixture<ParticipantSmEventDetailComponent>;
        let service: ParticipantSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [ParticipantSmEventDetailComponent],
                providers: [
                    ParticipantSmEventService
                ]
            })
            .overrideTemplate(ParticipantSmEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParticipantSmEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipantSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ParticipantSmEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.participant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
