import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators }   from '@angular/forms';
import { Location } from '@angular/common';
import { Project } from '../../../../shared/classes/project';
import { ProjectsApiService } from '../../projects-api.service';
import { SharedGetDataHandler } from '../../../../shared/services/shared-getdatahandler.service';
import { SharedAddDataHandler } from '../../../../shared/services/shared-adddatahandler.service';
import { BaseEditComponent } from '../../../../shared/services/base/base-edit.component';

const MONEY_REGEX = /^(0|[1-9][0-9]*)$/;

@Component({
  selector: 'project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: [ '../../../../shared/styles/edit.component.css' ]
})

export class ProjectEditComponent extends BaseEditComponent implements OnInit {
	constructor(
		private projectsApiService: ProjectsApiService,
		private sharedGetDataHandler: SharedGetDataHandler,
		private sharedAddDataHandler: SharedAddDataHandler,
		protected location: Location,
		private fb: FormBuilder
	) {
		super(location);
	}

	@Input() project: Project;
	@Input() edit: boolean;
	projectForm: FormGroup;

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

	ngOnInit(): void{
		this.sharedGetDataHandler.getCompanies();
		this.sharedGetDataHandler.getContacts();
		this.initform();
	}

	save(): void{
		this.addProjectTo(this.project);
		this.projectsApiService.update(this.project)
        	.subscribe(() => this.goBack())
	}

	add(project: Project): void{
		this.projectsApiService.add(project)
			.subscribe(() => {
				this.addProjectTo(project);
				this.goBack();
			});
	}


	/*Ha a project company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég project mezőjében ennek a projektnek az id-ját. Hasonlóan működik, ha
	a project accountable, owner,observer vagy participant mezőjében lárolunk
	legalább 1 névjegy id-t, csak ott a névjegy project mezőjébe szúrjuk be a
	project id-ját.*/
	addProjectTo(project: Project)
	{
		if(project.company.length > 0)
			this.sharedAddDataHandler.addProjectToCompany(project);
		if(project.accountable.length > 0 || project.owner.length > 0 ||
			project.observer.length > 0 || project.participant.length > 0)
			this.sharedAddDataHandler.addProjectToContact(project);
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