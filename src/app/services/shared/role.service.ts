import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Role } from 'src/app/entities/sharedView/role';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  createRole(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/admin/role`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateRole(data:any,ref:string)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/admin/role/${ref}`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getRole(ref:string):Observable<Role>
  {
    return this.http.get<Role>(`${ENV["backend-api-base-url"]}/admin/role/${ref}`);
  }
  getRoles():Observable<Role[]>
  {
    return this.http.get<Role[]>(`${ENV["backend-api-base-url"]}/admin/role`);
  }
  getRolesWithPageAndSize(page: number, size: number) {
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/admin/role/manage?page=${page}&size=${size}`);
  }
  deleteRole(refToDelete: string) {
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/admin/role/${refToDelete}`);
  }

  constructor(private http:HttpClient) { }
}
