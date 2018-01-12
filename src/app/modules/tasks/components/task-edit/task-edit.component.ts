import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
import { Location } from '@angular/common';
import { Task } from '../../../../shared/classes/task';
import { TasksApiService } from '../../tasks-api.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';
import { BaseEditComponent } from '../../../../shared/services/base/base-edit.component';

@Component({
  selector: 'task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})

export class TaskEditComponent extends BaseEditComponent implements OnInit {
	constructor(
		private tasksApiService: TasksApiService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		protected location: Location,
		private fb: FormBuilder
	) {
		super(location);
	}

	@Input() task: Task;
	@Input() edit: boolean;
	taskForm: FormGroup;

	//Form validitás beállítása
	initform(): void{
		this.taskForm = this.fb.group({
			'taskName': [null, Validators.required]
		});
	}

	ngOnInit(): void{
		this.initform();
	}

	save(): void{
		this.tasksApiService.update(this.task)
        	.subscribe(() => this.goBack())
	}

	add(task: Task): void{
		this.tasksApiService.add(task)
			.subscribe(() => {
				this.goBack();
			});
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(task: Task){
		if(this.taskForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(task);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.taskForm);
		}
	}
}