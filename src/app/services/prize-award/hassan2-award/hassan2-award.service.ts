import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "../../../../env";

@Injectable({
  providedIn: 'root'
})
export class Hassan2AwardService {

  constructor(private http: HttpClient) { }

  getArtistInformation(email: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardHassan2/personal-information/${email}`);
  }

  createNewDemandeAwardHassan2(demandeData: any) {
    return this.http.post<String>(`${ENV["backend-api-base-url"]}/awardHassan2/personal-information/add-update-information`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getCategoriesAward(refAwardType: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardHassan2/award-categories/${refAwardType}`);
  }

  addNewDemandeAwardHassan2(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardHassan2/add-demand/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getManuscriptType() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardHassan2/manuscrit-type`);
  }

  addManuscritInfromation(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardHassan2/add-demand/add-manuscript-information/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  uploadDocument(refObject: String, refParent: String, documentType: String, file: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/documents/?refObject=${refObject}&refParent=${refParent}&documentType=${documentType}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getDocuments(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/${refArtistAccount}/documentsPersonal`);
  }

  getDemandsByref(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardHassan2/priceDemandList/${refArtistAccount}`);
  }

  getAllDemands() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardHassan2/priceDemandList`);
  }
}
