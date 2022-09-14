import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GroupeScolaire } from 'src/app/views/pages/groupe-scolaire/groupe-scolaire.component';
import {ENV} from "../../../../env";
import {GROUPE_SCOLAIRE} from "../../../entities/GroupeScolaireResponse";
import {NewSielRequestResponse} from "../../../entities/NewSielRequestResponse";
import {ModifyPublicationSielResponse} from "../../../entities/ModifyPublicationSielResponse";
import { PageablePublications } from 'src/app/entities/sielView/PageablePublications';
import { PageableProposal } from 'src/app/entities/sielView/PageableProposal';
import { PageablePublisher } from 'src/app/entities/sielView/PageablePublisher';
import { ExhibitorView } from 'src/app/entities/sielView/ExhibitorView';
import { DocumentView } from 'src/app/entities/sharedView/document-view';


@Injectable({
  providedIn: 'root'
})
export class SielService {

  constructor(private http:HttpClient) { }

  createNewDemande(demandeData:any){
    return this.http.post<NewSielRequestResponse>(`${ENV["backend-api-base-url"]}/siel/exhibitors/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  createAccount(user,refobject){
    let account ={
      "login": refobject,
      "password": "string",
      "email": user,
      "phoneNumber": "string",
      "mail":true,
    }
    console.log(account)
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/account/subscription`, account, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  checkUpdateExibitor(email){
    return this.http.get<ExhibitorView>(`${ENV['backend-api-base-url']}/siel/exhibitors/check/${email}`);
  }
  updateDemande(demandeData:any){
    return this.http.put<NewSielRequestResponse>(`${ENV["backend-api-base-url"]}/siel/exhibitors/`, demandeData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  modifyPublication(publicationData:any, ref:any){
    return this.http.put<ModifyPublicationSielResponse[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/publications/`, publicationData, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateEditeursRepresentes(editeursRepresentes:any, ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/publishers-represented/`, editeursRepresentes, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  updateEditeursRepresentesAdapted(editeursRepresentes:any, ref:any){
    let toSendFinal = [...editeursRepresentes];
    editeursRepresentes.forEach((d,index)=>{
      if(d.photoScanned!=null&&d.photoScanned!=undefined)
      {
        let formData = new FormData();
        formData.append('documentType', d.photoScanned.documentType);
        formData.append('file', d.photoScanned.file);
        toSendFinal[index]["photoScanned"]=formData;
      }
    });
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/publishers-represented/adapted`, toSendFinal);
  }

  addEditeurRepresente(editeurRepresente:any, ref:any){
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/publishers-represented/`, editeurRepresente, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  modifyEditeurRepresente(editeurRepresente:any, ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/publishers-represented/`, [editeurRepresente], {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  addActivitesProposees(activitesProposes:any, ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/activities-proposal/`, activitesProposes, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  // modifyActiviteProposee
  addActiviteProposee(activitePropose:any, ref:any){
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/activities-proposal/`, activitePropose, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  modifyActiviteProposee(activitePropose:any, ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/activities-proposal/`, [activitePropose], {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }

  addForeignRepreseted(activitePropose:any, ref:any){
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/foreign-represented/`, activitePropose, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
  modifyForeignRepreseted(data:any, ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/foreign-represented/${data.refForeignRepresented}`, data, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }


  getBookingStand(ref:any){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/booking-stand`);
  }

  bookStand(infoStand:any, ref:any){
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/booking-stand`, infoStand, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }
    modifyBookStand(infoStand:any, ref:any, refStand:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/booking-stand/${refStand}`, infoStand, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }


  groupeScolaire(groupeScolaireData:any){
    return this.http.post<GroupeScolaire>(`${ENV["backend-api-base-url"]}/siel/booking-schools/`, groupeScolaireData, {headers : new HttpHeaders().set('Content-type', 'application/json')});
  }

  getInfoDemandePublication(ref){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}`);
  }


  getEditeursRepresentes(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publishers-represented`);
  }

  publisherResponseMapper(response:any[])
  {
    let list=[];
    response.forEach(d=>{
        list.push({
          refPublisherRepresented:d.refPublisherRepresented,
          nomMaisonEdition:d?.name,
          pays:d?.country,
          email:d?.email,
          telephone:d?.phoneNumber,
          responsable:d?.responsibleName,
          fax:d?.fax,
          adresse:d?.address,
          siteWeb:d?.webSite,
          specialite:d?.specialization,
          nbrEditionsAutreLangues:d?.numberForeignPublishing,
          img:null
        });
    });
    return list;
  }

  getPublications(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publications`);
  }

  getExposantPublications(ref:any, statusEnum:any, page:any, size:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publications?statusEnum=${statusEnum}&page=${page}&size=${size}`);
  }

  getExposantPublicationsDetails(ref:any, statusEnum:any, page:any, size:any){
    return this.http.get<PageablePublications>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/publications?statusEnum=${statusEnum}&page=${page}&size=${size}`);
  }

  getEditeursRepresentesDetails(refExhibitor: any, page: number, size: number) {
    return this.http.get<PageablePublisher>(`${ENV['backend-api-base-url']}/siel/exhibitors/${refExhibitor}/publishers-represented/?page=${page}&size=${size}`);
  }
  getProposedActivitiesDetails(refExhibitor: any, page: number, size: number) {
    return this.http.get<PageableProposal>(`${ENV['backend-api-base-url']}/siel/exhibitors/${refExhibitor}/activities-proposal/?page=${page}&size=${size}`);
  }
  deleteProposedActivity(refExhibitor: any,refActivityProposal:any) {
    return this.http.delete<PageableProposal>(`${ENV['backend-api-base-url']}/siel/exhibitors/${refExhibitor}/activities-proposal/${refActivityProposal}`);
  }
  getProposedActivities(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/activities-proposal`);
  }

  getListEditions(){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/editions/`);
  }
  deleteForeigenR(refExhibitor: any,refActivityProposal:any) {
    return this.http.delete<PageableProposal>(`${ENV['backend-api-base-url']}/siel/exhibitors/${refExhibitor}/foreign-represented/${refActivityProposal}`);
  }

  getForeigenRepresented(ref:any){
    return this.http.get<any[]>(`${ENV['backend-api-base-url']}/siel/exhibitors/${ref}/foreign-represented/`);
  }

  storeDoc(data:any){
    const formData = new FormData();
    formData.append('documentType', data.documentType);
    formData.append('refObject', data.refObject);
    if(data["refParent"]!=null||data["refParent"]!=undefined)
      formData.append('refParent', data.refParent);
    formData.append('file', data.file);
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/documents/`, formData);
  }
  updateDoc(data:any){
    const formData = new FormData();
    formData.append('file', data.file);
    return this.http.put(`${ENV["backend-api-base-url"]}/documents/${data.refDocument}`, formData,{ responseType: 'text' });
  }
  getAllDocs(refObject:string){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/documents/${refObject}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
  }


  validerDemande(ref:any){
    return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${ref}/validate-subscription/`, {});
  }

  checkPublicationsFileErrors(ref:any, file:any){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/documents/${ref}/exhibitors`, formData);
  }

  getRecapDemande(data:any){
    return this.http.post(`${ENV["backend-api-base-url"]}/documents/generate-request-participation/`,
    data, { responseType: 'blob' });
  }

  getRecapDemande2(data:any){
    return this.http.post(`${ENV["backend-api-base-url"]}/documents/generate-request-participation2/`,
    data, { responseType: 'blob' });
  }

  getRecapStand(data:any){
    return this.http.post(`${ENV["backend-api-base-url"]}/documents/generate-bon-commande`, data, { responseType: 'blob' });
  }
  getRefExposant(userEmail){
    return this.http.get<String>(`${ENV['backend-api-base-url']}/account/get-user-data/${userEmail}`);
  }


  verifierEditionDispo(){
    return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/editions/open-subscription`);
  }

  getDocsByRf(ref){
    return this.http.get<any>(`${ENV['backend-api-base-url']}/documents/${ref}`, {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    });
}

getDocByDocRef(docRef){
  return this.http.get<any>(`${ENV['backend-api-base-url']}/documents/${docRef}/visualizeDocument`, {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    responseType: 'blob' as 'json'
  });
}

getExhibitorsPublicationByEdition(refExhibitor){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/edition-publications`);
}

getPublicationsByExhibitorByEdition(refExhibitor, refEdition,page, size){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/editions/${refEdition}/exhibitors/${refExhibitor}?page=${page}&size=${size}`);
}

getExhibitorByEdition(refEdition,country,page, size){
  return this.http.get<any>(`${ENV["backend-api-base-url"]}/siel/editions/${refEdition}/exhibitors?country=${country}&page=${page}&size=${size}`);
}

updatePublication(refExhibitor:string,refPublication:string,data){
  return this.http.put<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications/${refPublication}`, data);

}

deletePublication(refExhibitor:string,refPublication:string){
  return this.http.delete<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications/${refPublication}`);

}
createPublication(refExhibitor:string,data){
  console.log(data['isbn'])
  return this.http.post<any[]>(`${ENV["backend-api-base-url"]}/siel/exhibitors/${refExhibitor}/publications`, data);
}

getModelPublication(){
  return this.http.get<any>(`${ENV['backend-api-base-url']}/siel/download/publication-model`, {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
    responseType: 'blob' as 'json'
  });
}
checkDocumentExistance(refExibitor:string)
{
  return this.http.get<DocumentView[]>(`${ENV["backend-api-base-url"]}/documents/parent/${refExibitor}`);
}


}
