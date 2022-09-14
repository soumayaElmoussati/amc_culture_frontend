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
import Step2LibraryForm from 'src/app/entities/participant/library/Step2LibraryForm';
import Step3LibraryForm from 'src/app/entities/participant/library/Step3LibraryForm';
import Step1LibraryForm from 'src/app/entities/participant/library/Step1LibraryForm';
import { LibrariesService } from 'src/app/services/book-directory/libraries/libraries.service';
import { AreasOfWriting, AreasOfWritingData } from 'src/app/lists/areasOfWriting.data';
import { OtherProducts, OtherProductsData } from 'src/app/lists/otherProducts.data';




@Component({
  selector: 'app-new-library',
  templateUrl: './new-library.component.html',
  styleUrls: ['./new-library.component.scss']
})



export class NewLibraryComponent implements OnInit {
  areasOfWriting: AreasOfWriting[] = [];
  areasOfWritingSelected: AreasOfWriting[] = [];

  otherProducts:OtherProducts[] = [];
  otherProductsSelected:OtherProducts[] = [];
  
    //LIST
    pays = COUNTRIES;
    region= REGIONS;
    province=PROVINCE;
    villes=VILLES;
    birthCountry=VILLES;
    
    @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
    dataStep1B = new Step1LibraryForm();
    dataStep2B = new Step2LibraryForm();
    dataStep3B = new Step3LibraryForm();
 
  


  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;

 


  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;

  


 

  showStepTitles:Boolean;

  isMobile:Boolean;

  selectedDialCode = "+212";




  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 5,
    
  }

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    private modalService: NgbModal, private snackBar:MatSnackBar, 
    public languageService: LanguageService, private libraryService: LibrariesService) {

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
 
  ngOnInit(): void {
    
    this.showStepTitles = true;
    this.areasOfWriting = AreasOfWritingData.areasOfWriting;  
    this.otherProducts = OtherProductsData.otherProducts;

    if(window.navigator.userAgent.toLowerCase().includes("mobi")){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

    this.validationForm1 = this.formBuilder.group({
      libraryName: ["", Validators.required],
      StandardDefinitionOfBusiness: ["", Validators.required],
      libraryOwnerName: ["", Validators.required],
      libraryCreationDate: ["", Validators.required],
      socialCapital: ["", Validators.required],
      faxNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      businessRegisterNumber: ["", Validators.required],
      commonCompanyIdentifier: ["", [Validators.required]],
      cnssNumber: ["", Validators.required],
      city: ["1", Validators.required],
      librarySpace: ["", Validators.required],
      Address: ["", Validators.required],
      website: ["", Validators.required],
      email: ["", Validators.required],
      permanentEmployeesNumber: ["", Validators.required],
      temporaryEmployeesNumber: ["", Validators.required],
      membershipAssociationOrSyndicate: ["", Validators.required],
     

    });
    this.validationForm2 = this.formBuilder.group({
      booksLanguageSold: ["", Validators.required],
      libraryOtherProduct: ["", Validators.required],
    });

    this.validationForm3 = this.formBuilder.group({
      
  });
  
  
   
  

  }

  form1Submit(){              
    let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1B));
   console.log(Data1toSend);
    if (!this.dataStep1B.refLibrary) {
      this.libraryService.createLibrary(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);

          this.dataStep2B.refLibrary = this.dataStep1B.refLibrary;
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    } else {
      this.libraryService.updateLibrary(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);
          this.dataStep2B.refLibrary= this.dataStep1B.refLibrary;
        },
        (err) => {
          console.log(err);
        }
      );
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    }
 
    
  }

  form2Submit(){
    let elements:any[]= [];
    let element2:any[]= [];
   
    for (var val of this.areasOfWritingSelected) {
      elements.push(val.Name); 
     
     
    }
    for (var val2 of this.otherProductsSelected) {
      element2.push(val2.Name); 
    
     
    }
    this.dataStep2B.booksLanguageSold=elements;
    this.dataStep2B.libraryOtherProduct=element2;



    let Data2toSend = JSON.parse(JSON.stringify(this.dataStep2B));
    
    this.libraryService.updateLibrary(Data2toSend).subscribe(
      (res) => {
       
        this.dataStep2B.setObject(res);
        this.dataStep3B.refLibrary = res["refLibrary"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep3B.refLibrary = this.dataStep2B.refLibrary;

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
 
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
    
  }

  clearForm2(){
   
  }
  clearForm3(){
    
  }
 
}
