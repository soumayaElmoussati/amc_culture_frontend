import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language/language.service';
import { REGIONS } from 'src/app/lists/regions';
import { COUNTRIES } from 'src/app/lists/countries';
import { PROVINCE } from 'src/app/lists/Province';
import { VILLES } from 'src/app/lists/villes';
import Step1EditorForm from 'src/app/entities/participant/Editor/Step1EditorForm';
import Step2EditorForm from 'src/app/entities/participant/Editor/Step2EditorForm';
import Step4EditorForm from 'src/app/entities/participant/Editor/Step4EditorForm';
import Step3EditorForm from 'src/app/entities/participant/Editor/Step3EditorForm';
import { WritingLanguage, WritingLanguageData } from 'src/app/lists/writingLanguage.data';
import { AreasOfWriting, AreasOfWritingData } from 'src/app/lists/areasOfWriting.data';
import { FormsOfPromotingBooks, FormsOfPromotingBooksData } from 'src/app/lists/formsOfPromotingBooks.data';

@Component({
  selector: 'app-new-public-library',
  templateUrl: './new-public-library.component.html',
  styleUrls: ['./new-public-library.component.scss']
})



export class NewPublicLibraryComponent implements OnInit {
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
  dataStep5B = new Step4EditorForm();
  dataStep6B = new Step4EditorForm();
  dataStep7B = new Step4EditorForm();
  dataStep8B = new Step4EditorForm();
  dataStep9B = new Step4EditorForm();
  dataStep10B = new Step4EditorForm();
  dataStep11B = new Step4EditorForm();
  dataStep12B = new Step4EditorForm();

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;
  isForm5Submitted: Boolean;
  isForm6Submitted: Boolean;
  isForm7Submitted: Boolean;
  isForm8Submitted: Boolean;
  isForm9Submitted: Boolean;
  isForm10Submitted: Boolean;
  isForm11Submitted: Boolean;
  isForm12Submitted: Boolean;

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;
  validationForm6: FormGroup;
  validationForm7: FormGroup;
  validationForm8: FormGroup;
  validationForm9: FormGroup;
  validationForm10: FormGroup;
  validationForm11: FormGroup;
  validationForm12: FormGroup;



 

  showStepTitles:Boolean;

  isMobile:Boolean;

  selectedDialCode = "+212";




  publicationsPagination = {
    currentPage : 1,
    collectionSize : 0,
    numItemsPerPage : 12,
    
  }

  constructor( public formBuilder: FormBuilder, 
    breakpointObserver: BreakpointObserver, 
    private modalService: NgbModal, private snackBar:MatSnackBar,
     public languageService: LanguageService
     ) {

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
  get form6() {
    return this.validationForm6.controls;
  }
  get form7() {
    return this.validationForm7.controls;
  }
  get form8() {
    return this.validationForm8.controls;
  }
  get form9() {
    return this.validationForm9.controls;
  }
  get form10() {
    return this.validationForm10.controls;
  }
  get form11() {
    return this.validationForm11.controls;
  }
  get form12() {
    return this.validationForm12.controls;
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

      
    });
    this.validationForm2 = this.formBuilder.group({
     
    });

    this.validationForm3 = this.formBuilder.group({
    
      
  });
  
  this.validationForm4 = this.formBuilder.group({
  
});
this.validationForm5 = this.formBuilder.group({
  
});
this.validationForm6 = this.formBuilder.group({
  
  
});

this.validationForm7 = this.formBuilder.group({
  
  
});

this.validationForm8 = this.formBuilder.group({
  
  
});

this.validationForm9 = this.formBuilder.group({
  
  
});

this.validationForm10 = this.formBuilder.group({
  
  
});

this.validationForm11 = this.formBuilder.group({
  
  
});

this.validationForm12 = this.formBuilder.group({
  
  
});


}

  form1Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
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
  form6Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form7Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form8Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form9Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form10Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form11Submit(){     
   
 
    this.wizardForm.goToNextStep();
    
  }
  form12Submit(){     
   
 
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

