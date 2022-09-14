import { StepperOrientation } from '@angular/cdk/stepper';
import { AfterContentInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../../services/language/language.service";
import {TYPES_COMMISSION} from "../../../../lists/typesCommission";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin-planning',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.scss']
})

export class BonCommandeComponent implements OnInit {


  @ViewChild('bonCommande', {static : true}) BonCommande;
  formValidation:FormGroup;


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.modalService.open(this.BonCommande, {centered: true, backdrop : 'static', keyboard : false}).result.then((result) => {
      if(result == "save"){
      }
    }).catch((res) => {
    });

    this.formBuilder.group({
      'bonCommande' : ['', Validators.required]
    });
  }

  openFileRecapStandDataBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#recapStandDataFile") as HTMLElement;
    element.click();
  }

  handleFileRecapStandDataInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#recapStandDataFile + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
    }
  }

}
