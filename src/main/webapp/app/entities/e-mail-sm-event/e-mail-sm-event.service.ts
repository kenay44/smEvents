import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EMailSmEvent } from './e-mail-sm-event.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EMailSmEventService {

    private resourceUrl =  SERVER_API_URL + 'api/e-mails';

    constructor(private http: Http) { }

    create(eMail: EMailSmEvent): Observable<EMailSmEvent> {
        const copy = this.convert(eMail);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(eMail: EMailSmEvent): Observable<EMailSmEvent> {
        const copy = this.convert(eMail);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<EMailSmEvent> {
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
     * Convert a returned JSON object to EMailSmEvent.
     */
    private convertItemFromServer(json: any): EMailSmEvent {
        const entity: EMailSmEvent = Object.assign(new EMailSmEvent(), json);
        return entity;
    }

    /**
     * Convert a EMailSmEvent to a JSON which can be sent to the server.
     */
    private convert(eMail: EMailSmEvent): EMailSmEvent {
        const copy: EMailSmEvent = Object.assign({}, eMail);
        return copy;
    }
}
