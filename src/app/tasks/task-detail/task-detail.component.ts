import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDeleteDataHandler } from './../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { Task } from './../../shared/classes/task';
import { TaskService } from './../task.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseDetailComponent } from '../../shared/services/base/base-detail.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  task: Task;

  constructor(
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private route: ActivatedRoute,
    protected location: Location,
    private router: Router,
    protected dialog: MatDialog,
    private taskService: TaskService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(location, dialog)
  }

  ngOnInit(): void {
    if(this.taskService.getItems() && !this.task){
			this.task = this.taskService.getItem(+this.route.snapshot.params['id'])
		}
  }

	ngAfterViewChecked(){
		if(!this.task){
			this.task = this.taskService.getItem(+this.route.snapshot.params['id'])
    }
    this.changeDetector.detectChanges();
  }
  
  navigateToEdit(): void{
    this.router.navigate(['/task/edit', this.task.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(task: Task): void {
    this.taskService.delete(task);
    this.router.navigate(['task/list']);
  }

}
