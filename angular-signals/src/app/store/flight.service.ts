import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FlightService {
  getFlights(): Observable<any> {
    return of([{ id: 1, name: 'Monaco', date: '' }]);
  }
}
