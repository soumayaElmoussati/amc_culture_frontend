import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryResponse } from 'src/app/entities/LibraryResponse';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  constructor(private http:HttpClient) { }

  createLibrary(data:any){
    
    return this.http.post<LibraryResponse>(`${ENV["backend-api-base-url"]}/library/libraries/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateLibrary(data:any){
    
    return this.http.put<LibraryResponse>(`${ENV["backend-api-base-url"]}/library/libraries/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  
}
