import { Injectable } from '@angular/core';
import { Task } from '../../tasks/task';
import { TasksApiService } from './tasks-api.service';
import { SharedGetDataHandler } from '../../shared/services/shared-getdatahandler.service'

@Injectable()
export class TasksDataHandler{

	constructor(
    private tasksApiService: TasksApiService,
    private sharedGetDataHandler: SharedGetDataHandler
    ){}
  tasks: Task[];
  task: Task;
  isLoading: boolean = true; //Ez a lista nézetben fontos, amikor csak a feladatok információira van szükségünk.
  isLoadingData: boolean = true;

  /*A TasksApiService-ben meghívjuk a getTasks metódust, ami egy observable feladat tömböt ad vissza,
  amire feliratkozva kinyerhetjük a feladatok adatait.*/
  getTasks(): void{
    this.tasksApiService.getItems()
      .subscribe(tasks => {this.tasks = tasks; this.isLoading = false;});
  }

  /*A TasksApiService-ben meghívjuk a getTask metódust, ami egy observable feladatot ad vissza,
  amire feliratkozva kinyerhetjük a feladat adatait.*/
  getTask(task: Task | number, detail: boolean): void{
    this.tasksApiService.getItem(task)
      .subscribe(task => {
        this.task = task;
        this.isLoadingData = false;
      });
  }


  //Alapállapotba helyezzük a feladatot.
  setDefaultTask(task: Task): Task{
    task.name = "";
    task.selected = false;
    return task;
  }

  addTask(task: Task): void{
    this.tasksApiService.add(task)
      .subscribe(task => this.tasks.push(task));
  }
}