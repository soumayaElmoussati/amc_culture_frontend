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
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-admin-exposant',
  templateUrl: './admin-exposant.component.html',
  styleUrls: ['./admin-exposant.component.scss']
})
export class AdminExposantComponent implements OnInit {


  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

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


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.typesStand = STAND_TYPES;
    this.superficies = SUPERFICIES;
    this.modesPaiement = MODES_PAIEMENT;
    this.showTableLoader = true;

      this.sielService.getList("VALID_SUBSCRIPTION", 0, 5).subscribe((res)=>{
        if(res["content"].length > 0){
          this.tmpRequestsList = res["content"].map(item=>{
            if(item.status == "PENDING"){
              item.statusView = "En cours";
            }else if(item.status == "REJECTED"){
              item.statusView = "Rejeté";
            }else{
              item.statusView = "Accepté";
            }

            item.hallClass = this.typesStand.filter((i)=>i.id == item.hallClass)[0].name;

            return item;
          });
        }
        this.showTableLoader = false;
      }, (err)=>{
        this.showTableLoader = false;
      });

  }

  openXlModal(content, exposedProdsList, refDemande) {

    this.sielService.getProduitsExposesDemande(refDemande).subscribe((response)=>{
      this.exposedProducts = response;
      this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      }).catch((res) => {});
    }, (err)=>{})


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


  openConfirmValidateDemande(content, ref) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.sielService.changeDemandeStatus(ref, "ACCEPTED").subscribe((response)=>{
          this.tmpRequestsList.map((item)=>{
            if(item.refExhibitor == ref){
              item.status = "ACCEPTED";
            }
          })
          Swal.fire(
            {
              position: 'center',
              title: 'Demande approuvée avec succès',
              text: '',
              showConfirmButton: false,
              timer: 2000,
              icon: 'success'
            }
          ).then(()=>{
          });
        }, (error)=>{
          this.snackBar.open("Une erreur s'est produit", "fermer");
          // this.tmpRequestsList.map((item)=>{
          //   if(item.refExhibitor == ref){
          //     item.status = "ACCEPTED";
          //   }
          // })
          // Swal.fire(
          //   {
          //     position: 'center',
          //     title: 'Demande approuvée avec succès',
          //     text: '',
          //     showConfirmButton: false,
          //     timer: 2000,
          //     icon: 'success'
          //   }
          // ).then(()=>{
          //   this.wizardForm.goToNextStep();
          // });
        });
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
