import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LanguageService} from "../../../../../services/language/language.service";
import {TYPES_COMMISSION} from "../../../../../lists/typesCommission";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {SielService} from "../../../../../services/siel/administration/siel.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nouvelle-edition',
  templateUrl: './nouvelle-edition.component.html',
  styleUrls: ['./nouvelle-edition.component.scss']
})

export class NouvelleEditionComponent implements OnInit {

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  validationForm: FormGroup;
  isFormSubmitted: Boolean;

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private sielService: SielService) {
  }

  get form() {
    return this.validationForm.controls;
  }

  ngOnInit(): void {

    this.validationForm = this.formBuilder.group({
      dateDebut : ['', Validators.required],
      dateFin : ['', Validators.required],
      nom : ['', Validators.required],
      rib : ['',Validators.required],
      address :['',Validators.required]
    });

  }

  formSubmit(){
  if(this.validationForm.valid){
    console.log(this.validationForm);
    let object = {
      "name" : this.validationForm.get("nom").value,
      "startedDate" : this.validationForm.get("dateDebut").value,
      "endDate" : this.validationForm.get("dateFin").value,
      "rib" : this.validationForm.get("rib").value,
      "address": this.validationForm.get("address").value
    };
    this.sielService.createEdition(object).subscribe((response)=>{
      Swal.fire(
        {
          position: 'center',
          title: 'Edition ajoutée avec succès',
          text: '',
          showConfirmButton: false,
          timer: 2000,
          icon: 'success'
        }
      ).then(()=>{
       // this.clearForm();
      });
    }, (err)=>{
      this.snackBar.open("Une erreur s'est produit", "fermer");
    })
  }
    this.isFormSubmitted = true;
  }

  clearForm(){
    this.validationForm.patchValue({
      dateDebut : "",
      dateFin : "",
      nom : "",
      rib :"",
      address :""
    });
  }

}
