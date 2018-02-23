import { CompanyService } from './../company.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../shared/services/shared-deletedatahandler.service';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../shared/services/base/base.component'
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-company-list',
	templateUrl: './company-list.component.html',
	styleUrls: ['./company-list.component.css']
})

export class CompanyListComponent extends BaseComponent implements OnInit, OnDestroy{
	subscription: Subscription;

	constructor(
		private companyService: CompanyService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
	){
		super(dialog);
		this.subscription = this.companyService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
  }

	ngOnInit(): void{
		/* this.companiesDataHandler.isLoading = true;
		this.sharedGetDataHandler.getProjects();
    	this.sharedGetDataHandler.getContacts();
		this.companiesDataHandler.getCompanies(); */
	}

	/*Tölés esetén a céggel összekapcsolt projekt(ek) és névjegy(ek) közül is ki kell törölnünk az adott céget,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(company: Company | number): void {
		const id = typeof company === 'number' ? company : company.id;
		/* console.log(id);
		this.companiesDataHandler.companies = this.companiesDataHandler.companies.filter(h => h.id !== id);
		this.sharedDeleteDataHandler.deleteCompanyFromProject(id);
		this.sharedDeleteDataHandler.deleteCompanyFromContact(id);
		this.companiesApiService.delete(id).subscribe(); */
		this.companyService.delete(id);
	}

  	navigateToEdit(): void{
  		this.router.navigate(['/company/edit', this.checkedArray[0]]);
  	}

  	navigateToNewItem(): void{
  		this.router.navigate(["/company/new"]);
  	}

  	navigateToNewProject(): void{
  		this.router.navigate(['/project/new/', {array: this.checkedArray, num: 0, rank: -1}]);
  	}

  	navigateToNewContact(): void{
  		this.router.navigate(['/people/new/', {array: this.checkedArray, num: 0, rank: -1}]);
  	}

  	/*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	//TODO: megvalósítani a focust!
  	addInstant(name: string): void{
		let company = new Company();
		company.name = name.trim();  
		if (!name) { return; }
    	this.companyService.add(company);
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}

