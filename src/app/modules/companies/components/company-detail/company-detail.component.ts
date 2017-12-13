import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Company }        from '../../../../shared/classes/company';
import { Project }        from '../../../../shared/classes/project';
import { Contact }        from '../../../../shared/classes/contact';
import { CompaniesApiService } from '../../companies-api.service';
import { CompaniesDataHandler } from '../../companies-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit {
  projects: Project[] = [];
  contacts: Contact[] = [];
  isLoadingProjects: boolean = true;
  isLoadingContacts: boolean = true;


  constructor(
    private companiesApiService: CompaniesApiService,
    private companiesDataHandler: CompaniesDataHandler,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.companiesDataHandler.getCompany(Number(params.get('id'))));
    this.sharedService.getProjects();
    this.sharedService.getContacts();
  }

  getCompany(): void{
    if(this.companiesDataHandler.company.project.length > 0)
    {
      this.getProjects(this.companiesDataHandler.company);
    }
    if(this.companiesDataHandler.company.contact.length > 0)
    {
      this.getContacts(this.companiesDataHandler.company);
    }
    if(this.companiesDataHandler.company.project.length == 0)
      this.isLoadingProjects = false;
    if(this.companiesDataHandler.company.contact.length == 0)
      this.isLoadingContacts = false;
  }

  getProjects(company: Company): void{
    this.sharedService
      .getProjectsForCompanyDetail(company)
      .subscribe(projects => {this.projects = projects, this.isLoadingProjects = false})
  }

  getContacts(company: Company): void{
    this.sharedService
      .getContactsForCompanyDetail(company)
      .subscribe(contacts => {this.contacts = contacts, this.isLoadingContacts = false});
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