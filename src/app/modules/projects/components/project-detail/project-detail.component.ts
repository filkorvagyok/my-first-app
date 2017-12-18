import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Project } from '../../../../shared/classes/project';
import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';

import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{

	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		private dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.projectsDataHandler.isLoadingData = true;
	    this.sharedGetDataHandler.getCompanies();
	    this.sharedGetDataHandler.getContacts();
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id')), true));
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.projectsDataHandler.project.id]);
	}

	clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result === true)
			{	
				this.delete(this.projectsDataHandler.project);
			}
		});
	}

	delete(project: Project): void{
		this.sharedDeleteDataHandler.deleteProjectFromCompany(project);
		this.sharedDeleteDataHandler.deleteProjectFromContact(project);
		this.projectsApiService.delete(project).subscribe();
		this.router.navigate(['project/list']);
	}
}