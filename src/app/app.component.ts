import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './companies/companies.service';
import { ProjectsService } from './projects/projects.service';
import { Company } from './company';
import { Project } from './project';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProjectsService, CompaniesService]
})
export class AppComponent implements OnInit{
	constructor(
		private projectsService: ProjectsService,
		private companiesService: CompaniesService
	){}

	private companies: Company[];
	private projects: Project[];

	ngOnInit(): void{
		this.getCompanies();
		this.getProjects();
	}

	getCompanies(): void{
		this.companiesService
        .getCompanies()
        .subscribe(companies => this.companies = companies);
	}

	getProjects(): void{
		this.projectsService
        .getProjects()
        .subscribe(projects => this.projects = projects);
	}
}
