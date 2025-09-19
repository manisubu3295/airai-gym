
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <header class="header container">
    <div class="brand">IronPulse <span>Fitness</span></div>
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/pricing">Pricing</a>
      <a routerLink="/schedule">Schedule</a>
      <a routerLink="/trainers">Trainers</a>
      <a routerLink="/contact">Contact</a>
    </nav>
    <a class="cta" routerLink="/pricing">Join Now</a>
  </header>

  <router-outlet></router-outlet>

  <footer class="footer container">
    <p>© {{year}} IronPulse Fitness — All rights reserved.</p>
  </footer>
  `,
  styles: [`
    .container{max-width:1200px;margin:0 auto;padding:0 16px}
    header.header{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
    .brand{font-weight:800;color:#e8f3f9} .brand span{color:#00D4D8}
    nav{display:flex;gap:1rem} nav a{color:#cbd5e1}
    .cta{background:#00D4D8;color:#001b2e;padding:.6rem 1rem;border-radius:10px;font-weight:700}
    footer.footer{padding:40px 0;color:#94a3b8}
  `]
})
export class AppComponent{
  year = new Date().getFullYear();
}
