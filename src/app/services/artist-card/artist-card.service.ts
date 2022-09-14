import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistAccountCardResponse } from 'src/app/entities/ArtistAccountCardResponse';
import Step3DemandInformation from 'src/app/entities/artistCardView/Step3DemandInfo';
import Step4DemandCardForm from 'src/app/entities/artistCardView/Step4DemandCardForm';
import { AccountResponse } from 'src/app/entities/AuthenticatedAccount';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class ArtistCardService {

  constructor(private http: HttpClient) { }

  createArtistAccount(artistData: any) {
    return this.http.post<ArtistAccountCardResponse>(`${ENV["backend-api-base-url"]}/artist/demand/ArtistAccount`, artistData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateArtistAccount(artistData: any) {
    return this.http.put<ArtistAccountCardResponse>(`${ENV["backend-api-base-url"]}/artist/update/artistAccount`, artistData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  createDemandCard(demandeData: any, refArtistAccount) {
    return this.http.post<Step3DemandInformation>(`${ENV["backend-api-base-url"]}/artist/demand/${refArtistAccount}`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  updateDemandCard(Data3AtoSend: any) {
    return this.http.put<Step3DemandInformation>(`${ENV["backend-api-base-url"]}/artist/update/`, Data3AtoSend, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getAuthenticatedUser(email) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/artist/demand/getAccount/${email}`);
  }
  getDemandsByref(refArtistAccount: any) {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/artist/${refArtistAccount}/demand`, refArtistAccount);
  }
  getAllDemandsCard() {
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/artist/allDemands`);
  }

}
