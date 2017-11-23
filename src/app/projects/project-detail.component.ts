import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Project }        from '../project';
import { Company }        from '../company';
import { ProjectsService } from './projects.service';
import { CompaniesService } from '../companies/companies.service';
import { DeleteDialog } from '../delete-dialog';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../companies/company-detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{
	@Input() project: Project;
	companies: Company[] = [];
	isLoading: boolean = true;

	constructor(
		private companiesService: CompaniesService,
		private projectsService: ProjectsService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getProject();
		this.getCompanies();
	}

	getProject(): void{
		this.route.paramMap
			.switchMap((params: ParamMap) => this.projectsService.getProject(+params.get('id')))
			.subscribe(project => this.project = project);
	}

	getCompanies(): void{
    this.companiesService
        .getCompanies()
        .subscribe(companies => {
          for(var i = 0; i < this.project.company.length; i++)
            this.companies.push(companies.find(x=>x.id == this.project.company[i]));
        	this.isLoading = false;
        });
  }

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.project);
			}
		});
	}

  delete(project: Project): void {
      this.projectsService.delete(project).subscribe();
      this.location.back();
  }
}