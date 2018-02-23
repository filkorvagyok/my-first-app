import { Task } from './../tasks/task';
import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

class ProjectForContact{
	project: Project;
	ranks: string[] = [];
}

@Injectable()
export class ProjectService{
    private projects: Project[];
    isLoading = true;
    checkedArray = new Subject<number[]>();
    private projectsUrl = 'api/projects';

    constructor(private http: HttpClient){
        this.http.get<Project[]>(this.projectsUrl)
			.pipe(
				tap(projects => (`fetched projects`)),
        		catchError(this.handleError('getProjects', []))
            )
            .subscribe(
                (projects: Project[]) => {
                    projects.forEach(project => project.deadline = new Date(project.deadline));
                    this.projects = projects;
                    this.isLoading = false;
                }
            )
    }

	getItems(): Project[] {
		return this.projects;
    }

    getItem(project: Project | number): Project{
        const id = typeof project === 'number' ? project : project.id;
        if(this.projects)
            return this.projects.find((project: Project) => project.id === id);
        else{
            const url = `${this.projectsUrl}/${id}`;
            this.http.get<Project>(url).pipe(
                tap(_ => (`fetched project id=${id}`)),
                catchError(this.handleError<Project>(`getProject id=${id}`))
            )
            .subscribe(
                (project: Project) => {
                    this.isLoading = false;
                    return project;
                }
            )
        }
    }

    delete(project: Project | number): void{
        const id = typeof project === 'number' ? project : project.id;
        this.projects.splice(this.projects.indexOf(
            this.projects.find(deletedProject => deletedProject.id === id)), 1
        );
    }

    add(project: Project): void{
        project.id = this.projects[this.projects.length - 1].id + 1;
        this.projects.push(project);
    }

    update (project: Project): void{
        this.projects.find(oldProject => oldProject.id === project.id)[0] = project;
    }

    getCertainItems(item: Company | Contact | Task): Project[] | ProjectForContact[] {
        if(item.project.length > 0){
            if(item instanceof Contact){
                let projectsObject: ProjectForContact[] = [];
                item.project.forEach(projectID => {
                    let ranks: string[] = [];
                    const actualProject: Project = this.projects.find(project => project.id === projectID)
                    if(actualProject.owner.includes(item.id))
                        ranks.push("tulajdonos");
                    if(actualProject.observer.includes(item.id))
                        ranks.push("megfigyelő");
                    if(actualProject.accountable.includes(item.id))
                        ranks.push("felelős");
                    if(actualProject.participant.includes(item.id))
                        ranks.push("részvevő");
                    projectsObject.push({project: actualProject, ranks: ranks});
                    ranks = [];
                });
                return projectsObject;
            } else {
                let projects: Project[] = [];
                item.project.forEach(projectID => {
                    projects.push(this.projects.find(project => project.id === projectID));
                });
                return projects;
            }
        }
    }

    /* modifyItemInProject(item: Company | Contact | Task): void{
        if(item instanceof Company){
            let projectToBeModified = this.projects
                .filter(x => x.company.includes(item.id))
                .filter(project => !item.project.includes(project.id));
            projectToBeModified.forEach(project => {
                project.company.splice(project.company.indexOf(item.id), 1);
            });
            if(item.project.length > 0){
                item.project.forEach(projectID => {
                    const actualProject = this.projects.find(contact => contact.id === projectID);
                    if(!actualProject.company.includes(item.id)){
                        actualProject.company.push(item.id);
                        this.update(actualProject);
                    }
                });
            }
        } else if(item instanceof Project) {
            let contactToBeModified = this.contacts
                .filter(x => x.project.includes(item.id))
                .filter(contact => (!item.accountable.includes(contact.id) &&
                !item.observer.includes(contact.id) && !item.owner.includes(contact.id) &&
                item.participant.includes(contact.id)));
            contactToBeModified.forEach(contact => {
                contact.project.splice(contact.project.indexOf(item.id), 1);
            });
            if(item.accountable.length > 0){
                item.accountable.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.observer.length > 0){
                item.observer.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.owner.length > 0){
                item.owner.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            } else if(item.participant.length > 0){
                item.participant.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.project.includes(item.id)){
                        actualContact.project.push(item.id);
                        this.update(actualContact);
                    }
                });
            }
        } else if(item instanceof Task) {
            let contactToBeModified = this.contacts
                .filter(x => x.task.includes(item.id))
                .filter(contact => !item.contact.includes(contact.id));
            contactToBeModified.forEach(contact => {
                contact.task.splice(contact.task.indexOf(item.id), 1);
            });
            if(item.contact.length > 0){
                item.contact.forEach(contactID => {
                    const actualContact = this.contacts.find(contact => contact.id === contactID);
                    if(!actualContact.task.includes(item.id)){
                        actualContact.task.push(item.id);
                        this.update(actualContact);
                    }
                })
            }
        }
    }

    deleteItemFormCompany(item: Company | Project | Task): void{
        if(item instanceof Company){
            this.contacts.filter(contacts => contacts.company.includes(item.id))
            .forEach(contact => {
                contact.company.splice(contact.company.indexOf(item.id), 1);
                this.update(contact);
            });
        } else if(item instanceof Project) {
            this.contacts.filter(contacts => contacts.project.includes(item.id))
            .forEach(contact => {
                contact.project.splice(contact.project.indexOf(item.id), 1);
                this.update(contact);
            });
        } else if(item instanceof Task) {
            this.contacts.filter(contacts => contacts.task.includes(item.id))
            .forEach(contact => {
                contact.task.splice(contact.task.indexOf(item.id), 1);
                this.update(contact);
            });
        }
    } */
    
    //Hibakezelő
	handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}