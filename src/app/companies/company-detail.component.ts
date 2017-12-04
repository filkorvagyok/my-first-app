import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Company }        from '../classes/company';
import { Project }        from '../classes/project';
import { Contact }        from '../classes/contact';
import { CompaniesService } from './companies.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ '../styles/detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit {
  @Input() company: Company;
  projects: Project[] = [];
  contacts: Contact[] = [];
  isLoading: boolean = true;


  constructor(
    private companiesService: CompaniesService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sharedService.getProjects();
    this.sharedService.getContacts();
    this.getCompany();
  }

  getCompany(): void{
    this.route.paramMap
      .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
      .subscribe(company => {
        this.company = company;
        if(company.project.length > 0)
        {
          this.getProjects(company)
        }
        if(company.contact.length > 0)
        {
          this.getContacts(company);
        }
        if(company.project.length == 0 && company.contact.length == 0)
          this.isLoading = false;
    });
  }

  getProjects(company: Company): void{
    this.sharedService
      .getProjectsForCompanyDetail(company)
      .subscribe(projects => {this.projects = projects, this.isLoading = false});
  }

  getContacts(company: Company): void{
    this.sharedService
      .getContactsForCompanyDetail(company)
      .subscribe(contacts => {this.contacts = contacts, this.isLoading = false});
  }

  goBack(): void {
    this.location.back();
  }

  gotoEdit(): void{
    this.router.navigate(['/company/edit', this.company.id]);
  }

  openDeleteDialog(): void{
    let dialogRef = this.sharedService.openDeleteDialog();
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
          if(dialogRef.componentInstance.delete)
          {
            this.delete(this.company);
          }
      });
  }

  delete(company: Company): void {
      this.sharedService.deleteCompanyFromProject(company);
      this.companiesService.delete(company).subscribe();
      this.router.navigate(['company/list']);
  }
}