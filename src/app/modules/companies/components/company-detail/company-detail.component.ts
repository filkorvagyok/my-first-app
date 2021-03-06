import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Company }        from '../../../../companies/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BaseDetailComponent } from '../../../../shared/services/base/base-detail.component';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class CompanyDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    protected location: Location,
    private router: Router,
    protected dialog: MatDialog
  ) {
    super(location, dialog)
  }

  ngOnInit(): void {
    this.companiesDataHandler.isLoadingData = true;
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
    this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), true));
  }

  gotoEdit(): void{
    this.router.navigate(['/company/edit', this.companiesDataHandler.company.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(company: Company): void {
      this.sharedDeleteDataHandler.deleteCompanyFromProject(company);
      this.sharedDeleteDataHandler.deleteCompanyFromContact(company);
      this.companiesApiService.delete(company).subscribe();
      this.router.navigate(['company/list']);
  }

  /*Átadjuk a céget az új projekt létrehozásához, így
    automatikusan belekerül a projekt company mezőjébe.*/
    createNewProject(): void{
      let companiesArray: number[] = [];
      companiesArray.push(this.companiesDataHandler.company.id);
      this.gotoNewProject(companiesArray);
    }

    gotoNewProject(array: number[]): void{
      this.router.navigate(['/project/new/', {array:array, num:0, rank:-1}]);
    }

    //Lásd.: createNewProject, csak itt projekt helyett névjegyre alkalmazzuk
    createNewContact(): void {
      let companiesArray: number[] = [];
      companiesArray.push(this.companiesDataHandler.company.id);
      this.gotoNewContact(companiesArray);
    }

    gotoNewContact(array: number[]): void{
      this.router.navigate(['/people/new/', {array:array, num:0, rank:-1}]);
    }
}