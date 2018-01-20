import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventSmEventService {

    private resourceUrl =  SERVER_API_URL + 'api/events';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(event: EventSmEvent): Observable<EventSmEvent> {
        const copy = this.convert(event);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(event: EventSmEvent): Observable<EventSmEvent> {
        const copy = this.convert(event);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EventSmEvent> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to EventSmEvent.
     */
    private convertItemFromServer(json: any): EventSmEvent {
        const entity: EventSmEvent = Object.assign(new EventSmEvent(), json);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a EventSmEvent to a JSON which can be sent to the server.
     */
    private convert(event: EventSmEvent): EventSmEvent {
        const copy: EventSmEvent = Object.assign({}, event);

        copy.startDate = this.dateUtils.toDate(event.startDate);

        copy.endDate = this.dateUtils.toDate(event.endDate);
        return copy;
    }
}
