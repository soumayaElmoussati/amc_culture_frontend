import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../../services/language/language.service";
import {TYPES_COMMISSION} from "../../../../lists/typesCommission";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-admin-add-publications-planning',
  templateUrl: './admin-add-publications-planning.component.html',
  styleUrls: ['./admin-add-publications-planning.component.scss']
})

export class AdminAddPublicationPlanningComponent implements OnInit {


  @ViewChild('publicationsExhibitor') publicationsExhibitor;


  isFormSubmitted: Boolean;
  validationForm: FormGroup;
  exhibitors = [];
  planningsCommission = [];
  exhibitorsPublications = [];
  selectedPublications = [];
  exhibitorsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 2
  }
  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 2,
    refExhibitor : ''
  }

  commissions = [];

  showListeExposants = false;
  showListePlannings = false;
  commissionSelected = null;
  planningSelected = null;
  showAddStepLoader = false;

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private sielService: SielService) {

  }

  get form() {
    return this.validationForm.controls;
  }

  ngOnInit(): void {
    this.sielService.getCommissions().subscribe((response)=>{
      this.commissions = response;
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les commissions", "fermer");
    });

    this.sielService.getListeExposants("ACCEPTED", 0, this.exhibitorsPagination.numItemsPerPage).subscribe((response)=>{
      this.exhibitorsPagination.collectionSize = response["pageDetails"]["totalPages"];
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
  }

  setCommission(e, i){
    let radios = document.getElementsByClassName("radios");
    for (let i = 0; i < radios.length; i++) {
      let item = radios[i] as HTMLElement;
      item["checked"] = false;
    }
    e.target.checked = true;
    this.showListePlannings = true;
    this.planningsCommission = i.plannings;
    this.commissionSelected = i.refCommission;
    this.showListeExposants = false;
  }

  setPlanning(e, i){
    let radiosPln = document.getElementsByClassName("radiosPln");
    for (let i = 0; i < radiosPln.length; i++) {
      let item = radiosPln[i] as HTMLElement;
      item["checked"] = false;
      e.target.checked = true;
    }
    this.planningSelected = i.refPlanning;
    this.showListeExposants = true;
  }

  setExposant(e, i){
    let radiosExh = document.getElementsByClassName("radiosExh");
    for (let i = 0; i < radiosExh.length; i++) {
      let item = radiosExh[i] as HTMLElement;
      item["checked"] = false;
      e.target.checked = true;
    }
    this.getExhbitorPublications(i.refExhibitor);
  }

  getExhbitorPublications(ref){
    this.publicationsPagination.refExhibitor = ref;
    this.sielService.getExposantPublications(ref, "PENDING", 0, this.publicationsPagination.numItemsPerPage).subscribe((response)=>{
      this.exhibitorsPublications = response["content"];
      this.publicationsPagination.collectionSize = response["pageDetails"]["totalPages"];
      this.openPublicationsPopUp(this.publicationsExhibitor);
    }, (error)=>{
      this.snackBar.open("Une erreur s'est produit", "fermer");
    });
  }

  openPublicationsPopUp(content) {
    this.modalService.open(content, {centered: true, size : 'xl'}).result.then((result) => {
      if(result == "save"){
      }
    }).catch((res) => {

    });
  }

  exhibitorsPaginationChange(e){
    this.exhibitorsPublications = [];
    this.sielService.getListeExposants("ACCEPTED", e-1, this.exhibitorsPagination.numItemsPerPage).subscribe((response)=>{
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
  }
  publicationsPaginationChange(e){
    this.exhibitorsPublications = [];
    this.sielService.getExposantPublications(this.publicationsPagination.refExhibitor, "PENDING", e-1, this.publicationsPagination.numItemsPerPage).subscribe((response)=>{
      this.exhibitorsPublications = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les publications", "fermer");
    });
  }

  addPublication(pub){
    if(!(this.selectedPublications.filter(item=>item.refPublication == pub.refPublication).length > 0)){
      this.selectedPublications.push(pub);
    }
  }

  addPublicationsCommission(){
    if(this.selectedPublications.length > 0){
      let publicationsRefs = this.selectedPublications.map((item)=>item.refPublication);
      console.log(publicationsRefs);
      this.showAddStepLoader = true;
      this.sielService.addPublicationsCommission(this.commissionSelected, this.planningSelected, {refs : publicationsRefs}).subscribe((response)=>{
        this.showListeExposants = false;
        this.showListePlannings = false;
        let radios = document.getElementsByClassName("radios");
        for (let i = 0; i < radios.length; i++) {
          let item = radios[i] as HTMLElement;
          item["checked"] = false;
        }
        Swal.fire(
          {
            position: 'center',
            title: 'Publications ajoutés avec succès',
            text: '',
            showConfirmButton: false,
            timer: 2000,
            icon: 'success'
          }
        ).then(()=>{
        });
        this.showAddStepLoader = false;
      }, (error)=>{
        console.log(error);
        this.showAddStepLoader = false;
      })
    }else{
      this.snackBar.open("Veuillez choisir une séance de commission, un planning et des publications", "fermer");

    }
  }

}
