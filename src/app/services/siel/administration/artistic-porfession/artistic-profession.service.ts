import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ArtisticProfessionService {

  constructor(private http:HttpClient) { }

  getAllArtisticProfession(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession/all`);
  }
  getAllArtisticProfessionDomain(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-domain/all`);
  }
  getAllArtisticProfessionCategory(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-categories/all`);
  }

  createArtisticProfession(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession`,data);
  }
  createArtisticProfessionDomain(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-domain`,data);
  }
  createArtisticProfessionCategory(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-categories`,data);
  }
 
  editArtisticProfession(ref:string,data:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession/${ref}`,data);
  }
  editArtisticProfessionDomain(ref:string,data:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-domain/${ref}`,data);
  }
  editArtisticProfessionCategory(ref:string,data:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-categories/${ref}`,data);
  }
 
  deleteArtisticProfession(ref:string){
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession/${ref}`);
  }
  deleteArtisticProfessionDomain(ref:string){
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-domain/${ref}`);
  }
  deleteArtisticProfessionCategory(ref:string){
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/artistic-profession-category/${ref}`);
  }
}
