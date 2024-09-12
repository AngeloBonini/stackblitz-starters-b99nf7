import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormComponent } from './app/form/form.component';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent], // Import the standalone ApiComponent
  template: `
    <h1>Welcome to Angular Signals with API Integration!</h1>
    <app-form></app-form> <!-- Use the ApiComponent -->
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideHttpClient()],
});
