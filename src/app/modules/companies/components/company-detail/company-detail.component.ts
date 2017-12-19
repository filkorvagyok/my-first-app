import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Company }        from '../../../../shared/classes/company';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit {

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.companiesDataHandler.isLoadingData = true;
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
    this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), true));
  }

  goBack(): void {
    this.location.back();
  }

  gotoEdit(): void{
    this.router.navigate(['/company/edit', this.companiesDataHandler.company.id]);
  }

  /*Megjelenik a DeleteDialog és ha ott megerősítettük a törlést,
  akkor meghívjuk a törlés funkció*/
  clickOnDeleteProductButton(): void{
    let dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
          if(result === true)
          {
            this.delete(this.companiesDataHandler.company);
          }
      });
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
}