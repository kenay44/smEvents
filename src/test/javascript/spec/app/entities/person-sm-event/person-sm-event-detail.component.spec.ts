/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SmEventsTestModule } from '../../../test.module';
import { PersonSmEventDetailComponent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event-detail.component';
import { PersonSmEventService } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.service';
import { PersonSmEvent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.model';

describe('Component Tests', () => {

    describe('PersonSmEvent Management Detail Component', () => {
        let comp: PersonSmEventDetailComponent;
        let fixture: ComponentFixture<PersonSmEventDetailComponent>;
        let service: PersonSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [PersonSmEventDetailComponent],
                providers: [
                    PersonSmEventService
                ]
            })
            .overrideTemplate(PersonSmEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSmEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PersonSmEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.person).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
