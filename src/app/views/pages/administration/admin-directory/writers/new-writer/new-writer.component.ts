import { Component, OnInit, ViewChild } from '@angular/core';
import { StepperOrientation } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
// import {StepperOrientation} from '@angular/material/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language/language.service';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import { TYPES_COMMISSION } from 'src/app/lists/typesCommission';
import { REGIONS } from 'src/app/lists/regions';
import { COUNTRIES } from 'src/app/lists/countries';
import { PROVINCE } from 'src/app/lists/Province';
import { VILLES } from 'src/app/lists/villes';
import Step1WriterForm from 'src/app/entities/participant/Step1WriterForm';
import { WritersService } from 'src/app/services/book-directory/writers/writers.service';




@Component({
  selector: 'app-new-writer',
  templateUrl: './new-writer.component.html',
  styleUrls: ['./new-writer.component.scss']
})


export class NewWriterComponent implements OnInit {
    //LIST
    pays = COUNTRIES;
    region= REGIONS;
    province=PROVINCE;
    villes=VILLES;
    birthCountry=VILLES;
    
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;


  dataStep1=new Step1WriterForm();



  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;
  isForm5Submitted: Boolean;
 


  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;
  


 

  showStepTitles:Boolean;

  isMobile:Boolean;

  selectedDialCode = "+212";




  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 5,
    
  }

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private writerService:WritersService) {

    window.addEventListener("resize", ()=>{
      if(document.documentElement.clientWidth <= 720){
        this.showStepTitles = false;
        this.isMobile = true;
      }else{
        this.showStepTitles = true;
        this.isMobile = false;
      }
    });
  }

  get form1() {
    return this.validationForm1.controls;
  }
  get form2() {
    return this.validationForm2.controls;
  }
  get form3() {
    return this.validationForm3.controls;
  }
  get form4() {
    return this.validationForm4.controls;
  }
  get form5() {
    return this.validationForm5.controls;
  }

  ngOnInit(): void {
    
    this.showStepTitles = true;
  

    if(window.navigator.userAgent.toLowerCase().includes("mobi")){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

    this.validationForm1 = this.formBuilder.group({
      fullName : ['', Validators.required],
    //  gender : ['0', Validators.required],
      birthDate : ['', Validators.required],
      dateOfDeath : ['', Validators.required],
      address : ['', Validators.required],
      countryOfResidence : ['', Validators.required],
      city : ['', Validators.required],
      //phoneNumber : ['', Validators.required],
      fax : ['', Validators.required],
      email : ['', Validators.required],
      webPage : ['', Validators.required],
      picture : ['', Validators.required]
     // picture : ['', Validators.required]

    });
    this.validationForm2 = this.formBuilder.group({
      biographie : ['', Validators.required]
    });

    this.validationForm3 = this.formBuilder.group({
      langueEcriture : ['', Validators.required],
      champsEcriture : ['', Validators.required],
      
  });
  
  this.validationForm4 = this.formBuilder.group({
    titre : ['', Validators.required],
    editeur : ['', Validators.required],
    annee : ['', Validators.required],
    lieu : ['H', Validators.required],
    langueDeLivre : ['', Validators.required],
    champDeLivre : ['', Validators.required],
    nombreDePages : ['', Validators.required],
    description : ['', Validators.required],
});
this.validationForm5 = this.formBuilder.group({
  prix : ['', Validators.required],
  dateDeReceptionDuPrix : ['', Validators.required],
  
});
this.writerService.createNewWriter().subscribe((res)=>{
  console.log(res);
   
   this.wizardForm.goToNextStep();   
  },
  (err)=>{
   // this.isDisabled=false;
   console.log(err);
  });

  }

  form1Submit(){     
   // console.log("testing",this.validationForm1); 
               
     let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1));
      let picture: any; 
     this.isForm1Submitted = true;
     this.writerService.createNewWriter().subscribe((res)=>{
     console.log(res);
      
      this.wizardForm.goToNextStep();   
     },
     (err)=>{
      // this.isDisabled=false;
      console.log(err);
     });
  }

  form2Submit(){
    this.wizardForm.goToNextStep();
 
  }
  form3Submit(){
    this.wizardForm.goToNextStep();
 
  }
  form4Submit(){  
    this.wizardForm.goToNextStep();
 
  }

  form5Submit(){  
    this.wizardForm.goToNextStep();
 
  }



  clearForm1(){
    this.validationForm1.patchValue({
      cin : '',
      nomComplet : '',
      address : '',
      email : '',
      fax : '',
      telephone : '',
      dateNaissance : '',
      dateDeces : '',
      paysDeResidence : '',
      ville : '',
      pageElectronique : '',
      photoIdentite :'',
      sex : '',
    });
  }

  clearForm2(){
    this.validationForm2.patchValue({
      datePlanning : '',
      heureDebut : '',
      heureFin : '',
    });
  }
  clearForm3(){
    this.validationForm3.patchValue({
      langueEcriture : '',
      champsEcriture : '',
    })
  }
  clearForm4(){
    this.validationForm3.patchValue({
      titre : '',
      editeur : '',
      annee : '',
      lieu : '',
      langueDeLivre : '',
      champDeLivre : '',
      nombreDePages : '',
      description : '',
    })
  }
  clearForm5(){
    this.validationForm2.patchValue({
      prix : '',
      dateDeReceptionDuPrix : '',
    });
  }
}
