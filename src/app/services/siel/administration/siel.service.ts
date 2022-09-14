import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListeDemandesExpoResponse } from 'src/app/entities/ListeDemandesExpoResponse';
import { NewCommissionResponse } from 'src/app/entities/NewCommissionResponse';
import { ENV } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class SielService {

  constructor(private http:HttpClient) { }

  createNewCommission(commissionData:any){
    console.log("commissions (POST)");
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/commissions/`, commissionData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  addMembersToCommission(commissionRef, members){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/commissions/${commissionRef}/members/`, members, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getProduitsExposesDemande(demandeRef){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/siel/exhibitors/${demandeRef}/publications`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getList(statut:any, page:any, size:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/?statusEnum=${statut}&page=${page}&size=${size}`);
  }

  getBookingStand(statut: string, page: number, size: number) {
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/bookings-stand/?statusEnum=${statut}&page=${page}&size=${size}`);
  }

  getInfoDemandePublication(ref){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}`);
  } 
  createEdition(editionData:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/siel/editions/`, editionData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  getListEditions(){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/editions/`);
  }

  getBookingSchool(statut, page, size){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/booking-schools/?statusEnum=${statut}&page=${page}&size=${size}`);
  }

  getEditeursRepresentes(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publishers-represented`);
  }

  getPublications(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publications`);
  }

  getProposedActivities(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/activities-proposal`);
  }

  changeDemandeStatus(ref:any, status:any){
    return this.http.put<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitor/update-status/${ref}?statusEnum=${status}`, {}, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  changeDemandeStatusBookingSchool(ref:any, status:any){
    return this.http.put<any[]>(`${ENV['backend-api-base-url']}/siel/booking_school/update-status/${ref}?statusEnum=${status}`, {}, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateBookingStand(refExhibitors: any, refBooking: any, stand: any) {
    console.log(refBooking+"-----"+refExhibitors)
    return this.http.put<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${refExhibitors}/booking-stand/${refBooking}`, stand, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    })
  }
  changeDemandeStatusBookingStand(ref:any, status:any){
    return this.http.put<any[]>(`${ENV['backend-api-base-url']}/siel/booking_stand/update-status/${ref}?statusEnum=${status}`, {}, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getListeExposants(statusEnum, page, size){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/?statusEnum=${statusEnum}&page=${page}&size=${size}`);
  }

  getListExposantsToBeValidated(page, size){ //exhibitors/validated
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/validated?page=${page}&size=${size}`);

  }
  getExposantPublications(ref:any, statusEnum:any, page:any, size:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publications?statusEnum=${statusEnum}&page=${page}&size=${size}`);
  }

  addPublicationsCommission(refCommission:any, refPlanning:any, publications:any){
    return this.http.put<any>(`${ENV['backend-api-base-url']}/commissions/${refCommission}/planning/${refPlanning}`, publications, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  sendMail(refEntity, refObject){
    return this.http.post<any>(`${ENV['backend-api-base-url']}/setting/template-notification/${refEntity}/send-mail/${refObject}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  getCommissions(){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/commissions/`);
  }

  getCommission(refCommission:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/commissions/${refCommission}/`);
  }

  getCommissionsMembers(){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/commissions/members/`);
  }

  votePublication(refCommission:any, refPlanning:any, data:any){
    return this.http.post<any>(`${ENV["backend-api-base-url"]}/commissions/${refCommission}/planning/${refPlanning}/vote`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }




}
