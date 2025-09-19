
import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { TrainersService } from '../../core/services/trainers.service';

@Component({
  standalone: true,
  selector: 'app-trainers',
  imports: [NgFor, AsyncPipe],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Meet Our Trainers</h2>
    <div class="grid">
      <article class="trainer" *ngFor="let t of trainers$ | async">
        <img [src]="t.photo" alt="{{t.name}}">
        <h4>{{ t.name }}</h4>
        <p class="bio">{{ t.bio }}</p>
        <div class="tags">
          <span *ngFor="let s of t.specialties">{{ s }}</span>
        </div>
      </article>
    </div>
  </section>
  `,
  styles: [`
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem}
    .trainer{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;text-align:center}
    .trainer img{width:100%;height:200px;object-fit:cover;border-radius:10px;margin-bottom:.5rem}
    .bio{color:#cbd5e1;min-height:48px}
    .tags{display:flex;flex-wrap:wrap;gap:.4rem;justify-content:center}
    .tags span{background:#001b2e;color:#e8f3f9;border:1px solid #00D4D8;border-radius:999px;padding:.2rem .6rem;font-size:.8rem}
  `]
})
export class TrainersComponent {
  trainers$ = this.svc.all();
  constructor(private svc: TrainersService){}
}
