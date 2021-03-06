import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../projects/project';
import { ProjectsDataHandler } from '../../projects-datahandler.service';
import { BaseCommonComponent } from '../../../../shared/services/base/base-common.component';

@Component({
  selector: 'project-common',
  templateUrl: './project-common.component.html',
})

export class ProjectCommonComponent extends BaseCommonComponent implements OnInit{

	constructor(
		private projectsDataHandler: ProjectsDataHandler,
		private route: ActivatedRoute
	) {
		super();
	}

	ngOnInit(): void {
		if(this.route.snapshot.routeConfig.path == "project/new")
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
		this.projectsDataHandler.project = new Project;
		this.projectsDataHandler.project = this.projectsDataHandler.setDefaultProject(this.projectsDataHandler.project);
		switch (Number(this.route.snapshot.params['num'])) {
			case 0:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.projectsDataHandler.project.company.push(Number(x)));
				break;
			case 2:
				switch (Number(this.route.snapshot.params['rank'])) {
					case 0:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.projectsDataHandler.project.accountable.push(Number(x)));
						break;
					case 1:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.projectsDataHandler.project.owner.push(Number(x)));
						break;
					case 2:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.projectsDataHandler.project.observer.push(Number(x)));
						break;
					case 3:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.projectsDataHandler.project.participant.push(Number(x)));
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő projekt adatokat.
	setEdit(): void{
		this.edit = true;
		this.route.paramMap.subscribe(params => this.projectsDataHandler.getProject(Number(params.get('id')), false));
	}
}
