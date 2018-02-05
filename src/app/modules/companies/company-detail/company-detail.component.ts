import { CompanyService } from './../company.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Company }        from '../../../shared/classes/company';
import { SharedGetDataHandler } from '../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BaseDetailComponent } from '../../../shared/services/base/base-detail.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../../../shared/styles/detail.component.css' ]
})
export class CompanyDetailComponent extends BaseDetailComponent implements OnInit, AfterViewInit,
AfterViewChecked {
  company: Company;

  constructor(
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    protected location: Location,
    private router: Router,
    protected dialog: MatDialog,
    private companyService: CompanyService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(location, dialog)
  }

  ngOnInit(): void {
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
    if(this.companyService.getItems() && !this.company){
			this.route.params.subscribe(
        (params: Params) => this.company = this.companyService.getItem(+params['id'])
      );
		}
  }

  ngAfterViewInit(){
		this.changeDetector.detectChanges();
	}

	ngAfterViewChecked(){
		if(!this.company){
			this.route.params.subscribe(
        (params: Params) => this.company = this.companyService.getItem(+params['id'])
      );
		}
	}

  navigateToEdit(): void{
    this.router.navigate(['/company/edit', this.company.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(company: Company): void {
      this.sharedDeleteDataHandler.deleteCompanyFromProject(company);
      this.sharedDeleteDataHandler.deleteCompanyFromContact(company);
      this.companyService.delete(company);
      this.router.navigate(['company/list']);
  }

  /*Átadjuk a céget az új projekt létrehozásához, így
  automatikusan belekerül a projekt company mezőjébe.*/
  createNewProject(): void{
    let companiesArray: number[] = [];
    companiesArray.push(this.company.id);
    this.navigateToNewProject(companiesArray);
  }

  navigateToNewProject(array: number[]): void{
    this.router.navigate(['/project/new/', {array:array, num:0, rank:-1}]);
  }

  //Lásd.: createNewProject, csak itt projekt helyett névjegyre alkalmazzuk
  createNewContact(): void {
    let companiesArray: number[] = [];
    companiesArray.push(this.company.id);
    this.navigateToNewContact(companiesArray);
  }

  navigateToNewContact(array: number[]): void{
    this.router.navigate(['/people/new/', {array:array, num:0, rank:-1}]);
  }
}