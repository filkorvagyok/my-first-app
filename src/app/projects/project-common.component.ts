import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Project } from '../classes/project';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent implements OnInit{
	@Input() project: Project;
	edit = false;

	constructor(
		private projectsService: ProjectsService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		let path = this.route.snapshot.routeConfig.path;
		let arr = this.route.snapshot.paramMap.keys;
		this.project = new Project;
		if(path == "project/new")
		{ 
			this.project = this.projectsService.setDefaultProject(this.project);
			for (var i = 0; i < arr.length; i++) {
				this.project.company.push(Number(this.route.snapshot.paramMap.get(arr[i])));
			}
		}
		else
		{
			this.edit = true;
			this.route.paramMap
		    	.switchMap((params: ParamMap) => this.projectsService.getProject(+params.get('id')))
		    	.subscribe(project => this.project = project);
		}
	}
}
