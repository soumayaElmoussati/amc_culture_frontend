import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { ArtistAccount } from 'src/app/entities/proposalProjectView/artist-account-view';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ArtistAccountService {

  constructor(private http:HttpClient) { }

  createNewArtistAccount(artistAccountData:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/`, artistAccountData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateArtistAccount(artistAccountData:any){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/${artistAccountData.refArtistAccount}`, artistAccountData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  checkIfArtistAccountExist(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/get-by-user`, {
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
  initArtistAccountAccount():ArtistAccount{
    return {
      refArtistAccount: "",
      cin: "",
      firstName: "",
      lastName: "",
      firstNameAR: "",
      lastNameAR: "",
      artistName: "",
      artistNameAR: "",
      gender: "",
      identityType: "",
      identityNumber: "",
      identityProfType: "",
      artistSpeciality: "",
      artistSpecialityAR: "",
      email: "",
      phoneNumber: "",
      otherPhoneNumber: "",
      maritalStatus: "",
      dependentChildren:null,
      otherJobName: "",
      socialSecurityName: "",
      socialSecurityID: "",
      artisticWorkStartDate:null,
      lastArtisticActivity: "",
      teamName: "",
      teamCreationDate:null,
      studyLevel: "",
      artisticEtablishmentName: "",
      ribNumber: "",
      domainName: "",
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
      },
      birthdata: {
        birthDate: null,
        birthCountry: "",
        birthCity: "",
        nationality: ""
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
  validateArtistAccount(ref:string){
    return this.http.put<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/${ref}/finish`,{});
  }

  getArtistAccountByRef(ref:string):Observable<any>{
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/${ref}`);
  }

  getArtistAccountsForUserWithPage(page:number):Observable<GenericPageable>{
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/artist-account/user?page=${page}`);
  }

  getArtistAccountsForUserWithPageAndSize(page:number,size:number):Observable<GenericPageable>{
    return this.http.get<GenericPageable>(`${ENV["backend-api-base-url"]}/proposal/artist-account/user?page=${page}&size=${size}`);
  }

  deleteArtisticAccount(refArtistAccount:string):Observable<any>{
    return this.http.delete<any>(`${ENV["backend-api-base-url"]}/proposal/artist-account/${refArtistAccount}`);
  }
}
