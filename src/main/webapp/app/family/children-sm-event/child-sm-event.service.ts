import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ChildSmEvent } from './child-sm-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ChildSmEventService {

    private resourceUrl =  SERVER_API_URL + 'api/people/family';

    constructor(private http: Http) { }

    create(person: ChildSmEvent): Observable<ChildSmEvent> {
        const copy = this.convert(person);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(person: ChildSmEvent): Observable<ChildSmEvent> {
        const copy = this.convert(person);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ChildSmEvent> {
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
     * Convert a returned JSON object to PersonSmEvent.
     */
    private convertItemFromServer(json: any): ChildSmEvent {
        const entity: ChildSmEvent = Object.assign(new ChildSmEvent(), json);
        return entity;
    }

    /**
     * Convert a PersonSmEvent to a JSON which can be sent to the server.
     */
    private convert(person: ChildSmEvent): ChildSmEvent {
        const copy: ChildSmEvent = Object.assign({}, person);
        return copy;
    }
}
