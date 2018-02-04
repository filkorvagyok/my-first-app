import { CompanyService } from './../company.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../shared/classes/company';
import { CompaniesApiService } from '../companies-api.service';
import { CompaniesDataHandler } from '../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../shared/services/shared-deletedatahandler.service';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../../shared/services/base/base.component'
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
		private companiesApiService: CompaniesApiService,
		private companiesDataHandler: CompaniesDataHandler,
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

  	gotoDetail(company: Company): void{
  		this.router.navigate(['/company/shown', company.id]);
  	}

  	gotoEdit(): void{
  		let selectedCompany = this.companiesDataHandler.companies.filter(company => company.selected === true)[0];
  		this.router.navigate(['/company/edit', selectedCompany.id]);
  	}

  	createNewItem(): void{
  		this.router.navigate(["/company/new"]);
  	}

  	/*Átadjuk a kiválasztott cégeket az új projekt létrehozásához, így
  	automatikusan belekerülnek a projekt company mezőjébe.*/
  	createNewProject(): void{
  		let companiesArray: number[] = [];
  		this.companiesDataHandler.companies.forEach( company =>{
  			if(company.selected)
  			{
  				companiesArray.push(company.id);
  			}
  		});
  		this.gotoNewProject(companiesArray);
  	}

  	gotoNewProject(array: number[]): void{
  		this.router.navigate(['/project/new/', {array:array, num:0, rank:-1}]);
  	}

  	//Lásd.: createNewProject, csak itt projekt helyett névjegyre alkalmazzuk
  	createNewContact(): void {
  		let companiesArray: number[] = [];
  		this.companiesDataHandler.companies.forEach( company =>{
  			if(company.selected)
  			{
  				companiesArray.push(company.id);
  			}
  		});
  		this.gotoNewContact(companiesArray);
  	}

  	gotoNewContact(array: number[]): void{
  		this.router.navigate(['/people/new/', {array:array, num:0, rank:-1}]);
  	}

  	/*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	//TODO: megvalósítani a focust!
  	addInstant(name: string): void{
		let company = new Company();
		company = this.companiesDataHandler.setDefaultCompany(company);
  		company.name = name.trim();
    	if (!name) { return; }
    	this.companiesDataHandler.addCompany(company);
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}

