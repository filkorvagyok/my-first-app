import { Router } from '@angular/router';
import { ProjectService } from './../../project.service';
import { Project } from './../../../shared/classes/project';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../shared/services/base/base-item.component';

@Component({
  selector: '[app-project-item]',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent extends BaseItemComponent implements OnInit {
  @Input() project: Project;

  constructor(protected projectService: ProjectService,
    private router: Router) {
      super(projectService);
    }

    ngOnInit() {
    }

  navigateToDetail(id: number): void{
    this.router.navigate(['/project/shown', id]);
  } 

  //Kiszámoljuk, hogy a határidő és a mai nap között hány nap különbség van.
	count(project: Project): number{
		let num: number;
		project.deadline.setHours(0,0,0,0);
		let newDate = new Date();
		newDate.setHours(0,0,0,0);
		return Math.round((project.deadline.getTime() - newDate.getTime())/86400000);
  }
  
  //Átírjuk a határidőt a kapott napok számával növelt mai dátumra.
  changeDate(project: Project, days:number)
  {
    project.deadline = new Date(new Date().getTime() + days * (1000 * 60 * 60 * 24));
    this.changeProject(project);
  }

  changeProject(project: Project)
  {
    this.projectService.update(project);
  }

  //Dátumválasztó beállítása
  datepickerOpts = {
    autoclose: true,
    todayBtn: 'linked',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'yyyy. MM d.',
    showMeridian : false,
    maxHours: 24,
    language: 'hu'
}


}
