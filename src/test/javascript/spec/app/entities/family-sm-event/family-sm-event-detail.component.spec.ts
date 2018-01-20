/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { SmEventsTestModule } from '../../../test.module';
import { FamilySmEventDetailComponent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event-detail.component';
import { FamilySmEventService } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.service';
import { FamilySmEvent } from '../../../../../../main/webapp/app/entities/family-sm-event/family-sm-event.model';

describe('Component Tests', () => {

    describe('FamilySmEvent Management Detail Component', () => {
        let comp: FamilySmEventDetailComponent;
        let fixture: ComponentFixture<FamilySmEventDetailComponent>;
        let service: FamilySmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SmEventsTestModule],
                declarations: [FamilySmEventDetailComponent],
                providers: [
                    FamilySmEventService
                ]
            })
            .overrideTemplate(FamilySmEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FamilySmEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilySmEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FamilySmEvent(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.family).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
