import { Component, EffectRef, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './counter.service';
import { FlightBookingStore } from './store/app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store = inject(FlightBookingStore);
  
  counter = this.counterService.counter;

  basket = this.store.basket;
  flights = this.store.flights;
  selected = this.store.selected;
  criteria = this.store.criteria;

  course = signal({
    id: 1,
    title: 'Angular Signals'
  });
  courses = signal([
    "Angular for Beginners",
    "Reactive Angular Course"
  ]);

  derivedCounter = computed(() => {
    const counter = this.counter();
    const courses = this.courses();

    const filteredCourses = courses.filter(course => course.includes('Angular'));

    return  filteredCourses?.length as number + counter + 1;
  });

  constructor(private counterService: CounterService) {
  }

  increment() {
    // this.counter.update(val => val + 1);

    // this.course.set({
    //   id: 1,
    //   title: `Updated Angular Signals` 
    // });

      this.counterService.increment();
    // this.courses.update(courses => [...courses, "Angular Core"]);
  }

}
