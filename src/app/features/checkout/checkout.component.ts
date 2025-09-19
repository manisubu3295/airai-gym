
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Coupon { code:string; type:'percent'|'flat'; value:number; validUntil:string; }

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [FormsModule],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Mock Checkout</h2>
    <div class="card">
      <div class="row">
        <label>Selected Plan</label>
        <input [value]="planId()" readonly>
      </div>
      <div class="row">
        <label>Price (monthly INR)</label>
        <input type="number" [(ngModel)]="price">
      </div>

      <div class="row">
        <label>Coupon Code</label>
        <input [(ngModel)]="couponCode">
        <button class="btn" (click)="apply()">Apply</button>
        <span class="msg">{{ couponMsg }}</span>
      </div>

      <div class="total">
        <div>Subtotal: ₹ {{ price }}</div>
        <div *ngIf="discount()>0">Discount: -₹ {{ discount() }}</div>
        <div class="grand">Grand Total: ₹ {{ grand() }}</div>
      </div>

      <button class="btn btn--primary" (click)="printInvoice()">Download Invoice (Print)</button>
    </div>

    <div id="invoice" class="invoice" aria-hidden="true">
      <h3>Invoice — IronPulse Fitness</h3>
      <p>Plan: {{ planId() }}</p>
      <p>Amount: ₹ {{ grand() }}</p>
      <p>Ref Code: {{ refCode }}</p>
      <small>This is a mock invoice for demo purposes.</small>
    </div>
  </section>
  `,
  styles: [`
    .card{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;max-width:520px}
    .row{display:grid;grid-template-columns:140px 1fr auto;align-items:center;gap:.5rem;margin:.5rem 0}
    label{color:#94a3b8}
    input{background:#001b2e;color:#e8f3f9;border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:.5rem}
    .btn{background:#00D4D8;color:#001b2e;border:none;border-radius:10px;padding:.6rem 1rem;font-weight:700;margin-left:.5rem}
    .btn--primary{background:#00D4D8}
    .msg{margin-left:.5rem;color:#94a3b8}
    .total{border-top:1px solid rgba(255,255,255,.2);margin-top:.75rem;padding-top:.75rem}
    .grand{font-weight:800;margin-top:.25rem}
    .invoice{position:fixed;left:-9999px;top:-9999px;background:#fff;color:#000;padding:20px}
  `]
})
export class CheckoutComponent{
  coupons: Coupon[] = [];
  couponCode = '';
  couponMsg = '';
  price = 1499;
  refCode = localStorage.getItem('refCode') || 'N/A';
  planId = signal<string>(localStorage.getItem('selectedPlan') || 'pro');

  discount = signal<number>(0);
  grand = computed(() => Math.max(0, this.price - this.discount()));

  constructor(private http: HttpClient){
    this.http.get<Coupon[]>('/assets/data/coupons.json').subscribe(list => this.coupons = list);
  }

  apply(){
    const c = this.coupons.find(x => x.code.toUpperCase() === (this.couponCode||'').toUpperCase());
    if(!c){ this.couponMsg = 'Invalid coupon'; this.discount.set(0); return; }
    const now = new Date();
    if(new Date(c.validUntil) < now){ this.couponMsg = 'Coupon expired'; this.discount.set(0); return; }
    if(c.type === 'percent') this.discount.set(Math.round(this.price * (c.value/100)));
    else this.discount.set(c.value);
    this.couponMsg = 'Applied ✓';
  }

  printInvoice(){
    window.print();
  }
}
