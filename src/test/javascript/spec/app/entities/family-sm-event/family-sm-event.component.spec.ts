/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { SmEventsTestModule } from '../../../test.module';
import { FamilySmEventComponent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.component';
import { FamilySmEventService } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.service';
import { FamilySmEvent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.model';

describe('Component Tests', () => {

    describe('FamilySmEvent Management Component', () => {
        let comp: FamilySmEventComponent;
        let fixture: ComponentFixture<FamilySmEventComponent>;
        let service: FamilySmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [FamilySmEventComponent],
                providers: [
                    FamilySmEventService
                ]
            })
            .overrideTemplate(FamilySmEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilySmEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilySmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FamilySmEvent(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.families[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
