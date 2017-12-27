import { Component, OnInit } from '@angular/core';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { Router } from '@angular/router';
import { Project } from '../../../../shared/classes/project';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
	selector: 'my-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class ProjectsComponent implements OnInit{
	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		private dialog: MatDialog
	){}

	checked: boolean = false;
	days: number;
	disabled: boolean = true;
	valami: Date;
	changedate: boolean = false;
	asd = new Date();

	ngOnInit(): void{
		this.projectsDataHandler.isLoading = true;
		this.sharedGetDataHandler.getCompanies();
    	this.sharedGetDataHandler.getContacts();
		this.projectsDataHandler.getProjects();
		
	}


	/*Megvizsgáljuk a checkbox-okat és ha 1 vagy több 'checked'
	állapotban van, akkor megjelenítjük a fabbutton-t, különben nem.*/
	showChbox(): void{
		var show = 0;
		this.disabled = false;
		$('input[type=checkbox]').each(function() {
			if ($(this).is(':checked')) {
				++show;
			}
		});
		if ( show > 0 ) {
			this.checked = true;
			if (show > 1) {
				this.disabled = true;
			}
		} else {
			this.checked = false;
		}
	}

	gotoDetail(project: Project): void{
  		this.router.navigate(['/project/shown', project.id]);
  	}

	gotoNew(): void{
		this.router.navigate(["/project/new"]);
	}

	//Kiszámoljuk, hogy a határidő és a mai nap között hány nap különbség van.
	count(project: Project): string{
		console.log(project.deadline);
		let num: number = Math.round((new Date(project.deadline).getTime() - new Date().getTime())/86400000+0.5);
		return num.toString()+' nap';
	}


	/*A kiválasztott lista elem selected mezője automatikusan
	true-ra változik. Ez alapján a törléshez kiválogatjuk azon
	listaelemeket, melyek select-je true és ha a megjelenő DeleDialog-on
	megerősítjük a törlést, akkor meghívjuk az adott névjegyre a törlés
	metódust egyenként.*/
	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result === true)
			{
				let array=this.projectsDataHandler.projects;
				for (var i = 0; i < array.length; i++) {
					if(array[i].selected)
					{
						this.delete(array[i]);
					}
				}
				this.checked = false;
			}
		});
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
  		this.projectsApiService.updateProject(project).subscribe();
  	}

  	changeDate()
  	{
  		this.projectsDataHandler.projects.forEach(project =>{
  			project.deadline = new Date(project.deadline);
  		});
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
  		this.router.navigate(['/company/new/', array]);
  	}
}