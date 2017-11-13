import { Component } from '@angular/core';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CompaniesService]
})
export class AppComponent{
	title = 'app';
}
