import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../shared/classes/project';
import { ProjectsDataHandler } from '../../projects-datahandler.service';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent implements OnInit{
	edit = false; //Ezen mező alapján tudja a project-edit.component, hogy szerkeszteni kell vagy új projektet létrehozni

	constructor(
		private projectsDataHandler: ProjectsDataHandler,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "project/new")
		{ 
			//Ha az url "project/new"-val egyenlő, akkor teljesül
			this.setNewContact();
		}
		/*TODO: mivel így nem csak "project/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEditContact();
		}
	}

	//Létrehozunk egy üres project példányt és alaphelyzetbe állítjuk
	setNewContact(): void{
		let arr = this.route.snapshot.paramMap.keys;
		this.projectsDataHandler.project = new Project;
		this.projectsDataHandler.project = this.projectsDataHandler.setDefaultProject(this.projectsDataHandler.project);
		arr.forEach(array => this.projectsDataHandler.project.company.push(Number(this.route.snapshot.paramMap.get(array))));
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő projekt adatokat.
	setEditContact(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id')), false));
	}
}
