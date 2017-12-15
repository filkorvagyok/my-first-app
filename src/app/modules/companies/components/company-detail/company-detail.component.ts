import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Company }        from '../../../../shared/classes/company';
import { Project }        from '../../../../shared/classes/project';
import { Contact }        from '../../../../shared/classes/contact';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit {

  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedService: SharedService,
    private sharedGetDataHandler: SharedGetDataHandler,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companiesDataHandler.isLoadingData = true;
    this.sharedGetDataHandler.getProjects();
    this.sharedGetDataHandler.getContacts();
    this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id')), true));
    /*this.sharedService.getProjects();
    this.sharedService.getContacts();*/
  }

  goBack(): void {
    this.location.back();
  }

  gotoEdit(): void{
    this.router.navigate(['/company/edit', this.companiesDataHandler.company.id]);
  }

  openDeleteDialog(): void{
    let dialogRef = this.sharedService.openDeleteDialog();
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
          if(dialogRef.componentInstance.delete)
          {
            this.delete(this.companiesDataHandler.company);
          }
      });
  }

  delete(company: Company): void {
      this.sharedService.deleteCompanyFromProject(company).subscribe();
      this.sharedService.deleteCompanyFromContact(company).subscribe();
      this.companiesApiService.delete(company).subscribe();
      this.router.navigate(['company/list']);
  }
}