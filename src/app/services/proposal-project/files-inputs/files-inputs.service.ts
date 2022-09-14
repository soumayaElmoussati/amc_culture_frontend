import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesInputsService {

  constructor(){ }

  getFilesInputsBySousDomain(ref:any){

    return JSON.parse('{"Files":[],"Files3":["copiesLegaliserPartic"],"GeneralInfo":[{"label":"Titreprojet","entity":"projectName","type":"text"},{"label":"Typeprojetchanson","entity":"projectType","type":"text"},{"label":"Nombrechansonsmorceaux","entity":"numDancesOrSongs","type":"number"},{"label":"Titrechansonmorceaumusical","entity":"projectTitle","type":"text"},{"label":"durée__","entity":"durationTime","type":"text"},{"label":"Noml_auteurcompositeur","entity":"projectDescription","type":"text"},{"label":"Nom_compositeurinstrumenteaux","entity":"albumTitle","type":"text"},{"label":"budget_estimé","entity":"projectCost","type":"number"}]}');
    return JSON.parse(
      '{"Files":["devis_s_lenseme","Estimationprojetfinanciere","Copecartedidentiténationale_residence","Spécimenchèqueporteur_attestation","Déclarationlhonneurlégalisée","Dossierartistiquereprésentatif","Copieslégaliséessociétésdistributionmusique","VideoProjet__t__MP4"],"Files3":["copiesLegaliserPartic","copesCarteProfessionnel","CurriculumVitae"],"GeneralInfo":[{"label":"Titreprojet","entity":"projectName","type":"text"},{"label":"Typeprojetballet","entity":"projectType","type":"text"},{"label":"Nombredanses2","entity":"numDancesOrSongs","type":"number"},{"label":"synopsisprojet","entity":"projectTitle","type":"text"},{"label":"durée__","entity":"durationTime","type":"text"},{"label":"Nomscenographedécorateur","entity":"projectDescription","type":"text"},{"label":"Nom_compositeurinstrumenteaux","entity":"albumTitle","type":"text"},{"label":"budget_estimé","entity":"projectCost","type":"number"}]}'
      );
    return JSON.parse('{"Files":["Planpromotionprojetsoutenu","Estimationprojetfinanciere","Copecartedidentiténationale_residence","Spécimenchèqueporteur_attestation","Fournir5attestationsthéâtrale","Programmationreprésentations_théâtrale","FicheTechniquePcommunication_distribution"],"Files3":["copiesLegaliserPartic","copesCarteProfessionnel","CurriculumVitae"],"GeneralInfo":[{"label":"SubElpiece","entity":"projectName","type":"text"}]}');
  }
}
