import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "../../../../env";


@Injectable({
  providedIn: 'root'
})
export class TheaterAwardService {

  constructor(private http: HttpClient) { }


  createDemand(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardTheater/demand`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  addParticipant(demandeData: any) {
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/awardTheater/demand/add-participants`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getParticipants(refTheaterPiece: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardTheater/${refTheaterPiece}/participants`);
  }

  getRoles() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardTheater/roles-Theater`);
  }

  getDemandsByref(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardTheater/priceDemandList/${refArtistAccount}`);
  }

  getAllDemands() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/awardTheater/priceDemandLists`);
  }


}

