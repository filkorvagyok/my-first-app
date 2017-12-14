import { Injectable } from '@angular/core';
import { Project } from '../../shared/classes/project';
import { ProjectsApiService } from './projects-api.service';

@Injectable()
export class ProjectsDataHandler{

	constructor(private projectsApiService: ProjectsApiService){}
  projects: Project[];
  project: Project;
  isLoading: boolean = true;
  isLoadingForDetail: boolean = true;

  getProjects(): void{
    this.projectsApiService.getProjects()
      .subscribe(projects => {this.projects = projects; this.isLoading = false;});
  }

  getProject(project: Project | number): void{
    this.projectsApiService.getProject(project)
      .subscribe(project => {this.project = project; this.isLoadingForDetail = false;});
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