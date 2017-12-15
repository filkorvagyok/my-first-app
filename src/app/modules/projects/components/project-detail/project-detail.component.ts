import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { ProjectsApiService } from '../../projects-api.service';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{

	constructor(
		private projectsApiService: ProjectsApiService,
		private projectsDataHandler: ProjectsDataHandler,
		private sharedService: SharedService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
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

	openDeleteDialog(): void{
		let dialogRef = this.sharedService.openDeleteDialog();
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{	
				//FONTOS: ÁT LETT ALAKÍTVA A CONTACT CLASS, EMIATT VÁLOZOTT A TÖRLÉS FUKCIÓ IS
				//this.delete(this.projectsDataHandler.project);
			}
		});
	}

	//FONTOS: ÁT LETT ALAKÍTVA A CONTACT CLASS, EMIATT VÁLOZOTT A TÖRLÉS FUKCIÓ IS (lásd fentebb)
	/*delete(project: Project): void {
		if(project.company.length > 0)
			this.sharedService.deleteProjectFromCompany(project).subscribe();
		if(project.accountable.length > 0)
			this.sharedService.deleteProjectFromContact(project, 0).subscribe();
		if(project.owner.length > 0)
			this.sharedService.deleteProjectFromContact(project, 1).subscribe();
		if(project.observer.length > 0)
			this.sharedService.deleteProjectFromContact(project, 2).subscribe();
		if(project.participant.length > 0)
			this.sharedService.deleteProjectFromContact(project, 3).subscribe();
		this.projectsApiService.delete(project).subscribe();
		this.location.back();
	}*/
}