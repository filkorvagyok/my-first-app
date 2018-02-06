import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './../shared/classes/project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

Injectable()
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
                (projects: Project[]) => this.projects = projects
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
        this.projects.push(project);
    }

    update (project: Project): void{
        this.projects.find(oldProject => oldProject.id === project.id)[0] = project;
    }
    
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