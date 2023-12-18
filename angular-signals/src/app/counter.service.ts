import { Injectable, OnInit, effect, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CounterService {
    private counterSignal = signal(0);

    readonly counter =  this.counterSignal.asReadonly();

    constructor() {
        effect(() => {
            const counterValue = this.counterSignal();
            console.log(`counter: ${counterValue} side effect`);
          });
    }

    increment() {
        console.log('Increment');
        this.counterSignal.update(counter => counter + 1);
    }

    decrement() {
        this.counterSignal.update(counter => counter - 1);
    }

    
}