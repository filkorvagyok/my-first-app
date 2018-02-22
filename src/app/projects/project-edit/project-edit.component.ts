import { Project } from './../../shared/classes/project';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from './../project.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { SharedAddDataHandler } from './../../shared/services/shared-adddatahandler.service';
import { SharedGetDataHandler } from './../../shared/services/shared-getdatahandler.service';
import { BaseEditComponent } from '../../shared/services/base/base-edit.component';
import { Location } from '@angular/common';


const MONEY_REGEX = /^(0|[1-9][0-9]*)$/;

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
  projectForm: FormGroup;
  project: Project;
	edit = false;

  constructor(private route: ActivatedRoute,
		private projectService: ProjectService,
		private fb: FormBuilder,
		protected location: Location,
    private sharedAddDataHandler: SharedAddDataHandler,
    private sharedGetDataHandler: SharedGetDataHandler,
		private changeDetector: ChangeDetectorRef) {
      super(location);
    }

  //Form validitás beállítása
	initform(): void{
		this.projectForm = this.fb.group({
			'projectName': [null, Validators.required],
			'projectIncome': [null, Validators.pattern(MONEY_REGEX)],
			'projectExpenditure': [null, Validators.pattern(MONEY_REGEX)],
			'projectDescription': [],
			'projectChecklist': [],
			'projectFile': [],
			'projectCompany': [],
			'projectStatus': [],
			'projectPriority': [],
			'projectStickers': [],
			'projectCurrency': []
		});
	}

  ngOnInit() {
    this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getContacts();
    this.initform();
    if(this.projectService.getItems() && !this.project)
    {
      this.setEditProject();
    }
  }

	ngAfterViewChecked(){
		if(!this.project){
			this.setEditProject();
		}
		this.changeDetector.detectChanges();
	}

  setEditProject(): void{
		if(this.route.snapshot.routeConfig.path == "project/new")
		{
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "company/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
	}

	setNew(): void{
		this.project = new Project();
		switch (Number(this.route.snapshot.params['num'])) {
			case 0:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.project.company.push(Number(x)));
				break;
			case 2:
				switch (Number(this.route.snapshot.params['rank'])) {
					case 0:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.project.accountable.push(Number(x)));
						break;
					case 1:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.project.owner.push(Number(x)));
						break;
					case 2:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.project.observer.push(Number(x)));
						break;
					case 3:
						this.route.snapshot.params['array'].split(",").forEach(x =>
							this.project.participant.push(Number(x)));
						break;
					default:
						break;
				}
				break;
			default:
				break;
		}
	}
	
	setEdit(): void{
    this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
  }

  save(): void{
		this.projectService.update(this.project)
		if(this.project.company.length > 0)
			this.sharedAddDataHandler.addProjectToCompany(this.project);
		if(this.project.accountable.length > 0 || this.project.owner.length > 0 ||
			this.project.observer.length > 0 || this.project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(this.project);
    this.navigateBack();
	}

	add(project: Project): void{
		this.projectService.add(project)
		if(project.company.length > 0)
			this.sharedAddDataHandler.addProjectToCompany(project);
		if(project.accountable.length > 0 || project.owner.length > 0 ||
			project.observer.length > 0 || project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(project);
    this.navigateBack();
  }
  
  /*Ha a project company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég project mezőjében ennek a projektnek az id-ját. Hasonlóan működik, ha
	a project accountable, owner,observer vagy participant mezőjében lárolunk
	legalább 1 névjegy id-t, csak ott a névjegy project mezőjébe szúrjuk be a
	project id-ját.*/

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

	onChange(newValue){
		return newValue;
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(project: Project){
		if(this.projectForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(project);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.projectForm);
		}
	}

}
