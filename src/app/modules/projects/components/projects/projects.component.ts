import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { Router } from '@angular/router';
import { Project } from '../../../../shared/classes/project';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../../../shared/services/base/base.component'

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class ProjectsComponent extends BaseComponent implements OnInit{
	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
	){
		super(dialog);
	}

	days: number;
	valami: Date;
	changedate: boolean = false;
	asd = new Date();

	ngOnInit(): void{
		this.projectsDataHandler.isLoading = true;
		this.sharedGetDataHandler.getCompanies();
    	this.sharedGetDataHandler.getContacts();
    	this.sharedGetDataHandler.getProjects();
		this.projectsDataHandler.getProjects();
		
	}

	gotoDetail(project: Project): void{
  		this.router.navigate(['/project/shown', project.id]);
  	}

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

	//Kiszámoljuk, hogy a határidő és a mai nap között hány nap különbség van.
	count(project: Project): number{
		let num: number;
		project.deadline.setHours(0,0,0,0);
		let newDate = new Date();
		newDate.setHours(0,0,0,0);
		return Math.round((project.deadline.getTime() - newDate.getTime())/86400000);
	}

	/*Tölés esetén a projekttel összekapcsolt cég(ek) és névjegy(ek) közül is ki kell törölnünk az adott projektet,
	tehát ezzel kezdünk és csak ezután hívjuk meg a projectsApiService delete metódusát*/
	delete(project: Project): void{
		this.projectsDataHandler.projects = this.projectsDataHandler.projects.filter(h => h !== project);
		this.sharedDeleteDataHandler.deleteProjectFromCompany(project);
		this.sharedDeleteDataHandler.deleteProjectFromContact(project);
		this.projectsApiService.delete(project).subscribe();
	}


	gotoEdit(): void{
  		let selectedProject = this.projectsDataHandler.projects.filter(project => project.selected === true)[0];
  		this.router.navigate(['/project/edit', selectedProject.id]);
  	}

  	/*A lista nézetben egy név mező kötelető kitöltésével tudunk létrehozni
  	új projektet. A projekt további mezőit alaphelyzetbe állítjuk.*/
  	//TODO: megvalósítani a focust!
  	addInstant(name: string): void{
  		let project = new Project();
  		this.projectsDataHandler.setDefaultProject(project);
  		project.deadline = new Date(project.deadline);
  		project.name = name.trim();
    	if (!name) { return; }
    	this.projectsDataHandler.addProject(project);
  	}

  	changeProject(project: Project)
  	{
  		this.projectsApiService.update(project).subscribe();
  	}

  	//Átírjuk a határidőt a kapott napok számával növelt mai dátumra.
  	changeDate(project: Project, days:number)
  	{
  		project.deadline = new Date(new Date().getTime() + days * (1000 * 60 * 60 * 24));
  		this.changeProject(project);
  	}

  	//Dátumválasztó beállítása
  	datepickerOpts = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true,
	    assumeNearbyYear: true,
	    format: 'yyyy. MM d.',
  		showMeridian : false,
  		maxHours: 24,
  		language: 'hu'
	}

	/*Átadjuk a kiválasztott projekteket az új cég létrehozásához, és
	miután létrehoztuk a céget, a kiválogatott projektek company mezőjébe
	bele is helyezzük őket.*/
  	createNewCompany(): void{
  		let projectsArray: number[] = [];
  		this.projectsDataHandler.projects.forEach( project =>{
  			if(project.selected)
  			{
  				projectsArray.push(project.id);
  			}
  		});
  		this.gotoNewCompany(projectsArray);
  	}

  	gotoNewCompany(array: number[]): void{
  		this.router.navigate(['/company/new/', {array:array, num:1}]);
  	}

  	/*Átadjuk a kiválasztott projekteket az új cég létrehozásához, és
	miután létrehoztuk a céget, a kiválogatott projektek company mezőjébe
	bele is helyezzük őket.*/
  	createNewContact(rank: number): void{
  		let projectsArray: number[] = [];
  		this.projectsDataHandler.projects.forEach( project =>{
  			if(project.selected)
  			{
  				projectsArray.push(project.id);
  			}
  		});
  		this.gotoNewContact(projectsArray, rank);
  	}

  	gotoNewContact(array: number[], rank: number): void{
  		this.router.navigate(['/people/new/', {array:array, num:1, rank:rank}]);
  	}
}