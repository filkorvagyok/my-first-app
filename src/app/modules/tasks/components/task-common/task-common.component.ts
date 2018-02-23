import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../../tasks/task';
import { TasksDataHandler } from '../../tasks-datahandler.service';
import { BaseCommonComponent } from '../../../../shared/services/base/base-common.component';

@Component({
  selector: 'task-common',
  templateUrl: './task-common.component.html',
})

export class TaskCommonComponent extends BaseCommonComponent implements OnInit{

	constructor(
		private tasksDataHandler: TasksDataHandler,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "task/new")
		{ 
			//Ha az url "project/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "project/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
	}

	/*Létrehozunk egy üres project példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 0-val, akkor a tömbben lévő id-kat belerakjuk a company mezőbe,
	ha pedig 2-vel egyelnő, akkor pedig a rank értékét is megvizsgáljuk és ezek alapján vagy az accountable,
	vagy az owner, vagy az observer, vagy pedig a participant mezőbe rakjuk a tömb értékeit.*/
	setNew(): void{
		this.tasksDataHandler.task = new Task;
		this.tasksDataHandler.task = this.tasksDataHandler.setDefaultTask(this.tasksDataHandler.task);
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő projekt adatokat.
	setEdit(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.tasksDataHandler.getTask(Number(params.get('id')), false));
	}
}
