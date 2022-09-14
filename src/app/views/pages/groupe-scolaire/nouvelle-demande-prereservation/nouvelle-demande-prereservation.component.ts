import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {REGIONS} from "../../../../lists/regions";
import {VILLES} from "../../../../lists/villes";
import {MatSnackBar} from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/services/language/language.service';
import {SielService} from "../../../../services/siel/exposant/siel.service";
import Swal from 'sweetalert2';




@Component({
  selector: 'app-nouvelle-demande-prereservation',
  templateUrl: './nouvelle-demande-prereservation.component.html',
  styleUrls: ['./nouvelle-demande-prereservation.component.scss']
})
export class NouvelleDemandePrereservation implements OnInit {


  validationForm: FormGroup;

  isFormSubmitted: Boolean;

  regions = [];
  villes = [];
  tmpVilles = [];

  expiredEdition=false;

  constructor( public formBuilder: FormBuilder, private sielService: SielService, public  languageService: LanguageService,private snackBar:MatSnackBar) {
    this.sielService.verifierEditionDispo().subscribe((response)=>{
      this.expiredEdition =!response;
  });
  }

  get form() {
    return this.validationForm.controls;
  }

  ngOnInit(): void {

    this.regions = REGIONS;
    this.villes = VILLES;


    this.validationForm = this.formBuilder.group({
      nomEtablissement : ['', Validators.required],
      ville : ['', Validators.required],
      tel : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      datePrevueVisite : ['', Validators.required],
      heurePrevueVisite : ['', Validators.required],
      nombreVisite : ['', Validators.required],
      region : ['', Validators.required]
    });

  }


  formSubmit(){
    if(this.validationForm.valid){
      let body = {
        name : this.validationForm.get("nomEtablissement").value,
        phoneNumber : "+212"+this.validationForm.get("tel").value,
        email : this.validationForm.get("email").value,
        visitorsNumber : this.validationForm.get("nombreVisite").value,
        city : this.validationForm.get("ville").value,
        dateVisit : this.validationForm.get("datePrevueVisite").value,
        timeVisit : this.validationForm.get("heurePrevueVisite").value
      };
      console.log(body);
      this.sielService.groupeScolaire(body).subscribe((response)=>{
        console.log(response);
        Swal.fire(
          {
            position: 'center',
            title: 'Votre demande a été effectué avec succès',
            text: '',
            showConfirmButton: false,
            timer: 1000,
            icon: 'success'
          }
        );
        //this.clearForm();
      }, (err)=>{
        this.snackBar.open("Une erreur s'est produit", "fermer");
      });
    }

    this.isFormSubmitted = true;

  }

  setVilles(e){
    this.tmpVilles = this.villes.filter((item)=>(item.region == e));
  }

  clearForm(){
     this.validationForm.get("nomEtablissement").setValue("");
     this.validationForm.get("tel").setValue("");
    this.validationForm.get("email").setValue("");
    this.validationForm.get("nombreVisite").setValue("");
   this.validationForm.get("ville").setValue("");
    this.validationForm.get("datePrevueVisite").setValue("");
    this.validationForm.get("heurePrevueVisite").setValue("");
    this.validationForm.get("region").setValue("");
    this.tmpVilles = [];
  }


}
