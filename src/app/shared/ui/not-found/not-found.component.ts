
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="container" style="padding:80px 0;text-align:center">
      <h1>404 — Page Not Found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <a routerLink="/" class="btn">Back to Home</a>
    </section>
  `,
  styles: [`.btn{background:#00D4D8;color:#001b2e;padding:.6rem 1rem;border-radius:10px;font-weight:700}`]
})
export class NotFoundComponent {}
