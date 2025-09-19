
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-plan-card',
  imports: [CommonModule, CurrencyPipe, NgFor],
  template: `
  <article class="plan" [class.plan--popular]="popular">
    <header class="plan__head">
      <h3>{{ name }}</h3>
      <span class="badge" *ngIf="popular">Most Popular</span>
    </header>
    <div class="plan__price">
      <span>{{ priceMonthly | currency:'INR':'symbol':'1.0-0' }}/mo</span>
    </div>
    <ul class="plan__features">
      <li *ngFor="let f of features">• {{ f }}</li>
    </ul>
    <button class="btn btn--primary" (click)="select.emit(id)">Select Plan</button>
  </article>
  `,
  styles: [`
    .plan{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1.25rem;
      box-shadow:0 10px 30px rgba(0,0,0,.25)}
    .plan--popular{outline:2px solid #00D4D8}
    .plan__head{display:flex;align-items:center;gap:.5rem}
    .badge{background:#00D4D8;color:#001b2e;border-radius:999px;padding:.2rem .6rem;font-weight:700;font-size:.8rem}
    .plan__price{font-size:1.4rem;margin:.6rem 0 1rem}
    .plan__features{list-style:none;padding:0;margin:0 0 1rem 0;color:#dbeafe}
    .btn--primary{background:#00D4D8;color:#001b2e;border:none;border-radius:10px;padding:.7rem 1rem;font-weight:700}
  `]
})
export class PlanCardComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() priceMonthly!: number;
  @Input() features: string[] = [];
  @Input() popular = false;
  @Output() select = new EventEmitter<string>();
}
