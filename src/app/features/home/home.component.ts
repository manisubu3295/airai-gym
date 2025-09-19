
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, HeroSectionComponent],
  template: `
    <app-hero-section></app-hero-section>

    <section class="container usps">
      <article><h3>Certified Trainers</h3><p>Expert guidance for every level.</p></article>
      <article><h3>Open 7 Days</h3><p>Flexible timings for busy schedules.</p></article>
      <article><h3>Personal Diet Plans</h3><p>Fuel your progress the smart way.</p></article>
    </section>
  `,
  styles:[`
    .usps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;padding:40px 0}
    .usps article{background:#0c1a3a;color:#e8f3f9;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,.08)}
    .usps h3{margin:.2rem 0 .4rem 0;color:#00D4D8}
  `]
})
export class HomeComponent {}
