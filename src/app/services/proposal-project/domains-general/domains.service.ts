import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Domains } from 'src/app/entities/proposalProjectView/domains';
import { Subdomains } from 'src/app/entities/proposalProjectView/subdomains';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {
  createDomain(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/domains`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateDomain(data:any,ref:string)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/domains/${ref}`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  attachSubomains(data:Subdomains[],ref:string)
  {
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/domains/${ref}/sub-domains`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getDomain(ref:string):Observable<Domains>
  {
    return this.http.get<Domains>(`${ENV["backend-api-base-url"]}/proposal/domains/${ref}`);
  }
  getDomains():Observable<Domains[]>
  {
    return this.http.get<Domains[]>(`${ENV["backend-api-base-url"]}/proposal/domains`);
  }
  getDomainsWithPageAndSize(page: number, size: number) {
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/domains/paging?page=${page}&size=${size}`);
  }
  deleteDomain(refToDelete: string) {
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/domains/${refToDelete}`);
  }

  constructor(private http:HttpClient) { }
}
