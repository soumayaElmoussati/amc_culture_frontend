import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxCsvParser } from 'ngx-csv-parser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BackendService } from 'src/app/services/siel/exposant/Backend/BackendService.service';
import { from, forkJoin } from 'rxjs';
import { COUNTRIES } from 'src/app/lists/countries';
import { PASSPORTS_TYPE } from 'src/app/lists/passportsType';
import { SUPERFICIES } from 'src/app/lists/superficies';
import { STAND_TYPES } from 'src/app/lists/StandTypes';
import { BRANCHES } from 'src/app/lists/branches';
import { LIEUX_ACTIVITES } from 'src/app/lists/lieuxActivitee';
import { MODES_PAIEMENT } from 'src/app/lists/modePaiement';
import { PRODUITS_EXPOSES } from 'src/app/lists/produitsExposes';
import { SielService } from 'src/app/services/siel/exposant/siel.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})
export class BonCommandeComponent implements OnInit {

  user;
  hasStand=false;
  validStand=false;
  isDisabled=false;
  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private ngxCsvParser: NgxCsvParser, private modalService: NgbModal, private snackBar:MatSnackBar, public  languageService: LanguageService, private sielService: SielService, private router:Router,private translate: TranslateService,private backendService:BackendService) {
    this.user  = JSON.parse(localStorage.getItem("userData"));
   }

  ngOnInit(): void {
    this.sielService.checkUpdateExibitor(this.user.user)
    .subscribe(exhibData=>{
      if(exhibData.refExhibitor!=null){
        //send to get booking stand
        this.user=exhibData.refExhibitor;
        this.sielService.getBookingStand(exhibData.refExhibitor)
          .subscribe((data)=>{
            if(data!=null){
                this.hasStand = true;
                if(data.status!='PENDING'){
                  this.validStand=true;
                }
              }
            },
            e=>{})
            }
    });
  }

  downloadBonCommande(){
    this.isDisabled=true;
    let object = {refExhibitor : this.user,language : this.languageService.userLanguage}
    this.sielService.getRecapStand(object).subscribe((response)=>{
      let file = new Blob([response], {
        type: "application/doc"
      });
      let objectUrl = URL.createObjectURL(file);
      let link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute("download", "bon_de_commande.doc");
      link.click();
      this.isDisabled=false;
    }, (error)=>{
      this.isDisabled=false;
    });
  }

}
