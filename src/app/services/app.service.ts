import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) {}

    getData():Observable<any> {
        const url = 'https://api.covid19api.com/summary';
        return this.http.get<any>(url);
    }
}