import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "../../../../env";

@Injectable({
  providedIn: 'root'
})
export class BookAwardService {

  constructor(private http: HttpClient) { }

  createNewDemandeAwardBook(demandeData: any) {
    return this.http.post<String>(`${ENV["backend-api-base-url"]}/awardBook/demand/add-artist`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getAllPublication(refArtist: String) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/demand/books?author=${refArtist}`);
  }

  addPublicationInformation(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardBook/demand/add-publication`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getAllAwardsObtained(refArtist: String) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/demand/awards?author=${refArtist}`);
  }

  addAwardObtained(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardBook/demand/add-award`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  addBookPrice(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardBook/add-book/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }


  getCategoriesAward(refAwardType: String) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/award-categories/${refAwardType}`);
  }


  createDemand(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardBook/create-demand/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getDemandsByref(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/priceDemandList/${refArtistAccount}`);
  }

  getAllDemands() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardBook/priceDemandList`);
  }

}



