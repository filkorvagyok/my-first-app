import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../../../shared/services/base/base.component'

@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class CompaniesComponent extends BaseComponent implements OnInit{

	constructor(
		private companiesApiService: CompaniesApiService,
		private companiesDataHandler: CompaniesDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
	){
		super(dialog);
	}

	ngOnInit(): void{
		this.companiesDataHandler.isLoading = true;
		this.sharedGetDataHandler.getProjects();
    	this.sharedGetDataHandler.getContacts();
		this.companiesDataHandler.getCompanies();
	}

	/*Tölés esetén a céggel összekapcsolt projekt(ek) és névjegy(ek) közül is ki kell törölnünk az adott céget,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(company: Company): void {
		this.companiesDataHandler.companies = this.companiesDataHandler.companies.filter(h => h !== company);
		this.sharedDeleteDataHandler.deleteCompanyFromProject(company);
		this.sharedDeleteDataHandler.deleteCompanyFromContact(company);
    	this.companiesApiService.delete(company).subscribe();
	}

  	gotoDetail(company: Company): void{
  		this.router.navigate(['/company/shown', company.id]);
  	}

  	gotoEdit(): void{
  		let selectedCompany = this.companiesDataHandler.companies.filter(company => company.selected === true)[0];
  		this.router.navigate(['/company/edit', selectedCompany.id]);
  	}

  	gotoNew(): void{
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

}

