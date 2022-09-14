import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from '../../../../services/siel/exposant/siel.service';
import { DOCUMENT } from '@angular/common';
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';




@Component({
  selector: 'app-historisation-exposant',
  templateUrl: './historisation-exposant.component.html',
  styleUrls: ['./historisation-exposant.component.scss']
})
export class HistorisationExposantComponent implements OnInit {



  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
     private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService,
      private router: Router,private route:ActivatedRoute, public languageService:LanguageService) {

  }
  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 2,
    refExhibitor : ''
  }
  isCollapsed = false;
  editions = [
    {name : "Edition un", isCollapsed : false},
    {name : "Edition deux", isCollapsed : false},
    {name : "Edition trois", isCollapsed : false},
  ];
  publicationsList = [
    {
      author : "author_test",
      title : "title_test",
      publisher : "publisher_test",
      publishingDate : "publishing_date_test",
      copiesNbr : "copies_nbr_test",
      amout : "prix_dh_test",
      speciality : "specialite_test",
      legalDeposit : "depot_legal_test",
      isbn : "isbn_test",
      colis : "colis_test",
      status : "En cours",
    },
    {
      author : "author_test",
      title : "title_test",
      publisher : "publisher_test",
      publishingDate : "publishing_date_test",
      copiesNbr : "copies_nbr_test",
      amout : "prix_dh_test",
      speciality : "specialite_test",
      legalDeposit : "depot_legal_test",
      isbn : "isbn_test",
      colis : "colis_test",
      status : "En cours",
    }
  ];
  editionPublication=[];
  currentExhibitor;
  ngOnInit(): void {
    this.route.snapshot.queryParams;
    this.route.params.subscribe(({ref})=>{
      this.currentExhibitor=ref;
      this.sielService.getExhibitorsPublicationByEdition(ref).subscribe((editionsPub)=>{
        this.editionPublication=editionsPub;
      });
    });
  }


  publicationsPaginationChange(e,index){
    console.log(e)
   if(!isNaN(e)){
   let currentEdition = this.editionPublication[index];
   let refEdition = currentEdition.edition.refEdition;
   let size = currentEdition.publications.pageDetails.size;
   console.log(currentEdition)
  this.sielService.getPublicationsByExhibitorByEdition(this.currentExhibitor,refEdition,e-1,size)
         .subscribe((response)=>{
          this.editionPublication[index].publications.content=response.publications.content;
   }, (err)=>{
     this.snackBar.open("Impossible de récupérer les publication", "fermer");
   });
 }
}

}
