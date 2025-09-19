
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-referral',
  imports: [FormsModule],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Referral Program</h2>
    <p>Invite a friend and both of you get rewarded when they join a plan!</p>
    <div class="card">
      <label>Your Name</label>
      <input [(ngModel)]="name">
      <button class="btn" (click)="generate()">Generate My Code</button>
      <div *ngIf="code()" class="code">Your Code: <strong>{{ code() }}</strong></div>
      <a *ngIf="code()" class="btn btn--ghost" [href]="waLink()" target="_blank" rel="noopener">
        Share via WhatsApp
      </a>
    </div>
  </section>
  `,
  styles: [`
    .card{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:1rem;max-width:520px}
    label{display:block;margin:.2rem 0 .2rem 0;color:#94a3b8}
    input{width:100%;background:#001b2e;color:#e8f3f9;border:1px solid rgba(255,255,255,.2);border-radius:10px;padding:.6rem;margin-bottom:.6rem}
    .btn{background:#00D4D8;color:#001b2e;border:none;border-radius:10px;padding:.6rem 1rem;font-weight:700;margin-right:.5rem}
    .btn--ghost{border:1px solid #00D4D8;color:#e8f3f9;background:transparent}
    .code{margin-top:.75rem}
  `]
})
export class ReferralComponent{
  name = '';
  code = signal<string>('');
  generate(){
    const seed = (this.name || 'USER').trim().toUpperCase().replace(/\s+/g,'-');
    const stamp = Math.floor(Date.now()/1000).toString(36).toUpperCase();
    const code = (seed.slice(0,6)+'-'+stamp.slice(-5)).replace(/[^A-Z0-9-]/g,'');
    this.code.set(code);
    localStorage.setItem('refCode', code);
  }
  waLink(){
    const msg = `Join me at IronPulse Fitness! Use my referral code: ${this.code()} (get rewards on signup).`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }
}
