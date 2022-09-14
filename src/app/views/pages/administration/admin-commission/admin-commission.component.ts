import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../../services/language/language.service";
import {TYPES_COMMISSION} from "../../../../lists/typesCommission";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {SielService} from "../../../../services/siel/administration/siel.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-commission',
  templateUrl: './admin-commission.component.html',
  styleUrls: ['./admin-commission.component.scss']
})

export class AdminCommissionComponent implements OnInit {

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('publicationsExhibitor') publicationsExhibitor;



  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;

  typesCommission = [];
  membresCommission = [];
  planningCommission = [];

  exhibitors = [];
  exhibitorsPublications = [];
  membres = [];

  showStepTitles:Boolean;

  isMobile:Boolean;

  selectedDialCode = "+212";



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

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private sielService: SielService) {
    window.addEventListener("resize", ()=>{
      if(document.documentElement.clientWidth <= 720){
        this.showStepTitles = false;
        this.isMobile = true;
      }else{
        this.showStepTitles = true;
        this.isMobile = false;
      }
    });
  }

  get form1() {
    return this.validationForm1.controls;
  }
  get form2() {
    return this.validationForm2.controls;
  }
  get form3() {
    return this.validationForm3.controls;
  }

  ngOnInit(): void {
    this.sielService.getCommissionsMembers().subscribe((response)=>{
      this.membres = response;
    }, (error)=>{
      this.snackBar.open("Impossible de récupérer les membres de commissions", "fermer");
    });
    this.sielService.getListeExposants("ACCEPTED", 0, this.exhibitorsPagination.numItemsPerPage).subscribe((response)=>{
      console.log(response);
      this.exhibitorsPagination.collectionSize = response["pageDetails"]["totalPages"];
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
    this.showStepTitles = true;
    this.typesCommission = TYPES_COMMISSION;

    if(window.navigator.userAgent.toLowerCase().includes("mobi")){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

    this.validationForm1 = this.formBuilder.group({
      dateDebut : ['', Validators.required],
      dateFin : ['', Validators.required],
      typeCommission : ['', Validators.required],
      exposantRef : ['']
    });
    this.validationForm2 = this.formBuilder.group({
      datePlanning : ['', Validators.required],
      heureDebut : ['', Validators.required],
      heureFin : ['', Validators.required],
    });

    this.validationForm3 = this.formBuilder.group({
      cin : ['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      sexe : ['H', Validators.required],
      email : ['', Validators.required],
      numeroTelephone : ['', Validators.required],
      login : ['', Validators.required],
  });

  }

  exhibitorsPaginationChange(e){
    this.exhibitorsPublications = [];
    this.sielService.getListeExposants("ACCEPTED", e-1, this.exhibitorsPagination.numItemsPerPage).subscribe((response)=>{
      console.log(response);
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
  }

    publicationsPaginationChange(e){
    this.exhibitorsPublications = [];
    this.sielService.getExposantPublications(this.publicationsPagination.refExhibitor, "PENDING", e-1, this.publicationsPagination.numItemsPerPage).subscribe((response)=>{
      console.log(response);
      this.exhibitorsPublications = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les publications", "fermer");
    });
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

  openConfirmPlanningItemAdd(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.planningCommission.push({id : (this.planningCommission.length == 0) ? 1 : this.planningCommission.length , ...this.validationForm2.value});
        this.clearForm2();
      }
    }).catch((res) => {});
  }

  openConfirmMembreCommissioItemAdd(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        if(this.validationForm3.valid){
          this.membresCommission.push({id : (this.membresCommission.length == 0) ?1 :this.membresCommission.length+1 , ...this.validationForm3.value});
          this.clearForm3();
        }
      }
    }).catch((res) => {});
  }

  openConfirmListPlanningsDelete(content, index) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.planningCommission = this.planningCommission.filter((item, i)=>(i != index && item));
      }
    }).catch((res) => {

    });
  }

  openConfirmListMembresCommissionDelete(content, index) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.membresCommission = this.membresCommission.filter((item, i)=>(i != index && item));
      }
    }).catch((res) => {

    });
  }

  openPublicationsPopUp(content) {
    this.modalService.open(content, {centered: true, size : 'xl'}).result.then((result) => {
      if(result == "save"){
      }
    }).catch((res) => {

    });
  }

    form1Submit(){
    if(this.validationForm1.valid){
      this.wizardForm.goToNextStep();
    }
    this.isForm1Submitted = true;

  }

  form2Submit(){
    if(this.validationForm1.valid){
      if(this.planningCommission.length > 0){
        let plannings = [];
        this.planningCommission.map((item)=>{
          plannings.push({
            "planningDate" : item.datePlanning,
            "startedTime" : item.heureDebut,
            "endTime" : item.heureFin
          });
        })
        let commissionData = {
          "commissionType": this.validationForm1.get("typeCommission").value,
          "startedDate": this.validationForm1.get("dateDebut").value,
          "endDate": this.validationForm1.get("dateFin").value,
          "plannings" : plannings
        }
        this.sielService.createNewCommission(commissionData).subscribe((response)=>{
          localStorage.setItem("lastCreatedCommission", response.refCommission);
          Swal.fire(
            {
              position: 'center',
              title: 'Commission créée avec succès',
              text: '',
              showConfirmButton: false,
              // timer: 10,
              icon: 'success'
            }
          ).then(()=>{
            this.wizardForm.goToNextStep();
          });
        }, (err)=>{
          this.snackBar.open("Une erreur s'est produit", "fermer");
        });
      }else{
        this.snackBar.open("Veuillez ajouter un planning", "fermer");
      }
    }else{
      this.wizardForm.goToPreviousStep();
      this.isForm1Submitted = true;
    }
    this.isForm2Submitted = true;
  }

  addCommissionMembersCommission(){
    if(this.validationForm1.valid && this.planningCommission.length > 0 && localStorage.getItem("lastCreatedCommission")){
      if(this.membresCommission.length > 0){
        let membres = this.membresCommission.map((item)=>{
          return {
            cin: item.cin,
            firstName: item.prenom,
            lastName: item.nom,
            gender: item.sexe,
            email: item.email,
            phoneNumber: item.numeroTelephone,
            "login": item.login
          };
        });
        this.sielService.addMembersToCommission(localStorage.getItem("lastCreatedCommission"), membres).subscribe((response)=>{
          Swal.fire(
            {
              position: 'center',
              title: 'Membres de commission ajoutés avec succès',
              text: '',
              showConfirmButton: false,
              // timer: 10,
              icon: 'success'
            }
          ).then(()=>{
            this.wizardForm.goToNextStep();
          });
          localStorage.removeItem("lastCreatedCommission");
          this.clearForm1();
          this.clearForm2();
          this.clearForm3();
          this.planningCommission = [];
          this.membresCommission = [];
          this.wizardForm.goToStep(0);
        },(error)=>{
          this.snackBar.open("Une erreur s'est produit", "fermer");
        })
      }else{
        this.snackBar.open("Veuillez ajouter un membre de commission", "fermer");
        this.isForm3Submitted = true;
      }
    }else{
      this.snackBar.open("Veuillez remplir les deux premières étapes", "fermer");
    }
  }

  form3Submit(){
    if(this.validationForm3.valid){
      this.membresCommission.push({id : (this.membresCommission.length == 0) ?1 :this.membresCommission.length+1 , ...this.validationForm3.value});
    }
    this.isForm3Submitted = true;
  }

  addPlanning(content){
    if(this.validationForm2.valid){
      this.openConfirmPlanningItemAdd(content);
    }
    this.isForm2Submitted = true;
  }

  addMembreCommission(content){
    if(this.validationForm3.valid){
      this.openConfirmMembreCommissioItemAdd(content);
    }
    this.isForm3Submitted = true;
  }

  addRemovePublication(e, item){
    console.log(e.checked);
    console.log(e.target.checked);
    console.log(item);
  }

  getCommissionPlannings(){
    let commissionRef = localStorage.getItem("lastCreatedCommission");
    this.sielService.getCommission(commissionRef).subscribe((response)=>{
      console.log(response);
    }, (err)=>{
      console.log(err);
    });
  }

  clearForm1(){
    this.validationForm1.patchValue({
      dateDebut : '',
      dateFin : '',
      typeCommission : ''
    });
  }

  clearForm2(){
    this.validationForm2.patchValue({
      datePlanning : '',
      heureDebut : '',
      heureFin : '',
    });
  }
  clearForm3(){
    this.validationForm3.patchValue({
      cin : '',
      nom : '',
      prenom : '',
      sexe : 'H',
      email : '',
      numeroTelephone : '',
      login : '',
    })
  }

}
