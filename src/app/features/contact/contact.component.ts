
import { Component } from '@angular/core';
import { ContactFormComponent } from './contact-form.component';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [ContactFormComponent],
  template: `
  <section class="container" style="padding:24px 0">
    <h2 style="color:#e8f3f9">Get In Touch</h2>
    <app-contact-form></app-contact-form>
  </section>
  `
})
export class ContactComponent {}
