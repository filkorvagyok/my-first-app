import { Injectable } from '@angular/core';
import { Company } from './company';
import { Project } from './project';
import { CompaniesService } from './companies/companies.service';
import { ProjectsService } from './projects/projects.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()

export class SharedService{

	constructor(
		private companiesService: CompaniesService,
		private projectsService: ProjectsService
		){}

	private projects: Project[];
	private companies: Company[];

	getProjects(): void{
		this.projectsService.getProjects()
			.subscribe(projects => this.projects = projects);
	}

	getCompanies(): void{
		this.companiesService.getCompanies()
			.subscribe(companies => this.companies = companies);
	}

	getProjectsForCompanyDetail(company: Company): Observable<Project[]>{
		const getProjects: Array<Observable<Project>> = [];
        company.project
        	.forEach(company_project => {
        	this.projects
        		.filter(project => project.id == company_project)
        		.forEach(project => getProjects.push(this.projectsService.getProject(project)))
        	});
        return Observable.forkJoin(getProjects);
	}

	getCompaniesForProjectDetail(project: Project): Observable<Company[]>{
		const getCompanies: Array<Observable<Company>> = [];
        project.company
        	.forEach(project_company => {
        	this.companies
        		.filter(company => company.id == project_company)
        		.forEach(company => getCompanies.push(this.companiesService.getCompany(company)))
        	});
        return Observable.forkJoin(getCompanies);
	}

	deleteProjectFromCompany(project: Project): Observable<Company[]>{
		const deletingProjects: Array<Observable<Company>> = [];
				this.companies
					.filter(company => company.project.includes(project.id))
					.forEach(company => deletingProjects.push(this.deletePFC(project, company)))
		return Observable.forkJoin(deletingProjects);
	}

	deletePFC(project: Project, company: Company): Observable<Company>{
		let index = company.project.indexOf(project.id);
		company.project.splice(index,1);
		return this.companiesService.updateCompany(company);
	}

	deleteCompanyFromProject(company: Company): Observable<Project[]>{
		const deletingCompanies: Array<Observable<Project>> = [];
				this.projects
					.filter(project => project.company.includes(company.id))
					.forEach(project => deletingCompanies.push(this.deleteCFP(company, project)))
		return Observable.forkJoin(deletingCompanies);
	}

	deleteCFP(company: Company, project: Project): Observable<Project>{
		let index = project.company.indexOf(company.id);
		project.company.splice(index,1);
		return this.projectsService.updateProject(project);
	}
}