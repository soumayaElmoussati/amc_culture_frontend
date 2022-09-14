import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from '../../../../services/siel/exposant/siel.service';
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';
import { ExhibitorView } from 'src/app/entities/sielView/ExhibitorView';
import { PASSPORTS_TYPE } from 'src/app/lists/passportsType';
import { COUNTRIES } from 'src/app/lists/countries';
import { BRANCHES } from 'src/app/lists/branches';
import { LIEUX_ACTIVITES } from 'src/app/lists/lieuxActivitee';
import { PRODUITS_EXPOSES } from 'src/app/lists/produitsExposes';
import { PageablePublications } from 'src/app/entities/sielView/PageablePublications';
import { PageDetails } from 'src/app/entities/sielView/PageDetails';
import { StandView } from 'src/app/entities/sielView/StandView';
import { PageableProposal } from 'src/app/entities/sielView/PageableProposal';
import { PageablePublisher } from 'src/app/entities/sielView/PageablePublisher';

@Component({
  selector: 'app-exposant-recap',
  templateUrl: './exposant-recap.component.html',
  styleUrls: ['./exposant-recap.component.scss']
})
export class ExposantRecapComponent implements OnInit {


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
     private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService,
      private router: Router,private activatedRoute: ActivatedRoute, public languageService:LanguageService) {

  }
  typesStand = [];
  superficies = [];
  modesPaiement = [];
  passportsType = [];
  countries = [];
  branches=[];
  lieusActivitee=[];
  prodsExposes=[];

  exhibitorsByEdition= [];
  selectedDialCodeF1="212";

  isMarocain = true;
  active=true;

  exhibitorDetail : ExhibitorView= new ExhibitorView();
  pageablePublication : PageablePublications = new PageablePublications();

  page : PageDetails = new PageDetails();
  standDetails:StandView = new StandView();

  pageActivities : PageDetails = new PageDetails();
  pageableActivities:PageableProposal = new PageableProposal();

  pagePublishers : PageDetails = new PageDetails();
  pageablePublishers : PageablePublisher = new PageablePublisher();

  refExposant;

  ngOnInit(): void {
    this.refExposant=this.activatedRoute.snapshot.params.refExposant
    this.passportsType=PASSPORTS_TYPE;
    this.countries = COUNTRIES;
    this.superficies = SUPERFICIES;
    this.typesStand = STAND_TYPES;
    this.branches = BRANCHES;
    this.modesPaiement = MODES_PAIEMENT;
    this.lieusActivitee = LIEUX_ACTIVITES;
    this.prodsExposes = PRODUITS_EXPOSES;
    this.getAllDataInformations(this.refExposant);
    //EXHB_AMC_000000001
  }


  getAllDataInformations(refExhibitor){

    this.sielService.getBookingStand(refExhibitor).subscribe((response)=>{
      this.standDetails=response;
      this.standDetails.category=Number(response.category);
    });
    this.sielService.getEditeursRepresentesDetails(refExhibitor,0,10).subscribe((response)=>{
      this.pageablePublishers.publishers=response["content"];
      this.pagePublishers=response["pageDetails"];
    });
    this.sielService.getProposedActivitiesDetails(refExhibitor,0,10).subscribe((response)=>{
      this.pageableActivities.activities=response["content"];
      this.pageActivities=response["pageDetails"];
    });
    this.sielService.getInfoDemandePublication(refExhibitor).subscribe((response)=>{
      this.exhibitorDetail=response;
      this.exhibitorDetail.activityBranches = this.getLabelsForBranches( this.exhibitorDetail.activityBranches);
      this.exhibitorDetail.presentedMateriels = this.getLabelsForMatriel(this.exhibitorDetail.presentedMateriels);
      this.isMarocain = this.exhibitorDetail.country=='MA';
      this.getPhoneCode(this.exhibitorDetail.country);
    });
    this.sielService.getExposantPublicationsDetails(refExhibitor,'',0,10).subscribe((response)=>{
      this.pageablePublication.publications=response["content"];
      this.page=response["pageDetails"];
    });


  }

  exhibitorsPaginationChange(e){
    this.sielService.getExposantPublicationsDetails(this.refExposant,'',e-1,this.page.numberOfElements).subscribe((response)=>{
      this.pageablePublication.publications=response["content"];
      //this.pageablePublication.page=response["pageDetails"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les publications", "fermer");
    });
  }

  activitiesPaginationChange(e){
    this.sielService.getProposedActivitiesDetails(this.refExposant,e-1,this.pageActivities.numberOfElements).subscribe((response)=>{
      this.pageableActivities.activities=response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les activiter", "fermer");
    });
  }

  publishePaginationChange(e){
    this.sielService.getEditeursRepresentesDetails(this.refExposant,e-1,this.pagePublishers.numberOfElements).subscribe((response)=>{
      this.pageablePublishers.publishers=response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les editeurs", "fermer");
    });
  }




  getLabelsForBranches(branches){
    let labels=[];

    branches.forEach((item)=>{
      let br =this.branches.filter(ele=>ele.id==item);
      labels.push(br[0].name);
    });
    return labels;
  }

  getLabelsForMatriel(materials){
    let labels=[];

    materials.forEach((item)=>{
      let br =this.prodsExposes.filter(ele=>ele.id==item);
      labels.push(br[0].name);
    });
    return labels;
  }

  getPhoneCode(code){
    let dialCode = this.countries.filter((item)=>(item.alpha2Code == code));
    this.selectedDialCodeF1 = dialCode[0].callingCodes[0];
  }

  displayPhoneNumber(phone){
    let mask ;
  }

  backToList(){
    this.router.navigate(['administration/admin-liste-demandes']);

  }
}
