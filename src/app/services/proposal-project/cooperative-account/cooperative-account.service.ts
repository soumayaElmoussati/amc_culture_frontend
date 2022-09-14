import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from 'src/env';
import { forkJoin, Observable } from 'rxjs';
import { CooperativeAccount } from 'src/app/entities/proposal-project/CooperativeAcountResponse';
import { GenericPageable } from 'src/app/entities/generic-pageable';

@Injectable({
  providedIn: 'root'
})
export class CooperativeAccountService {

  constructor(private http:HttpClient) { }

  createNewCooperativeAccount(cooperativeAccountData:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account/`, cooperativeAccountData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateCooperativeAccount(cooperativeAccountData:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account/${cooperativeAccountData.refCooperativeAccount}`, cooperativeAccountData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  checkIfCooperativeAccountExist(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account/get-by-user`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  storeDocs(data:Array<any>){
    let httpRequests = [];
    data.forEach(e => {
      const formData = new FormData();
      formData.append('documentType', e["documentType"]);
      formData.append('refObject', e["refObject"]);
      formData.append('file', e["file"]);     
      httpRequests.push(this.http.post<any[]>(`${ENV["backend-api-base-url"]}/documents/`, formData));
    });
    
    return forkJoin(httpRequests);
  }

  updateDocs(data:Array<any>){
    let httpRequests = [];
    data.forEach(e => {
      const formData = new FormData();
      formData.append('file', e["file"]);     
      httpRequests.push(this.http.put<any[]>(`${ENV["backend-api-base-url"]}/documents/${e.data.refDocument}`, 
      formData,{responseType:'text' as 'json'}));
    });
    return forkJoin(httpRequests);
  }
  getDocByDocRef(docRef){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/documents/${docRef}/visualizeDocument`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
      responseType: 'blob' as 'json'
    });
  }
  getAllDocs(refObject:string){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/documents/${refObject}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  initCooperativeAccount():CooperativeAccount{
    return {
      cooperativeName: "",
      phoneNumber: "",
      faxNumber: "",
      firstName: "",
      lastName: "",
      responsibleName: "",
      cooperativeMember:null,
      address : {refAddress: "", province: "", postalCode: "", city: null, country: "MA", address: "", region: null},
      generalInformation: {
        projectName: "",
        projectTitle: "",
        projectType: "",
        numDancesOrSongs: null,
        durationTime: "",
        projectCost: null,
        projectDescription: "",
        albumTitle: ""
      }
    }    
  }
  getGeneralInformationMember(refGeneralInformation:string){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/general-member/${refGeneralInformation}/`);
  }
  createGeneralInformationMember(data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/general-member/`,data);
  }
  editGeneralInformationMember(data:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/general-member/${data.refGeneralMember}/`,data);
  }
  deleteGeneralInformationMember(refGeneralMember:string){
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/general-member/${refGeneralMember}/`);
  }
  validateCooperativeAccount(ref:string){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/validate-demande/COOPERATIVE_ACCOUNT/ref/${ref}`,{});
  }
  getDocsByRf(ref){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/documents/${ref}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  
  getCooperativeAccountsForUserWithPageAndSize(page:number,size:number):Observable<GenericPageable>{
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account/user?page=${page}&size=${size}`);
  }
  
  deleteCooperativeicAccount(refCooperativeAccount:string):Observable<any>{
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/company-account/update-status/${refCooperativeAccount}?status=DELETED`,{});
  }

  getCooperativeAccountByRef(ref:string):Observable<any>{
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account/get-by-ref/${ref}`);
  }

}
