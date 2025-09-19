
import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Testimonial { id:string; name:string; photo:string; story:string; rating:number; beforeImg?:string; afterImg?:string; }

@Component({
  standalone: true,
  selector: 'app-testimonials',
  imports: [NgFor, AsyncPipe],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 class="title">Member Transformations</h2>
    <div class="grid">
      <article class="t" *ngFor="let t of testimonials | async">
        <div class="t__head">
          <img [src]="t.photo || '/assets/images/trainers/anita.jpg'" alt="{{t.name}}">
          <div>
            <h4>{{ t.name }}</h4>
            <p class="stars" [attr.aria-label]="'Rating: '+t.rating">{"★".repeat(5).slice(0,t.rating)}<span class="dim">{{"★".repeat(5-t.rating)}}</span></p>
          </div>
        </div>
        <p class="story">{{ t.story }}</p>
        <div class="ba" *ngIf="t.beforeImg || t.afterImg">
          <img *ngIf="t.beforeImg" [src]="t.beforeImg" alt="Before">
          <img *ngIf="t.afterImg" [src]="t.afterImg" alt="After">
        </div>
      </article>
    </div>
  </section>
  `,
  styles: [`
    .title{color:#e8f3f9}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:1rem}
    .t{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;transition:transform .2s ease, box-shadow .2s ease}
    .t:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(0,0,0,.28)}
    .t__head{display:flex;gap:.75rem;align-items:center;margin-bottom:.5rem}
    .t__head img{width:56px;height:56px;border-radius:999px;object-fit:cover;border:2px solid #00D4D8}
    .stars{color:#ffd166;margin:0}.dim{opacity:.25}
    .story{color:#cbd5e1}
    .ba{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.5rem}
    .ba img{width:100%;height:120px;object-fit:cover;border-radius:10px}
  `]
})
export class TestimonialsComponent{
  testimonials = this.http.get<Testimonial[]>('/assets/data/testimonials.json');
  constructor(private http: HttpClient){}
}
