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
import { PublishersService } from 'src/app/services/book-directory/publishers/publishers.service';
import Step1EditorForm from 'src/app/entities/participant/Editor/Step1EditorForm';
import Step2EditorForm from 'src/app/entities/participant/Editor/Step2EditorForm';
import Step4EditorForm from 'src/app/entities/participant/Editor/Step4EditorForm';
import Step3EditorForm from 'src/app/entities/participant/Editor/Step3EditorForm';
import { WritingLanguage, WritingLanguageData } from 'src/app/lists/writingLanguage.data';
import { AreasOfWriting, AreasOfWritingData } from 'src/app/lists/areasOfWriting.data';
import { FormsOfPromotingBooks, FormsOfPromotingBooksData } from 'src/app/lists/formsOfPromotingBooks.data';
@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.scss']
})





export class NewPublisherComponent implements OnInit {
  writingLanguage: WritingLanguage[] = [];
  writingLanguageSelected: WritingLanguage[] = [];
 
  areasOfWriting: AreasOfWriting[] = [];
  areasOfWritingSelected: AreasOfWriting[] = [];

  formsOfPromotingBooks:FormsOfPromotingBooks[] = [];
  formsOfPromotingBooksSelected:FormsOfPromotingBooks[] = [];
    //LIST
    pays = COUNTRIES;
    region= REGIONS;
    province=PROVINCE;
    villes=VILLES;
    birthCountry=VILLES;
    
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

 
  dataStep1B = new Step1EditorForm();
  dataStep2B = new Step2EditorForm();
  dataStep3B = new Step3EditorForm();
  dataStep4B = new Step4EditorForm();




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

  constructor( public formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver, 
    private modalService: NgbModal, private snackBar:MatSnackBar,
     public languageService: LanguageService,
     private editorService: PublishersService) {

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
    this.formsOfPromotingBooks = FormsOfPromotingBooksData.formsOfPromotingBooks; 

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
    numberPublicationsPerYearArabic: ["", Validators.required],
    numberPublicationsPerYearAmazigh: ["", Validators.required],
    numberPublicationsPerYearFrench: ["", Validators.required],
    numberPublicationsPerYearEnglish: ["", Validators.required],
    permanentEmployeesNumber: ["", Validators.required],
    temporaryEmployeesNumber: ["", Validators.required],
    customerBase: ["", Validators.required],
    numberBooksPublishedPerYear: ["", Validators.required],
    numberBooksPublishedLastYear: ["", Validators.required],
});
this.validationForm5 = this.formBuilder.group({
  
  
});
}

  form1Submit(){     
    let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1B));
   
    if (!this.dataStep1B.refEditor) {
      this.editorService.createEditor(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);

          this.dataStep2B.refEditor = this.dataStep1B.refEditor;
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.isForm1Submitted = true;
      this.wizardForm.goToNextStep();
    } else {
      this.editorService.updateEditor(Data1toSend).subscribe(
        (res) => {
          this.dataStep1B.setObject(res);
          this.dataStep2B.refEditor= this.dataStep1B.refEditor;
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
    
    this.editorService.updateEditor(Data2toSend).subscribe(
      (res) => {
        //this.distributorResponse.
        this.dataStep2B.setObject(res);
        this.dataStep3B.refEditor = res["refEditor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep3B.refEditor = this.dataStep2B.refEditor;

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
    
    this.editorService.updateEditor(Data4toSend).subscribe(
      (res) => {

         
        this.dataStep3B.setObject(res);        
        this.dataStep4B.refEditor = res["refEditor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep4B.refEditor = this.dataStep3B.refEditor;    
    this.wizardForm.goToNextStep();
    this.isForm3Submitted = true;
 
  }
  form4Submit(){  
    //this.dataStep4B;
    let Data4toSend = JSON.parse(JSON.stringify(this.dataStep2B));
    
    this.editorService.updateEditor(Data4toSend).subscribe(
      (res) => {

         
        this.dataStep3B.setObject(res);        
        this.dataStep4B.refEditor = res["refEditor"];
      
      },
      (err) => {
        console.log(err);
      }
    );

    this.dataStep4B.refEditor = this.dataStep3B.refEditor;    
    //this.wizardForm.goToNextStep();
    this.isForm4Submitted = true;
   
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
