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
import Step1DistributorForm from 'src/app/entities/participant/distributor/Step1DistributorForm';
import Step2DistributorForm from 'src/app/entities/participant/distributor/Step2DistributorForm';
import Step3DemandInformation from 'src/app/entities/artistCardView/Step3DemandInfo';
import Step4DistributorForm from 'src/app/entities/participant/distributor/Step4DistributorForm';
import AccountResponse from 'src/app/entities/AuthenticatedAccount';
import { ArtistCardService } from 'src/app/services/artist-card/artist-card.service';
import { DistributorsService } from 'src/app/services/book-directory/distributors/distributors.service';
import { WritingLanguage, WritingLanguageData } from 'src/app/lists/writingLanguage.data';
import Step3DistributorForm from 'src/app/entities/participant/distributor/Step3DistributorForm';
import { AreasOfWriting, AreasOfWritingData } from 'src/app/lists/areasOfWriting.data';
import { FormsOfPromotingBooks, FormsOfPromotingBooksData } from 'src/app/lists/formsOfPromotingBooks.data';
import { TypeOfPointSale, TypeOfPointSaleData } from 'src/app/lists/typeOfPointSale.data';
@Component({
  selector: 'app-new-distributor',
  templateUrl: './new-distributor.component.html',
  styleUrls: ['./new-distributor.component.scss']
})

export class NewDistributorComponent implements OnInit {
  
  writingLanguage: WritingLanguage[] = [];
  writingLanguageSelected: WritingLanguage[] = [];
 
  areasOfWriting: AreasOfWriting[] = [];
  areasOfWritingSelected: AreasOfWriting[] = [];

   formsOfPromotingBooks:FormsOfPromotingBooks[] = [];
   formsOfPromotingBooksSelected:FormsOfPromotingBooks[] = [];

   typeOfPointSale:TypeOfPointSale[] = [];
   typeOfPointSaleSelected:TypeOfPointSale[] = [];
   
    //LIST
    pays = COUNTRIES;
    region= REGIONS;
    province=PROVINCE;
    villes=VILLES;
    birthCountry=VILLES;
    
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  dataStep1B = new Step1DistributorForm();
  dataStep2B = new Step2DistributorForm();
  dataStep3B = new Step3DistributorForm();
  dataStep4B = new Step4DistributorForm();
  dataStep5B = new Step4DistributorForm();

  

  connectedUser = new AccountResponse();




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
  refObject: string;
  refParent: string;

 

  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 5,
    
  }


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, 
    public languageService: LanguageService ,
    private distributorsService: DistributorsService) {
    

    
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
    this.writingLanguage = WritingLanguageData.writingLanguages;    
    this.areasOfWriting = AreasOfWritingData.areasOfWriting;   
    this.areasOfWriting = AreasOfWritingData.areasOfWriting; 
    this.formsOfPromotingBooks = FormsOfPromotingBooksData.formsOfPromotingBooks; 
    this.typeOfPointSale = TypeOfPointSaleData.typeOfPointSale;
   

    if(window.navigator.userAgent.toLowerCase().includes("mobi")){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

    this.validationForm1 = this.formBuilder.group({
      businessName: ["", Validators.required],
      lineOfBusiness: ["", Validators.required],
      ownerName: ["", Validators.required],
      creationDate: ["", Validators.required],
      socialCapital: ["", Validators.required],
      faxNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      businessRegisterNumber: ["", Validators.required],
      commonCompanyIdentifier: ["", [Validators.required]],
      cnssNumber: ["", Validators.required],
      city: ["1", Validators.required],
      space: ["", Validators.required],
      Address: ["", Validators.required],
      website: ["", Validators.required],
      email: ["", Validators.required],
      permanentEmployeesNumber: ["", Validators.required],
      temporaryEmployeesNumber: ["", Validators.required],
      membershipAssociationOrSyndicate: ["", Validators.required],
     
      
    });
    this.validationForm2 = this.formBuilder.group({
      booksLanguage: ["", Validators.required],
      areasOfWriting: ["", Validators.required],
    });

    this.validationForm3 = this.formBuilder.group({
    
      
  });
  
  this.validationForm4 = this.formBuilder.group({
    numberPointSaleRural: ["", Validators.required],
    numberPointSaleUrban: ["", Validators.required],
    averageNumberContactsAnnuallyWithPublishers: ["", Validators.required],
    costOfDistributionComparedRetailPrice: ["", Validators.required],
    membershipAssociationOrSyndicate: ["", Validators.required],
      faxNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      businessRegisterNumber: ["", Validators.required],
      customerBase: ["", Validators.required],
      typeOfPointSale: ["", Validators.required],
});
this.validationForm5 = this.formBuilder.group({
  
  
});
}

  form1Submit(){     
     
   
 
        
    let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1B));
   
    if (!this.dataStep1B.refDistributor) {
      this.distributorsService.createDistributor(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);

          this.dataStep2B.refDistributor = this.dataStep1B.refDistributor;
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    } else {
      this.distributorsService.updateDistributor(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);
          this.dataStep2B.refDistributor= this.dataStep1B.refDistributor;
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
   
    for (var val of this.writingLanguageSelected) {
      elements.push(val.Name); 
     
     
    }
    for (var val2 of this.areasOfWritingSelected) {
      element2.push(val2.Name); 
    
     
    }
    this.dataStep2B.booksLanguage=elements;
    this.dataStep2B.areasOfWriting=element2;



    let Data2toSend = JSON.parse(JSON.stringify(this.dataStep2B));
    
    this.distributorsService.updateDistributor(Data2toSend).subscribe(
      (res) => {
        //this.distributorResponse.
        this.dataStep2B.setObject(res);
        this.dataStep3B.refDistributor = res["refDistributor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep3B.refDistributor = this.dataStep2B.refDistributor;

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
   
  }
  form3Submit(){
    let element3:any[]= [];   
    for (var val3 of this.formsOfPromotingBooksSelected) {
      element3.push(val3.Name); 
     
     
    }
   
    this.dataStep2B.formsOfPromotingBooks=element3;
    this.dataStep4B=this.dataStep2B;

    let Data4toSend = JSON.parse(JSON.stringify(this.dataStep4B));
    
    this.distributorsService.updateDistributor(Data4toSend).subscribe(
      (res) => {

         
        this.dataStep3B.setObject(res);        
        this.dataStep5B.refDistributor = res["refDistributor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep4B.refDistributor = this.dataStep3B.refDistributor;    
    this.wizardForm.goToNextStep();
    this.isForm3Submitted = true;

  }
  form4Submit(){  
    let element3:any[]= [];   
    for (var val3 of this.typeOfPointSaleSelected) {
      element3.push(val3.Name); 
     
     
    }
   
    this.dataStep2B.typeOfPointSale=element3;


    let Data4toSend = JSON.parse(JSON.stringify(this.dataStep2B));
    
    this.distributorsService.updateDistributor(Data4toSend).subscribe(
      (res) => {

         
        this.dataStep3B.setObject(res);        
        this.dataStep4B.refDistributor = res["refDistributor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep4B.refDistributor = this.dataStep3B.refDistributor;    
    //this.wizardForm.goToNextStep();
    this.isForm4Submitted = true;
    alert("Distributor added succefully!");
 
  }

  form5Submit(){  
    this.wizardForm.goToNextStep();
 
  }



  clearForm1(){
    this.validationForm1.patchValue({
      
    });
  }

  clearForm2(){
    this.validationForm2.patchValue({
      
    });
  }
  clearForm3(){
    this.validationForm3.patchValue({
     
    })
  }
  clearForm4(){
    this.validationForm3.patchValue({
      
    })
  }
  clearForm5(){
    this.validationForm2.patchValue({
     
    });
  }
}
