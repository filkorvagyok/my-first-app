import { Component, OnInit } from '@angular/core';
import { ComapniesService } from './companies.service';

@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(private companiesService: ComapniesService){
	}
	companies = [];
	checked: boolean = false;
	


	/*showChbox(){
		this.checked = !this.checked;
	}*/


	ngOnInit(){
		this.companiesService.fetchData().subscribe(resoponseCompanies => this.companies = resoponseCompanies);
	}
}

var show = 0;

	function showChbox() {
		
		$('input[type=checkbox]').each(function() {
			if (this.checked) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
		} else {
			this.checked = false;
		}
	}