import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  constructor (private _http: Http) {}

  getAllData(): Observable<any> {
    return this._http.get('https://read-later-service.firebaseio.com/data.json')
      .map(response => response.json());
  }

  addData(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('https://read-later-service.firebaseio.com/data.json', body, {headers: headers})
      .map(response => response.json());
  }

  deleteAllData(): Observable<any> {
    return this._http.delete(`https://read-later-service.firebaseio.com/data/.json`)
      .map(response => response.json());
  }

  deleteData(id): Observable<any> {
    return this._http.delete(`https://read-later-service.firebaseio.com/data/${id}.json`)
      .map(response => response.json());
  }

}
