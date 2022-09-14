import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditorResponse } from 'src/app/entities/EditorResponse';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor(private http:HttpClient) { }
  createEditor(data:any){
    
    return this.http.post<EditorResponse>(`${ENV["backend-api-base-url"]}/participant/editors/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateEditor(data:any){
    
    return this.http.put<EditorResponse>(`${ENV["backend-api-base-url"]}/participant/editors/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
}
