import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { saveAs } from 'file-saver/FileSaver';

import { JhiDateUtils } from 'ng-jhipster';

import { EventSmEvent } from './event-sm-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EventSmEventService {

    private resourceUrl =  SERVER_API_URL + 'api/events';
    private publicResourceUrl =  SERVER_API_URL + 'api/public/events';

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

    queryPublished(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(`${this.resourceUrl}/published`, options)
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
            .convertLocalDateFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertLocalDateFromServer(json.endDate);
        entity.firstRateDate = this.dateUtils
            .convertLocalDateFromServer(json.firstRateDate);
        entity.secondRateDate = this.dateUtils
            .convertLocalDateFromServer(json.secondRateDate);
        entity.signUpStartDate = this.dateUtils
            .convertLocalDateFromServer(json.signUpStartDate);
        return entity;
    }

    /**
     * Convert a EventSmEvent to a JSON which can be sent to the server.
     */
    private convert(event: EventSmEvent): EventSmEvent {
        const copy: EventSmEvent = Object.assign({}, event);

        copy.startDate = this.dateUtils
            .convertLocalDateToServer(event.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(event.endDate);
        copy.firstRateDate = this.dateUtils
            .convertLocalDateToServer(event.firstRateDate);
        copy.secondRateDate = this.dateUtils
            .convertLocalDateToServer(event.secondRateDate);
        copy.signUpStartDate = this.dateUtils
            .convertLocalDateToServer(event.signUpStartDate);
        copy.signUpStartTime = this.convertNgbTimetoJSON(event.signUpStartTime)
        return copy;
    }

    private convertNgbTimetoJSON(time: any): string {
        if (time) {
            let result = '';
            if (time.hour.toString().length === 1) {
                result = '0';
            }
            result += time.hour + ':';
            if (time.minute.toString().length === 1) {
                result += '0';
            }
            result += time.minute.toString();
            result += ':00';
            return result;
        }
        return undefined;
    }

    queryPublishedWorkshops(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(`${this.publicResourceUrl}/workshops`, options)
            .map((res: Response) => this.convertResponse(res));

    }

    saveFile(eventId: number) {
        const headers = new Headers();
        headers.append('Accept', 'text/plain');
        this.http.get(`/api/participants/event/${eventId}/csv`, {headers})
            .toPromise()
            .then((response) => {
                return this.saveToFileSystem(response);
            });
    }

    private saveToFileSystem(response) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1];
        const blob = new Blob([response._body], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename);
    }
}
