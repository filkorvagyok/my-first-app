import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../../shared/classes/project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class ProjectsApiService{

	private projectsUrl = 'api/projects';

	constructor(
		private http: HttpClient,
		){}


	/*Visszaad egy Observable-t a projekt tömbről, melyet
	  a webapi-ból nyert ki. Később ha ezt a metódust meghívják
	  és feliratkoznak rá, ki tudják nyerni az adatokat belőle.*/
	getProjects(): Observable<Project[]> {
		return this.http.get<Project[]>(this.projectsUrl)
			.pipe(
				tap(projects => (`fetched projects`)),
        		catchError(this.handleError('getProjects', []))
			);
	}


	/*Lásd: getProjects, csak itt egy darab projektre végeztük el,
  	melyet a paraméterben megkapott projekt, vagy id alapján azonosítunk*/
	getProject(project: Project | number): Observable<Project> {
		const id = typeof project === 'number' ? project : project.id;
		const url = `${this.projectsUrl}/${id}`;
		return this.http.get<Project>(url).pipe(
			tap(_ => (`fetched project id=${id}`)),
			catchError(this.handleError<Project>(`getProject id=${id}`))
		);
	}


	/*A paraméterben kapott projekt vagy id alapján azonosítja a törölni
  	kivánt projektet és küld egy kérést a http.delete segítségével az apinak.*/
	delete(project: Project | number): Observable<Project> {
		const id = typeof project === 'number' ? project : project.id;
		const url = `${this.projectsUrl}/${id}`;

		return this.http.delete<Project>(url, httpOptions).pipe(
			tap(_ => (`deleted project id=${id}`)),
			catchError(this.handleError<Project>('delete'))
		);
	}


	/*A paraméterben kapott projekt alapján azonosítja a hozzáadni kívánt
  	projektet és küld egy kérést a http.post segítségével az apinak.*/
	addProject(project: Project): Observable<Project>{
		return this.http.post<Project>(this.projectsUrl, project, httpOptions).pipe(
			catchError(this.handleError<Project>('addProject'))
		);
	}


	/*A paraméterben kapott projekt alapján azonosítja a módosítani kívánt
  	projektet és küld egy kérést a http.put segítségével az apinak.*/
	updateProject (project: Project): Observable<any> {
		return this.http.put(this.projectsUrl, project, httpOptions).pipe(
			tap(_ => (`updated project id=${project.id}`)),
			catchError(this.handleError<any>('updateProject'))
		);
	}


	//Hibakezelő
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