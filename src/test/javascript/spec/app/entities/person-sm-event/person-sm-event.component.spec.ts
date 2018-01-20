/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SmEventsTestModule } from '../../../test.module';
import { PersonSmEventComponent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.component';
import { PersonSmEventService } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.service';
import { PersonSmEvent } from '../../../../../../main/webapp/app/entities/person-sm-event/person-sm-event.model';

describe('Component Tests', () => {

    describe('PersonSmEvent Management Component', () => {
        let comp: PersonSmEventComponent;
        let fixture: ComponentFixture<PersonSmEventComponent>;
        let service: PersonSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [PersonSmEventComponent],
                providers: [
                    PersonSmEventService
                ]
            })
            .overrideTemplate(PersonSmEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonSmEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonSmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PersonSmEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
