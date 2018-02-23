import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location }                 from '@angular/common';
import { Router } from '@angular/router';
import { Task }        from '../../../../tasks/task';
import { TasksApiService } from '../../tasks-api.service';
import { TasksDataHandler } from '../../tasks-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { DeleteDialog } from '../../../delete-dialog/components/delete-dialog';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BaseDetailComponent } from '../../../../shared/services/base/base-detail.component';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: [ '../../../../shared/styles/detail.component.css' ]
})
export class TaskDetailComponent extends BaseDetailComponent implements OnInit {
	constructor(
		private tasksApiService: TasksApiService,
		private tasksDataHandler: TasksDataHandler,
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
		this.tasksDataHandler.isLoadingData = true;
		this.route.paramMap.subscribe(params => this.tasksDataHandler.getTask(Number(params.get('id')), true));
	}

	gotoEdit(): void{
		this.router.navigate(['/task/edit', this.tasksDataHandler.task.id]);
	}

	//TODO: Kibővíteni, megjegyzést írni ide.
	delete(task: Task): void {
		this.tasksApiService.delete(task).subscribe();
		this.router.navigate(['task/list']);
	}
}