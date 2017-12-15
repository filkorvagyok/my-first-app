import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../../../shared/classes/project';
import { ProjectsDataHandler } from '../../projects-datahandler.service';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent implements OnInit{
	edit = false;

	constructor(
		private projectsDataHandler: ProjectsDataHandler,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "project/new")
		{ 
			this.setNewContact();
		}
		else
		{
			this.setEditContact();
		}
	}

	setNewContact(): void{
		let arr = this.route.snapshot.paramMap.keys;
		this.projectsDataHandler.project = new Project;
		this.projectsDataHandler.project = this.projectsDataHandler.setDefaultProject(this.projectsDataHandler.project);
		arr.forEach(array => this.projectsDataHandler.project.company.push(Number(this.route.snapshot.paramMap.get(array))));
	}

	setEditContact(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id')), false));
	}
}
