import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { File } from "./dataModelClasses";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataModelManagerService {

  private url: string = 'http://localhost:8080/api/files';

  constructor(private http: HttpClient) { }

  filesGetAll(): Observable<File[]> {
    return this.http.get<File[]>(this.url);
  }
  
}
