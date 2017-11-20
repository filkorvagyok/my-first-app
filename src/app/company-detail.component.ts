import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Company }        from './company';
import { Project }        from './project';
import { CompaniesService } from './companies.service';
import { DeleteDialog } from './delete-dialog';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ './company-detail.component.css' ]
})
export class CompanyDetailComponent implements OnInit {
  @Input() company: Company;
  projects: Project[] = [];


  constructor(
    private companiesService: CompaniesService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCompany();
    this.getProjects();
  }

  getCompany(): void{
    this.route.paramMap
      .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
      .subscribe(company => this.company = company);
  }

  getProjects(): void{
    this.companiesService
        .getProjects()
        .subscribe(projects => {
          for(var i = 0; i < this.company.project.length; i++)
            this.projects.push(projects.find(x=>x.id == this.company.project[i]));
        });
  }

  goBack(): void {
    this.location.back();
  }

  gotoEdit(): void{
    this.router.navigate(['/company/edit', this.company.id]);
  }

  openDeleteDialog(): void{
    let dialogRef = this.dialog.open(DeleteDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
          if(dialogRef.componentInstance.delete)
          {
            this.delete(this.company);
          }
      });
  }

  delete(company: Company): void {
      this.companiesService.deleteCompany(company).subscribe();
      this.location.back();
  }
}