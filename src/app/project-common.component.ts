import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Project } from './project';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent{
	@Input() project: Project;
	edit = true;

	constructor(
		private companiesService: CompaniesService,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "project/new")
		{
		  this.project = new Project;
		  this.edit = false;
		}
		else
		{
		  this.route.paramMap
		    .switchMap((params: ParamMap) => this.companiesService.getProject(+params.get('id')))
		    .subscribe(project => this.project = project);
		}
	}

}
