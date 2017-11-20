import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Project } from './project';
import { Company } from './company';
import { CompaniesService } from './companies.service';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent{
	@Input() project: Project;
	@Input() selectedCompany: Company;
	edit = false;

	constructor(
		private companiesService: CompaniesService,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		let path = this.route.snapshot.routeConfig.path;
		console.log(this.route.snapshot.paramMap);
		let arr= this.route.snapshot.paramMap.keys;
		this.project = new Project;
		this.project.company = [];
		if(path == "project/new")
		{ 
			for (var i = 0; i < arr.length; i++) {
				this.project.company.push(Number(this.route.snapshot.paramMap.get(arr[i])));
			}
		}
		else if(path == "project/new/:id")
		{
			this.route.paramMap
		    .switchMap((params: ParamMap) => this.companiesService.getCompany(+params.get('id')))
		    .subscribe(selectedCompany => {this.selectedCompany = selectedCompany, this.addIdToProject(selectedCompany)});
		}
		else
		{
			this.edit = true;
			this.route.paramMap
		    	.switchMap((params: ParamMap) => this.companiesService.getProject(+params.get('id')))
		    	.subscribe(project => this.project = project);
		}
	}

	addIdToProject(company: Company): void{
		console.log(company.id);
		this.project.company[0] = company.id;
	}

}
