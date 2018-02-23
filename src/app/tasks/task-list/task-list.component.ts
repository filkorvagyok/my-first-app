import { Task } from './../task';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SharedDeleteDataHandler } from './../../shared/services/shared-deletedatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { TaskService } from './../task.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../shared/services/base/base.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent extends BaseComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private taskService: TaskService,
    private sharedGetDataHandler: SharedGetDataHandler,
    private sharedDeleteDataHandler: SharedDeleteDataHandler,
    private router: Router,
		protected dialog: MatDialog
  ) {
    super(dialog);
    this.subscription = this.taskService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
  }

  ngOnInit() {
  }

  delete(task: Task | number): void {
		const id = typeof task === 'number' ? task : task.id;
		this.taskService.delete(id);
  }
  
  navigateToEdit(): void{
    this.router.navigate(['/task/edit', this.checkedArray[0]]);
  }

  navigateToNewItem(): void{
    this.router.navigate(["/task/new"]);
  }

  navigateToNewProject(){}

  navigateToNewContact(){}

  addInstant(name: string): void{
		let task = new Task();
    task.name = name.trim();
    if (!name) { return; }
    this.taskService.add(task);
  }

  ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}
