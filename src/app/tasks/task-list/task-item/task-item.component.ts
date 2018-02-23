import { Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Task } from './../../task';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../shared/services/base/base-item.component';

@Component({
  selector: '[app-task-item]',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent extends BaseItemComponent implements OnInit {
  @Input() task: Task;

  constructor(
    protected taskService: TaskService,
    private router: Router
  ) {
    super(taskService);
  }

  navigateToDetail(id: number): void{
    this.router.navigate(['/task/shown', id]);
  }

  ngOnInit() {
  }

}
