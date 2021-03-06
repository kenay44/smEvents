import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ParticipantSmEvent } from './participant-sm-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ParticipantSmEventService {

    private resourceUrl =  SERVER_API_URL + 'api/participants';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(participant: ParticipantSmEvent): Observable<ParticipantSmEvent> {
        const copy = this.convert(participant);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    addChildren(participants: ParticipantSmEvent[]): Observable<ResponseWrapper> {
        return this.http.post(`${this.resourceUrl}/sign/children`, participants);
    }

    update(participant: ParticipantSmEvent): Observable<ParticipantSmEvent> {
        const copy = this.convert(participant);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ParticipantSmEvent> {
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
        return this.http.delete(`${this.resourceUrl}/${id}/child`);
    }

    notify(id: number): Observable<Response> {
        return this.http.get(`${this.resourceUrl}/event/${id}/notify`);
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
     * Convert a returned JSON object to ParticipantSmEvent.
     */
    private convertItemFromServer(json: any): ParticipantSmEvent {
        const entity: ParticipantSmEvent = Object.assign(new ParticipantSmEvent(), json);
        entity.signedDate = this.dateUtils
            .convertDateTimeFromServer(json.signedDate);
        return entity;
    }

    /**
     * Convert a ParticipantSmEvent to a JSON which can be sent to the server.
     */
    private convert(participant: ParticipantSmEvent): ParticipantSmEvent {
        const copy: ParticipantSmEvent = Object.assign({}, participant);

        copy.signedDate = this.dateUtils.toDate(participant.signedDate);
        return copy;
    }

    getEventParticipants(eventId: number): Observable<ResponseWrapper> {
        return this.http.get(`${this.resourceUrl}/event/${eventId}`)
            .map((res: Response) => this.convertResponse(res));
    }
}
