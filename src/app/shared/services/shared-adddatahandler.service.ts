import { Injectable } from '@angular/core';
import { Company } from '../classes/company';
import { Project } from '../classes/project';
import { Contact } from '../classes/contact';
import { Proj } from '../classes/proj';
import { CompaniesApiService } from '../../modules/companies/companies-api.service';
import { ProjectsApiService } from '../../modules/projects/projects-api.service';
import { ContactsApiService } from '../../modules/contacts/contacts-api.service';
import { SharedGetDataHandler } from './shared-getdatahandler.service';

@Injectable()

export class SharedAddDataHandler{
	constructor(
		private companiesApiService: CompaniesApiService,
		private projectsApiService: ProjectsApiService,
		private contactsApiService: ContactsApiService,
		private sharedGetDataHandler: SharedGetDataHandler
	){}

	addProjectToContact(i: number, project_id: number, rank: number): void{
  		/*let contact = contacts.find(x=>x.id==i);
  		console.log(contact);
  		switch (which) {
  			case 0:
  				console.log(which);
  				if(!(contact.accountable.indexOf(project.id) > -1))
  					contact.accountable.push(project.id)
  				break;
  			case 1:
  				console.log(which);
	  			if(!(contact.observer.indexOf(project.id) > -1))
	  				contact.observer.push(project.id)
	  			break;
			case 2:
				console.log(which);
				if(!(contact.owner.indexOf(project.id) > -1))
	  				contact.owner.push(project.id)
	  			break;
			case 3:
				console.log(which);
				if(!(contact.participant.indexOf(project.id) > -1))
	  				contact.participant.push(project.id)
	  			break;
  			default:
  				break;*/
  		let contact : Contact;
  		contact.project = [];
  		contact = this.sharedGetDataHandler.contacts.find(contact => contact.id == i);
  		contact.project.forEach(project => {
  			if(project.id == project_id)
  			{
  				if(!project.rank.includes(rank))
  					project.rank.push(rank);
  			}
  			else{

  			}
  		});
  		if(contact.project.map(x => x.id).includes(project_id))
  		{
  			let actualProject = contact.project.find(project => project.id == project_id);
  			if(!actualProject.rank.includes(rank))
  				actualProject.rank.push(rank);
  		}
  		else{
  			let pushProject: Proj;
  			pushProject.id = project_id;
  			pushProject.rank = [];
  			pushProject.rank.push(rank);
  			contact.project.push(pushProject);
  		}
  		this.contactsApiService.updateContact(contact);
  		//}
  		//this.contactsApiService.updateContact(contacts.find(x=>x.id==i)).subscribe();
  	}
}