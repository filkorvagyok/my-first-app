import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Project } from '../../../../shared/classes/project';
import { Company } from '../../../../shared/classes/company';
import { Contact } from '../../../../shared/classes/contact';
import { ProjectsApiService } from '../../projects-api.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})

export class ProjectEditComponent implements OnInit {
	constructor(
		private projectsApiService: ProjectsApiService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		private location: Location
	) {}

	@Input() project: Project;
	@Input() edit: boolean;

	ngOnInit(): void{
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getContacts();
	}

	goBack(): void {
		this.location.back();
	}

	save(): void{
		this.addProjectTo(this.project);
		this.projectsApiService.updateProject(this.project)
        	.subscribe(() => this.goBack())
	}

	add(project: Project): void{
		this.projectsApiService.addProject(project)
			.subscribe(() => {
				this.addProjectTo(project);
				this.goBack();
			});
	}

	addProjectTo(project: Project)
	{
		if(project.company.length > 0)
			this.sharedAddDataHandler.addProjectToCompany(project);
		if(project.accountable.length > 0 || project.owner.length > 0 ||
			project.observer.length > 0 || project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(project);
	}
}