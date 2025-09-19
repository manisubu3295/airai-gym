
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  template: `
  <form [formGroup]="f" (ngSubmit)="submit()" novalidate class="contact">
    <input placeholder="Full name" formControlName="name">
    <input placeholder="Email" formControlName="email">
    <input placeholder="Phone" formControlName="phone">
    <textarea rows="4" placeholder="Message" formControlName="message"></textarea>
    <button class="btn" [disabled]="f.invalid">Send</button>
  </form>
  `,
  styles: [`
    .contact{display:grid;gap:.75rem;max-width:520px}
    input,textarea{background:#0c1a3a;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:.75rem}
    .btn{justify-self:start;background:#00D4D8;color:#001b2e;border:none;border-radius:10px;padding:.6rem 1rem;font-weight:700}
  `]
})
export class ContactFormComponent {
  f = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  constructor(private fb: FormBuilder) {}
  submit(){
    if(this.f.invalid) return;
    const data = this.f.value;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'lead.json'; a.click();
    URL.revokeObjectURL(url);
    this.f.reset();
    alert('Lead saved as JSON (downloaded).');
  }
}
