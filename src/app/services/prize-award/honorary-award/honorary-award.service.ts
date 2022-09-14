import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENV } from "../../../../env";

@Injectable({
  providedIn: 'root'
})
export class HonoraryAwardService {

  constructor(private http: HttpClient) { }

  createNewDemandeAwardHonorary(demandeData: any) {
    return this.http.post<String>(`${ENV["backend-api-base-url"]}/honoraryAward/demand/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getDemandsByref(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/honoraryAward/priceDemandList/${refArtistAccount}`);
  }

  getAllDemands() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/honoraryAward/priceDemandList`);
  }
}
