
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [NgOptimizedImage, RouterLink],
  template: `
  <section class="hero container">
    <div class="hero__content">
      <h1>Transform Your Fitness Journey</h1>
      <p>Premium coaching, dynamic classes, and tailored nutrition — all under one roof.</p>
      <div class="hero__cta">
        <a class="btn btn--primary" routerLink="/pricing">Join Now</a>
        <a class="btn btn--ghost" routerLink="/schedule">Book Free Trial</a>
      </div>
    </div>
    <img ngSrc="/assets/images/hero.jpg" width="1000" height="640" alt="Gym Hero" class="hero__img" priority>
  </section>
  `,
  styles: [`
    .hero{display:grid;gap:2rem;align-items:center;padding:clamp(24px,5vw,64px);grid-template-columns:1.1fr 0.9fr;
      background: radial-gradient(1200px 600px at 0% 0%, rgba(0,212,216,.15), transparent 60%);}
    .hero__content h1{color:#fff;font-size:clamp(28px,4vw,48px);line-height:1.1;margin:0 0 .5rem}
    .hero__content p{color:#dbeafe;max-width:52ch}
    .btn{display:inline-block;padding:.8rem 1.2rem;border-radius:10px;font-weight:600}
    .btn--primary{background:#00D4D8;color:#001b2e}
    .btn--ghost{border:1px solid #00D4D8;color:#e8f3f9;margin-left:.75rem}
    .hero__img{width:100%;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.35)}
    @media(max-width:900px){.hero{grid-template-columns:1fr}}
  `]
})
export class HeroSectionComponent {}
