import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Project }        from '../classes/project';
import { Company }        from '../classes/company';
import { ProjectsService } from './projects.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../styles/detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{
	@Input() project: Project;
	companies: Company[] = [];
	isLoading: boolean = true;

	constructor(
		private projectsService: ProjectsService,
		private sharedService: SharedService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}

	ngOnInit(): void {
		this.getProject();
		this.sharedService.getCompanies();
	}

	getProject(): void{
		this.route.paramMap
			.switchMap((params: ParamMap) => this.projectsService.getProject(+params.get('id')))
			.subscribe(project => {
				this.project = project
				if(project.company.length > 0)
		        {
		          this.getCompanies(project)
		        }
		        else
		          this.isLoading = false;
			});
	}

	getCompanies(project: Project): void{
    this.sharedService
      .getCompaniesForProjectDetail(this.project)
      .subscribe(companies => {this.companies = companies, this.isLoading = false});
  }

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
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