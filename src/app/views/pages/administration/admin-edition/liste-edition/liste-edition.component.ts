import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import { DOCUMENT } from '@angular/common';
import {STAND_TYPES} from "../../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../../lists/modePaiement";




@Component({
  selector: 'app-liste-edition',
  templateUrl: './liste-edition.component.html',
  styleUrls: ['./liste-edition.component.scss']
})
export class ListeEditionComponent implements OnInit {


  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  stepperOrientation: Observable<StepperOrientation>;
  editionsList = [];
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


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.typesStand = STAND_TYPES;
    this.superficies = SUPERFICIES;
    this.modesPaiement = MODES_PAIEMENT;
    this.showTableLoader = true;

      this.sielService.getListEditions().subscribe((res)=>{
        if(res.length > 0){
          this.editionsList = res;
        }
        this.showTableLoader = false;
      }, (err)=>{
        this.showTableLoader = false;
      });

  }

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
    let newList = this.editionsList;
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
    this.editionsList = newList;
  }

  modifyInfoStandv2(superficie, type, modePaiement, id){
    let newList = this.editionsList;
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
    this.editionsList = newList;
    this.newInfosStand.superficie = null;
    this.newInfosStand.type = null;
    this.newInfosStand.modePaiement = null;
    this.newInfosStand.itemId = null;
  }

}
