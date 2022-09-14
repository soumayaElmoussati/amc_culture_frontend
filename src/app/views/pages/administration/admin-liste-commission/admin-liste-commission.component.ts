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
import { CommissionView } from 'src/app/entities/sielView/CommissionView';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-liste-commission',
  templateUrl: './admin-liste-commission.component.html',
  styleUrls: ['./admin-liste-commission.component.scss']
})

export class AdminListeCommissionComponent implements OnInit {


  commissions : Array<CommissionView>= [];

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
     private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, 
     private sielService: SielService, private router: Router) {

  }



  ngOnInit(): void {
    this.sielService.getCommissions().subscribe((response)=>{
      this.commissions = response;
      this.commissions.forEach(ele =>{
        let date = new Date().toISOString().slice(0, 10);
        ele.iValidCommission  = (date>=ele.startedDate && date<=ele.endDate);
      });
      console.log(this.commissions)
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les commissions", "fermer");
    });
  }

  startCommission(refCommission){
    this.router.navigate(['administration/vote-seance-commission/', refCommission]);
  }

  openDetailEcommission(refCommission){

  }


}
