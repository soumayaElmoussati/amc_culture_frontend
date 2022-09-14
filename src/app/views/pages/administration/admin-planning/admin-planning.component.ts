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
  selector: 'app-admin-planning',
  templateUrl: './admin-planning.component.html',
  styleUrls: ['./admin-planning.component.scss']
})

export class AdminPlanningComponent implements OnInit {

  validationForm: FormGroup;
  isFormSubmitted: Boolean;
  plannings = [];
  showSaveButton = false;


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService) {

  }

  get form() {
    return this.validationForm.controls;
  }

  setEditForm(id){
    let planning = this.plannings.filter((e)=>e.id == id)[0];
    this.validationForm.patchValue({
      id : id,
      datePlanning : planning["datePlanning"],
      heureDebut : planning["heureDebut"],
      heureFin : planning["heureFin"]
    });
    this.showSaveButton = true;
  }

  updateFormItem(content){
    this.openConfirmItemEdit(content);
  }

  openConfirmItemEdit(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.plannings.map((item)=>{
          let newPlanning = this.validationForm.value;
          if(newPlanning.id == item.id){
            item.datePlanning = newPlanning.datePlanning;
            item.heureDebut = newPlanning.heureDebut;
            item.heureFin = newPlanning.heureFin;
          }
        });
        this.emptyForm();
      }
    }).catch((res) => {

    });
  }

  openConfirmItemAdd(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.plannings.push({id : this.plannings.length, ...this.validationForm.value});
        this.clearForm();
      }
    }).catch((res) => {

    });
  }

  emptyForm(){
    this.showSaveButton = false;
    this.clearForm();
  }

  ngOnInit(): void {
    this.plannings = [
      {id : 1, datePlanning : "2020-05-01", heureDebut: "15:30", heureFin: "16:30"},
      {id : 2, datePlanning : "2021-01-03", heureDebut: "10:00", heureFin: "12:00"},
      {id : 3, datePlanning : "2022-03-16", heureDebut: "13:10", heureFin: "16:00"}
    ];
    this.validationForm = this.formBuilder.group({
      id : [''],
      datePlanning : ['', Validators.required],
      heureDebut : ['', Validators.required],
      heureFin : ['', Validators.required]
    });

  }

  formSubmit(content){
    if(this.validationForm.valid){
      this.openConfirmItemAdd(content);
    }
    this.isFormSubmitted = true;

  }

  clearForm(){
    this.validationForm.patchValue({datePlanning : "", heureDebut: "", heureFin: ""});
  }

  openConfirmItemDelete(content, id) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.plannings = this.plannings.filter((item)=>item.id !== id);
      }
    }).catch((res) => {

    });
  }

}
