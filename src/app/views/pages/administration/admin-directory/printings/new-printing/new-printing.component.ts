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
import Step1PrinterForm from 'src/app/entities/participant/printer/Step1PrinterForm';
import Step3PrinterForm from 'src/app/entities/participant/printer/Step3PrinterForm';
import Step4PrinterForm from 'src/app/entities/participant/printer/Step4PrinterForm';
import Step2PrinterForm from 'src/app/entities/participant/printer/Step2PrinterForm';
import { PrintingsService } from 'src/app/services/book-directory/printings/printings.service';
import { TypeOfPointSale, TypeOfPointSaleData } from 'src/app/lists/typeOfPointSale.data';
import { FacilitiesAndServices, FacilitiesAndServicesData } from 'src/app/lists/facilitiesAndServices.data';
import { OtherProducts, OtherProductsData } from 'src/app/lists/otherProducts.data';
@Component({
  selector: 'app-new-printing',
  templateUrl: './new-printing.component.html',
  styleUrls: ['./new-printing.component.scss']
})


export class NewPrintingComponent implements OnInit {
  facilitiesAndServices:FacilitiesAndServices[] = [];
  facilitiesAndServicesSelected:FacilitiesAndServices[] = [];
  
  otherProducts:OtherProducts[] = [];
  otherProductsSelected:OtherProducts[] = [];

    //LIST
    pays = COUNTRIES;
    region= REGIONS;
    province=PROVINCE;
    villes=VILLES;
    birthCountry=VILLES;
    
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
    
 
  dataStep1B = new Step1PrinterForm();
  dataStep2B = new Step2PrinterForm();
  dataStep3B = new Step3PrinterForm();
  dataStep4B = new Step4PrinterForm();






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

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, 
    private snackBar:MatSnackBar, 
    public languageService: LanguageService
    , private printerService: PrintingsService) {

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
    this.facilitiesAndServices = FacilitiesAndServicesData.facilitiesAndServices;
     this.otherProducts = OtherProductsData.otherProducts;
     this.otherProducts = OtherProductsData.otherProducts;
   

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
      averageBooksPrintedAnnually: ["", Validators.required],
    });
    this.validationForm2 = this.formBuilder.group({
     
    });

    this.validationForm3 = this.formBuilder.group({
    
      
  });
  
  this.validationForm4 = this.formBuilder.group({
   
});
this.validationForm5 = this.formBuilder.group({
  
  
});
}

  form1Submit(){     
   let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1B));
   
    if (!this.dataStep1B.refPrinter) {
      this.printerService.createPrinter(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);

          this.dataStep2B.refPrinter = this.dataStep1B.refPrinter;
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    } else {
      this.printerService.updatePrinter(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);
          this.dataStep2B.refPrinter= this.dataStep1B.refPrinter;
        },
        (err) => {
          console.log(err);
        }
      );
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    }
 
    this.wizardForm.goToNextStep();
  }

  form2Submit(){
    let elements:any[]= [];
    
    for (var val of this.facilitiesAndServicesSelected) {
      elements.push(val.Name);     
      
    }
    console.log(elements);
    this.dataStep2B.facilitiesAndServices=elements;
    console.log(this.dataStep2B.facilitiesAndServices);
    let Data2toSend = JSON.parse(JSON.stringify(this.dataStep2B));
    
    this.printerService.updatePrinter(Data2toSend).subscribe(
      (res) => {
      
        this.dataStep2B.setObject(res);
        this.dataStep3B.refPrinter = res["refPrinteributor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep3B.refPrinter = this.dataStep2B.refPrinter;

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;

  }
  form3Submit(){
    let element3:any[]= [];   
    for (var val3 of this.otherProductsSelected) {
      element3.push(val3.Name);         
    }
   
    this.dataStep2B.otherProducts=element3;
    this.dataStep3B=this.dataStep2B;

    let Data3toSend = JSON.parse(JSON.stringify(this.dataStep3B));
    
    this.printerService.updatePrinter(Data3toSend).subscribe(
      (res) => {

         
        this.dataStep3B.setObject(res);        
        this.dataStep4B.refPrinter = res["refPrinter"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep4B.refPrinter = this.dataStep3B.refPrinter;    
    this.wizardForm.goToNextStep();
    this.isForm3Submitted = true;
 
  }
  form4Submit(){  
    this.wizardForm.goToNextStep();
 
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
