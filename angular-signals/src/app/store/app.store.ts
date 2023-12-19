import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FlightService } from './flight.service';
import { Observable, debounceTime, filter, switchMap, tap } from 'rxjs';

type Flight = {
  id: number;
  name: string;
  date: string;
};

export const FlightBookingStore = signalStore(
  { providedIn: 'root' },
  withState({
    from: 'Paris',
    to: 'London',
    initialized: false,
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  }),
  withComputed(({ flights, basket, from, to }) => ({
    selected: computed(() => flights().filter((flight) => basket()[flight.id])),
    criteria: computed(() => ({ from: from(), to: to() })),
  })),
  withMethods((state) => {
    const { flights, basket } = state;
    const flightService = inject(FlightService);

    return {
      updateCriteria: (from: string, to: string) => {
        patchState(state, { from, to });
      },

      connectCriteria: rxMethod<any>((c$) => c$.pipe(
        filter(c => c.from.length >= 3 && c.to.length >= 3),
        debounceTime(300),
        switchMap((c) => flightService.getFlights()),
        tap((flights: any) => patchState(state, { flights: toSignal<Flight[]>(flights as Observable<Flight[]>)() }))
      )),

      updateBasket: (flightId: number, selected: boolean) => {
        patchState(state, {
          basket: {
            ...basket(),
            [flightId]: selected,
          },
        });
      },
      delay: () => {
        const currentFlights = flights();
        const flight = currentFlights[0];

        const date = 'New Date';
        const updFlight = { ...flight, date };
        const updFlights = [updFlight, ...currentFlights.slice(1)];

        patchState(state, { flights: updFlights });
      },
      load: () => {
        const flights = toSignal(flightService.getFlights());
        patchState(state, { flights: flights() });
      },
    };
  }),
  withHooks({
    onInit({ load }) {
      console.log('OnInit state service');
      load()
    },
    onDestroy({ flights }) {
      console.log('flights are destroyed now', flights());
    },
  }),
);
