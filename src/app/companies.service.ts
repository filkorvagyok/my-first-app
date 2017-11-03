import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ComapniesService {
  constructor(private http: Http) { 
  }
  private url:string = "http://localhost:3004/companies";
  fetchData(){
      return this.http.get(this.url).map(
        (response) => response.json()
      )
  }
}