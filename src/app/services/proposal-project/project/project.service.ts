import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { ProjectResponse } from 'src/app/entities/proposalProjectView/project-response';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  createProject(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  createProjects(data:any[]){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/bulk`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateProject(data:any,ref:string)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/${ref}`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getProject(ref:string):Observable<ProjectResponse>
  {
    return this.http.get<ProjectResponse>(`${ENV["backend-api-base-url"]}/proposal/${ref}`);
  }
  getProjectsWithPageAndSize(page: number, size: number) {
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/paging?page=${page}&size=${size}`);
  }
  deleteProject(refToDelete: string) {
    //TODO remove later on
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/${refToDelete}`);
  }

  constructor(private http:HttpClient) { }
}
