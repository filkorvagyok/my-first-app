import { Injectable } from '@angular/core';
import { Project } from '../../shared/classes/project';
import { ProjectsApiService } from './projects-api.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service'

@Injectable()
export class ProjectsDataHandler{

	constructor(
		private projectsApiService: ProjectsApiService,
		private sharedGetDataHandler: SharedGetDataHandler
		){}
  projects: Project[];
  project: Project;
  isLoading: boolean = true;
  isLoadingData: boolean = true;

  getProjects(): void{
    this.projectsApiService.getProjects()
      .subscribe(projects => {this.projects = projects; this.isLoading = false;});
  }

  getProject(project: Project | number, detail: boolean): void{
    this.projectsApiService.getProject(project)
      .subscribe(project => {
      	this.project = project;
      	if(detail)
      	{
      		if(project.company.length > 0)
      		{
      			this.sharedGetDataHandler.getCompaniesForProjectDetail(project);
      		}
      		else{
      			this.sharedGetDataHandler.companies = [];
      			this.sharedGetDataHandler.isLoading += 1;
      		}
      		if(project.accountable.length > 0 || project.owner.length > 0 || project.observer.length > 0 || project.participant.length > 0)
      		{
      			this.sharedGetDataHandler.getContactsForProjectDetail(project);
      		}
      		else{
      			this.sharedGetDataHandler.accountables = [];
      			this.sharedGetDataHandler.owners = [];
      			this.sharedGetDataHandler.observers = [];
      			this.sharedGetDataHandler.participants = [];
      			this.sharedGetDataHandler.isLoading += 1;
      		}
      		this.isLoadingData = this.sharedGetDataHandler.isLoading >= 2 ? false : true;
      	}
      });
  }

	setDefaultProject(project: Project): Project{
		project.accountable = [];
		project.checklist = false;
		project.company = [];
		project.currency = "";
		project.deadline = new Date();
		project.description = "";
		project.expenditure = null;
		project.file = "";
		project.income = null;
		project.name = "";
		project.observer = [];
		project.owner = [];
		project.participant = [];
		project.priority = "";
		project.selected = false;
		project.status = "";
		project.stickers = "";
		return project;
	}

  addProject(project: Project): void{
    this.projectsApiService.addProject(project)
      .subscribe(project => this.projects.push(project));
  }
}