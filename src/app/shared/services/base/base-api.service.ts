import { Observable } from 'rxjs/Observable';

export abstract class BaseApiService{
	constructor(){}
	//protected abstract getItems(): Observable<any[]>;
	protected abstract getItem(item: any): Observable<any>;
	protected abstract delete(item: any): Observable<any>;
	protected abstract add(item: any): Observable<any>;
	protected abstract update(item: any): Observable<any>;
	protected abstract handleError<T> (operation, result?: T);
}