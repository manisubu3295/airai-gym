
import { Component, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ClassesService } from '../../core/services/classes.service';

@Component({
  standalone: true,
  selector: 'app-schedule',
  imports: [NgFor, NgIf, AsyncPipe],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Class Schedule</h2>
    <div class="filters">
      <select (change)="type.set(($event.target as HTMLSelectElement).value)">
        <option value="">All Types</option>
        <option>Yoga</option><option>HIIT</option><option>CrossFit</option><option>Zumba</option>
      </select>
      <select (change)="level.set(($event.target as HTMLSelectElement).value)">
        <option value="">All Levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
      </select>
    </div>
    <div class="grid">
      <article class="slot" *ngFor="let c of filtered() | async">
        <h4>{{ c.name }}</h4>
        <p>{{ c.type }} • {{ c.level }} • {{ c.duration }} mins</p>
        <div class="times">
          <span *ngFor="let s of c.schedule">{{ s.day }} {{ s.time }}</span>
        </div>
        <button class="btn" (click)="book(c.id)">Book Class</button>
      </article>
    </div>
  </section>
  `,
  styles: [`
    .filters{display:flex;gap:.75rem;margin:1rem 0}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
    .slot{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem}
    .times{display:flex;flex-wrap:wrap;gap:.4rem;color:#cbd5e1;margin:.5rem 0}
    .btn{background:#00D4D8;color:#001b2e;border:none;border-radius:10px;padding:.6rem .9rem;font-weight:700}
  `]
})
export class ScheduleComponent {
  type = signal<string>('');
  level = signal<string>('');
  constructor(private classes: ClassesService) {}
  filtered = () => this.classes.filterBy({ type: this.type(), level: this.level() });
  book(id:string){ const k='bookings'; const list = JSON.parse(localStorage.getItem(k) || '[]'); list.push({classId:id, ts: Date.now()}); localStorage.setItem(k, JSON.stringify(list)); alert('Booked (mock): '+id); }
}
