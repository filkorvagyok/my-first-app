import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  createNewItem(): void{
    this.router.navigate(["/project/new"]);
  }

}
