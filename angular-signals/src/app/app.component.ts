import { Component, EffectRef, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  counter = this.counterService.counter;
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
