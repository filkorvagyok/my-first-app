import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Project } from './../../shared/classes/project';
import { ProjectService } from './../project.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDeleteDataHandler } from './../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { Location } from '@angular/common';
import { BaseDetailComponent } from '../../shared/services/base/base-detail.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  project: Project;

  constructor(
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    protected location: Location,
    private router: Router,
    protected dialog: MatDialog,
    private projectService: ProjectService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(location, dialog)
  }

  ngOnInit(): void {
    this.sharedGetDataHandler.getCompanies();
    this.sharedGetDataHandler.getContacts();
    if(this.projectService.getItems() && !this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id']);
    }
  }

	ngAfterViewChecked(){
		if(!this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
    }
    this.changeDetector.detectChanges();
	}

  navigateToEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
	}


	/*Ha van(nak) hozzátartozó cég(ek) vagy névjegy(ek), akkor először
	  onnan kitöröljük a névjegyet a SharedDeleteDataHandler segítségével, majd
	  a projectsApiService.delete metódusát hajtjuk végre*/
	delete(project: Project): void{
		this.sharedDeleteDataHandler.deleteProjectFromCompany(project);
		this.sharedDeleteDataHandler.deleteProjectFromContact(project);
		this.projectService.delete(project);
		this.router.navigate(['project/list']);
	}

	/*Átadjuk a projektet az új névjegy létrehozásához.*/
    createNewContact(rank: number): void{
      let projectsArray: number[] = [];
      projectsArray.push(this.project.id);
      this.navigateToNewContact(projectsArray, rank);
    }

    navigateToNewContact(array: number[], rank: number): void{
      this.router.navigate(['/people/new/', {array:array, num:1, rank:rank}]);
    }

    //Lásd.: createNewProject, csak itt névjegy helyett cégre alkalmazzuk
    createNewCompany(): void {
      let projectsArray: number[] = [];
      projectsArray.push(this.project.id);
      this.navigateToNewCompany(projectsArray);
    }

    navigateToNewCompany(array: number[]): void{
      this.router.navigate(['/company/new/', {array:array, num:1}]);
    }

}
