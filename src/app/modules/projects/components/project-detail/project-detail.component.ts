import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../../projects/project';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BaseDetailComponent } from '../../../../shared/services/base/base-detail.component';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})

export class ProjectDetailComponent extends BaseDetailComponent implements OnInit{

	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private route: ActivatedRoute,
	    protected location: Location,
	    private router: Router,
	    protected dialog: MatDialog
	  ) {
	    super(location, dialog)
	  }

	ngOnInit(): void {
		this.projectsDataHandler.isLoadingData = true;
	    this.sharedGetDataHandler.getCompanies();
	    this.sharedGetDataHandler.getContacts();
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id')), true));
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.projectsDataHandler.project.id]);
	}


	/*Ha van(nak) hozzátartozó cég(ek) vagy névjegy(ek), akkor először
	  onnan kitöröljük a névjegyet a SharedDeleteDataHandler segítségével, majd
	  a projectsApiService.delete metódusát hajtjuk végre*/
	delete(project: Project): void{
		this.sharedDeleteDataHandler.deleteProjectFromCompany(project);
		this.sharedDeleteDataHandler.deleteProjectFromContact(project);
		this.projectsApiService.delete(project).subscribe();
		this.router.navigate(['project/list']);
	}

	/*Átadjuk a projektet az új névjegy létrehozásához.*/
    createNewContact(rank: number): void{
      let projectsArray: number[] = [];
      projectsArray.push(this.projectsDataHandler.project.id);
      this.gotoNewContact(projectsArray, rank);
    }

    gotoNewContact(array: number[], rank: number): void{
      this.router.navigate(['/people/new/', {array:array, num:1, rank:rank}]);
    }

    //Lásd.: createNewProject, csak itt névjegy helyett cégre alkalmazzuk
    createNewCompany(): void {
      let projectsArray: number[] = [];
      projectsArray.push(this.projectsDataHandler.project.id);
      this.gotoNewCompany(projectsArray);
    }

    gotoNewCompany(array: number[]): void{
      this.router.navigate(['/company/new/', {array:array, num:1}]);
    }
}