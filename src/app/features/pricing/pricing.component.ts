
import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { PlansService, Plan } from '../../core/services/plans.service';
import { PlanCardComponent } from './plan-card.component';

@Component({
  standalone: true,
  selector: 'app-pricing',
  imports: [NgFor, AsyncPipe, PlanCardComponent],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Memberships & Pricing</h2>
    <div class="grid">
      <app-plan-card *ngFor="let p of plans$ | async"
        [id]="p.id" [name]="p.name" [priceMonthly]="p.priceMonthly"
        [features]="p.features" [popular]="p.popular"
        (select)="onSelect($event)"></app-plan-card>
    </div>
  </section>
  `,
  styles:[`.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:1rem}`]
})
export class PricingComponent{
  private svc = inject(PlansService);
  plans$ = this.svc.all();
  onSelect(id:string){ localStorage.setItem('selectedPlan', id); alert('Selected: ' + id + ' (mock)'); }
}
