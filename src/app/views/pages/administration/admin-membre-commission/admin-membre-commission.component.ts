import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../../services/language/language.service";
import {TYPES_COMMISSION} from "../../../../lists/typesCommission";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-admin-membre-commission',
  templateUrl: './admin-membre-commission.component.html',
  styleUrls: ['./admin-membre-commission.component.scss']
})

export class AdminMembreCommissionComponent implements OnInit {

  isFormSubmitted: Boolean;
  validationForm: FormGroup;

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService) {

  }

  get form() {
    return this.validationForm.controls;
  }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      cin : ['', Validators.required],
      nom : ['', Validators.required],
      prenom : ['', Validators.required],
      sexe : ['H', Validators.required],
      email : ['', Validators.required],
      numeroTelephone : ['', Validators.required],
      login : ['', Validators.required],
  });
  }

  formSubmit(){
    if(this.validationForm.valid){
      console.log(this.validationForm.value);
    }
    this.isFormSubmitted = true;
  }

  addMembreCommission(content){
    if(this.validationForm.valid){
      this.openConfirmMembreCommissioItemAdd(content);
    }
    this.isFormSubmitted = true;
  }

  openConfirmMembreCommissioItemAdd(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        if(this.validationForm.valid){

        }
      }
    }).catch((res) => {});
  }

  clearForm(){
    this.validationForm.patchValue({
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
