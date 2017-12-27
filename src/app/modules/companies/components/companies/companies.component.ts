import { Component, OnInit, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
	selector: 'my-companies',
	templateUrl: './companies.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class CompaniesComponent implements OnInit{
	constructor(
		private companiesApiService: CompaniesApiService,
		private companiesDataHandler: CompaniesDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		private dialog: MatDialog
	){}

	checked: boolean = false;
	disabled: boolean = true;

	ngOnInit(): void{
		this.companiesDataHandler.isLoading = true;
		this.sharedGetDataHandler.getProjects();
    	this.sharedGetDataHandler.getContacts();
		this.companiesDataHandler.getCompanies();
	}

	/*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	/*A kiválasztott lsitaelemeg selected mezője automatikusan
	true-ra változik. Ez alapján a törléshez kiválogatjuk azon
	listaelemeket, melyek select-je true és ha a megjelenő DeleDialog-on
	megerősítjük a törlést, akkor meghívjuk az adott cégekre a törlés
	metódust egyenként.*/
	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result===true)
			{
				let array=this.companiesDataHandler.companies;
				for (var i = 0; i < array.length; i++) {
					if(array[i].selected)
					{
						this.delete(array[i]);
					}
				}
				this.checked = false;
			}
		});
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
  		this.router.navigate(['/project/new/', array]);
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
  		this.router.navigate(['/people/new/', array]);
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

