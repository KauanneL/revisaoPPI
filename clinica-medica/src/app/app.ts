import { Component } from '@angular/core';
import { ClinicaComponent } from './clinica/clinica';

@Component({
  selector: 'app-root',
  imports: [ClinicaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
}