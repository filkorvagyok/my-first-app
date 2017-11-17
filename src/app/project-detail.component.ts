import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';

import { Project }        from './project';
import { CompaniesService } from './companies.service';
import { DeleteDialog } from './delete-dialog';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: [ './company-detail.component.css' ]
})

export class ProjectDetailComponent implements OnInit{
	@Input() project: Project;

	constructor(
		private companiesService: CompaniesService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.getProject();
	}

	getProject(): void{
		this.route.paramMap
			.switchMap((params: ParamMap) => this.companiesService.getProject(+params.get('id')))
			.subscribe(project => this.project = project);
	}

	goBack(): void {
		this.location.back();
	}

	gotoEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
	}

	openDeleteDialog(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(dialogRef.componentInstance.delete)
			{
				this.delete(this.project);
			}
		});
	}

  delete(project: Project): void {
      this.companiesService.deleteProject(project).subscribe();
      this.location.back();
  }
}