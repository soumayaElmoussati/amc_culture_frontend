import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from 'src/env';
import { forkJoin, Observable } from 'rxjs';
import { CooperativeAccountBook } from 'src/app/entities/proposal-project/CooperativeAccountBookResponse';
import { GenericPageable } from 'src/app/entities/generic-pageable';

@Injectable({
  providedIn: 'root'
})
export class CooperativeAccountBookService {

  constructor(private http:HttpClient) { }

  createNewCooperativeAccountBook(cooperativeAccountBookData:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account-book/`, cooperativeAccountBookData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateCooperativeAccountBook(cooperativeAccountBookData:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account-book/${cooperativeAccountBookData.refCooperativeAccountBook}`, cooperativeAccountBookData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  checkIfCooperativeAccountBookExist(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account-book/get-by-user`, {
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
  initCooperativeAccountBook():CooperativeAccountBook{
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
  validateCooperativeAccountBook(ref:string){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/validate-demande/COOPERATIVE_ACCOUNT/ref/${ref}`,{});
  }
  getDocsByRf(ref){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/documents/${ref}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  
  getCooperativeAccountBooksForUserWithPageAndSize(page:number,size:number):Observable<GenericPageable>{
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account-book/user?page=${page}&size=${size}`);
  }
  
  deleteCooperativeAccountBook(refCooperativeAccountBook:string):Observable<any>{
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/company-account/update-status/${refCooperativeAccountBook}?status=DELETED`,{});
  }

  getCooperativeAccountBookByRef(ref:string):Observable<any>{
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/cooperative-account-book/get-by-ref/${ref}`);
  }

}
