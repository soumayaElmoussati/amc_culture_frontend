import { Injectable } from '@angular/core';
import { NewSielRequestResponse } from 'src/app/entities/NewSielRequestResponse';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http:HttpClient) { }


  createPublisherRepresented(refExibitor:string,data){
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExibitor}/publishers-represented/`, data);
}

updatePublisherRepresented(refExhibitor:string,refPublisher:string,data){
  return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publishers-represented/${refPublisher}`, data);

}

getPublisherRepresentedByRefExhibitor(refExhibitor,page, size){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publishers-represented/?page=${page}&size=${size}`);
}


createPublication(refExhibitor:string,data){
  return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications`, data);
}

updatePublication(refExhibitor:string,refPublication:string,data){
  return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications/${refPublication}`, data);

}

deletePublication(refExhibitor:string,refPublication:string){
  return this.http.delete<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications/${refPublication}`);

}
deleteEditeurRepresente(refExhibitor:string,refPublisherRepresented:string){
  return this.http.delete<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publishers-represented/${refPublisherRepresented}`);
}

getPublicationByRefExhibitor(refExhibitor:string,statusEnum,page, size){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications?statusEnum=${statusEnum}&page=${page}&size=${size}`);

}

createActivityProposal(refExhibitor:string,data){
  return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/activities-proposal`, data);

}

updateActivityProposal(refExhibitor:string,refActivityProposal:string,data){
  return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/activities-proposal/${refActivityProposal}`, data);

}

deleteActivityProposal(refExhibitor:string,refActivityProposal:string){
  return this.http.delete<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/activities-proposal/${refActivityProposal}`);

}

getActivityProposalByRefExhibitor(refExhibitor:string,page, size){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/activities-proposal/?page=${page}&size=${size}`);

}


getModelImportPublications(){
  return this.http.get<any>(`${ENV['backend-api-base-url']}/siel/download/publication-model`, {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    responseType: 'blob' as 'json'
  });
}

 checkPublicationsFileErrors(ref:any, file:any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/documents/${ref}/exhibitors`, formData);
  }


  
}
