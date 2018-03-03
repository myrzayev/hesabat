import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { BaseApi } from '../../../shared/core/base-api';
import { MyrEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }

  addEvent(event: MyrEvent): Observable<MyrEvent> {
    return this.post('events', event);
  }

  getEvent(): Observable<MyrEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<MyrEvent> {
    return this.get(`events/${id}`);
  }
}
