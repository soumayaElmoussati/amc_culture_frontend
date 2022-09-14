import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DistributorResponse } from 'src/app/entities/DistributorResponse';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {

  constructor(private http:HttpClient) { }
  createDistributor(data:any){
    
    return this.http.post<DistributorResponse>(`${ENV["backend-api-base-url"]}/participant/distributors/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateDistributor(data:any){
    
    return this.http.put<DistributorResponse>(`${ENV["backend-api-base-url"]}/participant/distributors/`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  
}
