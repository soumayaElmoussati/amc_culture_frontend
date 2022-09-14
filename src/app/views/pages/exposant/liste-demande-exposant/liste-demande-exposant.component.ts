import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from 'src/app/services/siel/exposant/siel.service';
import { DOCUMENT } from '@angular/common';
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import { Router } from '@angular/router';




@Component({
  selector: 'app-liste-demande-exposant',
  templateUrl: './liste-demande-exposant.component.html',
  styleUrls: ['./liste-demande-exposant.component.scss']
})
export class ListeDemandeExposantComponent implements OnInit {


  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('bonCommande', {static : true}) BonCommande;

  stepperOrientation: Observable<StepperOrientation>;
  tmpRequestsList = [];
  totalLength:any;
  p:number = 1;
  showTableLoader = false;
  exposedProducts = [];
  typesStand = [];
  superficies = [];
  modesPaiement = [];
  infosStand = {
    type : null,
    superficie : null
  }

  newInfosStand = {
    itemId : null,
    type : null,
    superficie : null,
    modePaiement : null
  }

  selectedListItem = null;

  active = 1;


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService, @Inject(DOCUMENT) private document: Document, private router: Router) {

  }

  ngOnInit(): void {
    this.typesStand = STAND_TYPES;
    this.superficies = SUPERFICIES;
    this.modesPaiement = MODES_PAIEMENT;
    this.showTableLoader = true;

      this.sielService.getInfoDemandePublication('EXHB_AMC_000000001').subscribe((res)=>{
        let resultList = [];
        resultList.push(res);
        this.tmpRequestsList = resultList.map(item=>{
          if(item.status == "PENDING"){
            item.statusView = "En cours";
          }else if(item.status == "REJECTED"){
            item.statusView = "Rejeté";
          }else{
            item.statusView = "Accepté";
          }

          item.hallClassTxt = this.typesStand.filter((i)=>i.id == item.hallClass)[0].name;

          return item;
        });
        // if(res.length > 0){
        //   console.log(res);
        //   this.tmpRequestsList = res;
        // }
        this.showTableLoader = false;
      }, (err)=>{
        this.showTableLoader = false;
      });

  }

  openBonCommande(){
    this.modalService.open(this.BonCommande, {centered: true,}).result.then((result) => {
      if(result == "save"){
      }
    }).catch((res) => {
    });
  }

  handleFileRecapStandDataInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#recapStandDataFile + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
    }
  }

  openFileRecapStandDataBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#recapStandDataFile") as HTMLElement;
    element.click();
  }

  goToEditPage(req){
    console.log(req);
    this.router.navigate(['/exposant/modification-demande', req.refExhibitor], {queryParams : req});
  }

  // openXlModal(content, exposedProdsList, refDemande) {

  //   this.sielService.getProduitsExposesDemande(refDemande).subscribe((response)=>{
  //     this.exposedProducts = response;
  //     this.modalService.open(content, {size: 'xl'}).result.then((result) => {
  //     }).catch((res) => {});
  //   }, (err)=>{})


  // }

  openLgModal(content, type, superficie, id) {
    this.newInfosStand.itemId = id;
    this.infosStand.type = type;
    this.infosStand.superficie = superficie;
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      if(type != null || superficie != null){
        this.modifyInfoStand(this.newInfosStand.superficie, this.newInfosStand.type, id);
      }
      this.newInfosStand.superficie = null;
      this.newInfosStand.type = null;
      this.newInfosStand.itemId = null;
    }).catch((res) => {});
  }

  openLgModalv2() {
    if(this.newInfosStand.type != null || this.newInfosStand.superficie != null || this.newInfosStand.modePaiement != null){
      this.modifyInfoStandv2(this.newInfosStand.superficie, this.newInfosStand.type, this.newInfosStand.modePaiement, this.selectedListItem);
    }

  }

  openRecapDemande(content, id) {
    this.selectedListItem = id;
    this.modalService.open(content, {size: 'xl', scrollable : true,centered : true}).result.then((result) => {
    }).catch((res) => {});
  }


  openConfirmValidateDemande(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
      }
    }).catch((res) => {

    });
  }

  changeNewTypeStand(e){
    this.newInfosStand.type = e;
  }
  changeNewSuperficieStand(e){
    this.newInfosStand.superficie = e;
  }
  changeModePaiementStand(e){
    this.newInfosStand.modePaiement = e;
  }

  modifyInfoStand(superficie, type, id){
    let newList = this.tmpRequestsList;
    newList.forEach((item)=>{
      if(item.id == id){
        if(type != null){
          item.categorieStand = type;
        }
        if(superficie != null){
          item.superficieStand = superficie;
        }
      }
    });
    this.tmpRequestsList = newList;
  }

  modifyInfoStandv2(superficie, type, modePaiement, id){
    let newList = this.tmpRequestsList;
    newList.forEach((item)=>{
      if(item.id == id){
        if(type != null){
          item.categorieStand = type;
        }
        if(superficie != null){
          item.superficieStand = superficie;
        }
        if(modePaiement != null){
          item.modePaiement = modePaiement;
        }
      }
    });
    this.tmpRequestsList = newList;
    this.newInfosStand.superficie = null;
    this.newInfosStand.type = null;
    this.newInfosStand.modePaiement = null;
    this.newInfosStand.itemId = null;
  }

}
