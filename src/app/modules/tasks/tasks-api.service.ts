import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../tasks/task';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseApiService } from '../../shared/services/base/base-api.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class TasksApiService extends BaseApiService{

	private tasksUrl = 'api/tasks';

	constructor(private http: HttpClient)
  {
    super();
  }

  /*Visszaad egy Observable-t a task tömbről, melyet
  a webapi-ból nyert ki. Később ha ezt a metódust meghívják
  és feliratkoznak rá, ki tudják nyerni az adatokat belőle.*/
	getItems(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(tasks => (`fetched tasks`)),
        catchError(this.handleError('getTasks', []))
      );
	}

  /*Lásd: getTasks, csak itt egy darab cégre végeztük el,
  melyet a paraméterben megkapott feladat, vagy id alapján azonosítunk*/
  getItem(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => (`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  /*A paraméterben kapott feladat vagy id alapján azonosítja a törölni
  kivánt feladatot és küld egy kérést a http.delete segítségével az apinak.*/
  delete(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}/${id}`;

    return this.http.delete<Task>(url, httpOptions).pipe(
      tap(_ => (`deleted task id=${id}`)),
      catchError(this.handleError<Task>('delete'))
    );
  }

  /*A paraméterben kapott feladat alapján azonosítja a hozzáadni kívánt
  feladatot és küld egy kérést a http.post segítségével az apinak.*/
  add(task: Task): Observable<Task>{
    return this.http.post<Task>(this.tasksUrl, task, httpOptions).pipe(
        catchError(this.handleError<Task>('addTask'))
      );
  }

  /*A paraméterben kapott feladat alapján azonosítja a módosítani kívánt
  feladatot és küld egy kérést a http.put segítségével az apinak.*/
  update (task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, httpOptions).pipe(
      tap(_ => (`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
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