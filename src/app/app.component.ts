import { Component } from '@angular/core';
import { MedSectionComponent } from './med-section/med-section.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = 'User';
}
