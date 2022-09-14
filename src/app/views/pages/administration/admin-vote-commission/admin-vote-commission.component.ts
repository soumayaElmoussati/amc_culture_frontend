import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from 'src/app/services/language/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PageDetails } from 'src/app/entities/sielView/PageDetails';
import { ExhibitorView } from 'src/app/entities/sielView/ExhibitorView';





@Component({
  selector: 'app-admin-vote-commission',
  templateUrl: './admin-vote-commission.component.html',
  styleUrls: ['./admin-vote-commission.component.scss']
})
export class AdminVoteCommissionComponent implements OnInit {

  @ViewChild('publicationsExhibitor') publicationsExhibitor;

  isForm1Submitted: Boolean;
  validationForm1: FormGroup;

  plannings = [];
  exhibitorsPagination : PageDetails = new PageDetails();
  exhibitors : Array<ExhibitorView> =[];
  selectedPublications = [];
  currentDate = null;
  currentPlanning = {refPlanning : ''};
  showVoteLoader = false;
  showMotifRejetField = false;

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService,
     @Inject(DOCUMENT) private document: Document, public languageService: LanguageService, 
     private activatedRoute: ActivatedRoute, public location: Location, private router: Router) {

  }

  get form1() {
    return this.validationForm1.controls;
  }
  refCommission;

  ngOnInit(): void {
    let date = new Date();
    this.currentDate = date.toISOString().slice(0, 10);
    if(this.activatedRoute.snapshot.params.refCommission){
      this.refCommission=this.activatedRoute.snapshot.params.refCommission
      this.sielService.getCommission(this.refCommission).subscribe((response)=>{
        this.plannings = response["plannings"];
        this.currentPlanning = this.plannings[0];//.filter((item)=>item.planningDate == this.currentDate);

      }, (error)=>{
        console.log(error);
      });
    }
    this.sielService.getListExposantsToBeValidated(0, 10).subscribe((response)=>{
      this.exhibitorsPagination = response["pageDetails"];
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
  }

  setExposant(e, refExhibitor){
    //
    let refPlanning = this.currentPlanning.refPlanning;
    this.router.navigate([`administration/vote-seance-commission/${this.refCommission}/planning/${refPlanning}/decision/${refExhibitor}`]);
  }



  exhibitorsPaginationChange(e){
    this.exhibitors = [];
    this.sielService.getListExposantsToBeValidated(e-1, this.exhibitorsPagination.numberOfElements).subscribe((response)=>{
      this.exhibitors = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les exposants", "fermer");
    });
  }




}
