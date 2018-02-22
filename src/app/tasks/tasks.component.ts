import { Router } from '@angular/router';
import { TaskService } from './task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {
  }

  createNewItem(): void{
    this.router.navigate(["/task/new"]);
  }

}
