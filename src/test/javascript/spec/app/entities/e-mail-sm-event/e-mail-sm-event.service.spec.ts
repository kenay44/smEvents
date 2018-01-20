/* tslint:disable max-line-length */
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, RequestOptions, BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { JhiDateUtils } from 'ng-jhipster';

import { EMailSmEventService } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.service';
import { EMailSmEvent } from '../../../../../../main/webapp/app/entities/e-mail-sm-event/e-mail-sm-event.model';
import { SERVER_API_URL } from '../../../../../../main/webapp/app/app.constants';

describe('Service Tests', () => {

    describe('EMailSmEvent Service', () => {
        let service: EMailSmEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                providers: [
                    {
                        provide: ConnectionBackend,
                        useClass: MockBackend
                    },
                    {
                        provide: RequestOptions,
                        useClass: BaseRequestOptions
                    },
                    Http,
                    JhiDateUtils,
                    EMailSmEventService
                ]
            });

            service = TestBed.get(EMailSmEventService);

            this.backend = TestBed.get(ConnectionBackend) as MockBackend;
            this.backend.connections.subscribe((connection: any) => {
                this.lastConnection = connection;
            });
        }));

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                expect(this.lastConnection).toBeDefined();

                const resourceUrl = SERVER_API_URL + 'api/e-mails';
                expect(this.lastConnection.request.url).toEqual(resourceUrl + '/' + 123);
            });
            it('should return EMailSmEvent', () => {

                let entity: EMailSmEvent;
                service.find(123).subscribe((_entity: EMailSmEvent) => {
                    entity = _entity;
                });

                this.lastConnection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({id: 123}),
                })));

                expect(entity).toBeDefined();
                expect(entity.id).toEqual(123);
            });

            it('should propagate not found response', () => {

                let error: any;
                service.find(123).subscribe(null, (_error: any) => {
                    error = _error;
                });

                this.lastConnection.mockError(new Response(new ResponseOptions({
                    status: 404,
                })));

                expect(error).toBeDefined();
                expect(error.status).toEqual(404);
            });
        });
    });

});
