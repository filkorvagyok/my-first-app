import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../tasks/task';
import { TasksApiService } from '../../tasks-api.service';
import { TasksDataHandler } from '../../tasks-datahandler.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedDeleteDataHandler } from '../../../../shared/services/shared-deletedatahandler.service';
import { MatDialog } from '@angular/material';
import { BaseComponent } from '../../../../shared/services/base/base.component'


@Component({
	selector: 'my-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['../../../../shared/styles/display.component.css']
})

export class TasksComponent extends BaseComponent implements OnInit{
	constructor(
		private tasksApiService: TasksApiService,
		private tasksDataHandler: TasksDataHandler,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedDeleteDataHandler: SharedDeleteDataHandler,
		private router: Router,
		protected dialog: MatDialog
	){
		super(dialog);
	}

	ngOnInit(): void{
		this.tasksDataHandler.isLoading = true;
		this.tasksDataHandler.getTasks();
	}

	/*Tölés esetén a céggel összekapcsolt projekt(ek) és névjegy(ek) közül is ki kell törölnünk az adott céget,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(task: Task): void {
		this.tasksDataHandler.tasks = this.tasksDataHandler.tasks.filter(h => h !== task);
    	this.tasksApiService.delete(task).subscribe();
	}

  	gotoDetail(task: Task): void{
  		this.router.navigate(['/task/shown', task.id]);
  	}

  	gotoEdit(): void{
  		let selectedTask = this.tasksDataHandler.tasks.filter(task => task.selected === true)[0];
  		this.router.navigate(['/task/edit', selectedTask.id]);
  	}

  	gotoNew(): void{
  		this.router.navigate(["/task/new"]);
  	}

  	/*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	//TODO: megvalósítani a focust!
  	addInstant(name: string): void{
		let task = new Task();
		task = this.tasksDataHandler.setDefaultTask(task);
  		task.name = name.trim();
    	if (!name) { return; }
    	this.tasksDataHandler.addTask(task);
  	}

}

