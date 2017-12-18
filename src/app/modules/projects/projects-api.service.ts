import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../../shared/classes/project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class ProjectsApiService{

	private projectsUrl = 'api/projects';

	constructor(
		private http: HttpClient,
		){}

	getProjects(): Observable<Project[]> {
		console.log(this.http.get<Project[]>(this.projectsUrl)
			.pipe(
				tap(projects => (`fetched projects`)),
        		catchError(this.handleError('getProjects', []))
			).subscribe(project => console.log(project)));
		return this.http.get<Project[]>(this.projectsUrl)
			.pipe(
				tap(projects => (`fetched projects`)),
        		catchError(this.handleError('getProjects', []))
			);
	}

	getProject(project: Project | number): Observable<Project> {
		const id = typeof project === 'number' ? project : project.id;
		const url = `${this.projectsUrl}/${id}`;
		console.log(this.http.get<Project>(url).pipe(
			tap(_ => (`fetched project id=${id}`)),
			catchError(this.handleError<Project>(`getProject id=${id}`))).subscribe(project => console.log(project)));
		return this.http.get<Project>(url).pipe(
			tap(_ => (`fetched project id=${id}`)),
			catchError(this.handleError<Project>(`getProject id=${id}`))
		);
	}

	delete(project: Project | number): Observable<Project> {
		const id = typeof project === 'number' ? project : project.id;
		const url = `${this.projectsUrl}/${id}`;

		return this.http.delete<Project>(url, httpOptions).pipe(
			tap(_ => (`deleted project id=${id}`)),
			catchError(this.handleError<Project>('delete'))
		);
	}

	addProject(project: Project): Observable<Project>{
		return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
			catchError(this.handleError<Project>('addProject'))
		);
	}

	updateProject (project: Project): Observable<any> {
		console.log('lefut');
		return this.http.put(this.projectsUrl, project, httpOptions).pipe(
			tap(_ => (`updated project id=${project.id}`)),
			catchError(this.handleError<any>('updateProject'))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
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