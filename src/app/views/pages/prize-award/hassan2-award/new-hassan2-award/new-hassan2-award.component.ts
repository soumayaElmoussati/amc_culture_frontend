import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { LanguageService } from 'src/app/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from 'src/app/lists/countries';
import { REGIONS } from 'src/app/lists/regions';
import { PROVINCE } from 'src/app/lists/Province';
import { VILLES } from 'src/app/lists/villes';
import Step4DemandCardForm from 'src/app/entities/artistCardView/Step4DemandCardForm';
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';
import { DocumentRequest } from "src/app/entities/sharedView/document-request";
import { DocumentService } from "src/app/services/shared/document.service";
import { HandleRequestService } from "src/app/services/shared/handle-request.service";



class BirthData {

  birthDate: Date;
  birthCountry: String;
  birthCity: String;
  nationality: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class Address {
  province: String;
  postalCode: String;
  city: String;
  country: String;
  address: String;
  region: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class DemandPriceResponse {

  refDemand: any;
  refOwner: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}


class Step1AwardData {
  refArtistAccount: any;
  cin: String;
  firstName: String;
  lastName: String;
  firstNameAr: String;
  lastNameAr: String;
  gender: String;
  email: String;
  phoneNumber: String;
  ribNumber: String;
  birthdata = new BirthData();
  address = new Address();
  otherPhoneNumber: String;
  maritalStatus: String;
  dependentChildren: Number;

  constructor() {
    const user_d = JSON.parse(localStorage.getItem("userData"));
    this.email = user_d?.user ? user_d.user : "";
  }

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class Documents {
  refDocument: string;
  file: any;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }

}


class DemandPrice {

  comment: String;
  accountOwner: String
  awardCategories: String

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}


class ManuscriptRequest {

  documentsSubject: String;
  issuingAuthority: String;
  authoritiesConcerned: String;
  type: String;
  owner: String;
  demand: String;
  writingDate: Date;
  bibliography: String;
  manuscriptTitle: String;
  authorName: String;
  introduction: String;
  conclusion: String;
  papersNumber: Number;
  size: Number;
  rule: String;
  authorshipDate: Date;
  transcriberName: String;
  copyDate: Date;
  explanation: String;
  creationDate: Date;
  printerName: String;
  printDate: Date;
  ink: String;
  category: String;
  holderType: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}


class Dtep2PersonalDocument {
  refObject: string;
  refParent: string;
  documentType: string;
  file: any;
  picture?: any;
  ribFile?: any;
  cv?: any;

  constructor() {
    this.picture = { file: null, value: "", refDocument: "" };
    this.ribFile = { file: null, value: "", refDocument: "" };
    this.cv = { file: null, value: "", refDocument: "" };
  }
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
  }
}

class Dtep5ManuscritDocument {
  refObject: string;
  refParent: string;
  documentType: string;
  file: any;
  recu?: any;
  maniscruptPicture?: any;


  constructor() {
    this.recu = { file: null, value: "", refDocument: "" };
    this.maniscruptPicture = { file: null, value: "", refDocument: "" };

  }
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
  }
}



@Component({
  selector: 'app-new-hassan2-award',
  templateUrl: './new-hassan2-award.component.html',
  styleUrls: ['./new-hassan2-award.component.scss']
})
export class NewHassan2AwardComponent implements OnInit {

  //LIST
  pays = COUNTRIES;
  region = REGIONS;
  province = PROVINCE;
  villes = VILLES;
  birthCountry = VILLES;

  //=======code======================
  dataStep1A = new Step1AwardData();
  demandPriceResponse = new DemandPriceResponse();
  mauscriptRequest = new ManuscriptRequest();
  demandPrice = new DemandPrice();
  dataAwardCategories: any;
  manuscriptType: any;
  data1Response: any;
  email: String;
  refAwardType: String;
  importFile: File;
  fileData: DocumentRequest[] = [];
  fileDataToUpdate: Documents[] = [];
  fileData1: DocumentRequest[] = [];
  dataStep2 = new Dtep2PersonalDocument();
  dataStep5 = new Dtep5ManuscritDocument();

  refCv: any;
  refPicture: any;
  refRecuFile: any;

  //=====================================



  dataStep4B = new Step4DemandCardForm();

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;
  isForm5Submitted: Boolean;


  selectedCar: number;
  statuts: any[] = [
    { id: "DIVORCED", name: 'Divorcé' },
    { id: "MARRIED", name: 'Marié' },
    { id: "SINGLE", name: 'Célibataire' },
  ];
  nationality: any[] = [
    { id: "1", name: "Marocain/Marocaine" },
    { id: "2", name: "Etranger resident au maroc" }
  ]

  codePostale: any[] = [
    { id: "1", name: "code1" },
    { id: "2", name: "code2" },
    { id: "3", name: "code3" },
  ]
  SituationFamiliale: any = [
    { id: "1", name: "Celibataire" },
    { id: "2", name: "Marié" },
    { id: "3", name: "veuf" },
    { id: "4", name: "divorcé" },
  ]




  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;


  stepperOrientation: Observable<StepperOrientation>;

  // @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  constructor(public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public languageService: LanguageService, private translate: TranslateService, private hassan2AwardService: Hassan2AwardService, private documentService: DocumentService, private handleRequestService: HandleRequestService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));


    // const user_d = JSON.parse(localStorage.getItem("userData"));

  }

  ngOnInit(): void {
    /**
     * form1 value validation
     * 
     */
    this.refAwardType = "AWARDT_AMC_000000002";

    this.hassan2AwardService.getArtistInformation(this.dataStep1A.email).subscribe((response) => {
      this.dataStep1A = response;
    }, (err) => {
      console.log(err);
    });






    this.hassan2AwardService.getCategoriesAward(this.refAwardType).subscribe((response) => {

      this.dataAwardCategories = response;
    }, (err) => {
      console.log(err);
    });


    this.hassan2AwardService.getManuscriptType().subscribe((response) => {
      this.manuscriptType = response;
    }, (err) => {
      console.log(err);
    });


    this.validationForm1 = this.formBuilder.group({
      lastName: ['', Validators.required],
      lastNameAR: ['', Validators.required],
      firstName: ['', Validators.required],
      firstNameAR: ['', Validators.required],
      identityNumber: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      dependentChildren: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      birthCity: ['', Validators.required],
      ribNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['1', Validators.required],
      phoneNumber: ['', Validators.required],
      otherPhoneNumber: ['', Validators.required]
    });

    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      cv: ['', Validators.required],
      picture: ['', Validators.required],
      ribFile: ['', Validators.required]

    });

    this.validationForm3 = this.formBuilder.group({
      priceType: ['', Validators.required],
      comment: ['', Validators.required]


    });
    this.validationForm4 = this.formBuilder.group({
      manuscritType: ['1', Validators.required],
      manuscriptTitle: ['', Validators.required],
      authorName: ['', Validators.required],
      introduction: ['', Validators.required],
      conclusion: ['', Validators.required],
      papersNumber: ['', Validators.required],
      creationDate: ['', Validators.required],
      size: ['', Validators.required],
      printerName: ['', Validators.required],
      printDate: ['', Validators.required],
      explanation: ['', Validators.required],
      ink: ['', Validators.required],
      documentsSubject: ['', Validators.required],
      issuingAuthority: ['', Validators.required],
      authoritiesConcerned: ['', Validators.required],
      category: ['', Validators.required],
      copyDate: ['', Validators.required],
      holderType: ['', Validators.required]
    });


    this.validationForm5 = this.formBuilder.group({
      recu: ['', Validators.required],
      maniscruptPicture: ['', Validators.required],


    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
    this.isForm4Submitted = false;
    this.isForm5Submitted = false;

  }

  onUploadError(event: any): void {
  }

  onUploadSuccess(event: any): void {
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert('Successfully Completed');
  }

  /**
   * Returns form
   */
  get form1() {
    return this.validationForm1.controls;
  }

  /**
   * Returns form
   */
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
    return this.validationForm5.controls
  }
  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    this.wizardForm.goToNextStep();


    let data1ToSend = JSON.parse(JSON.stringify(this.dataStep1A));
    this.isForm1Submitted = true;
    this.hassan2AwardService.createNewDemandeAwardHassan2(data1ToSend).subscribe((res) => {
      this.dataStep1A.setObject(res);
    },
      (err) => {
        console.log(err);

      });


    this.hassan2AwardService.getDocuments(this.dataStep1A.refArtistAccount).subscribe((response) => {

      response.forEach(e => {
        if (e.nature == "cv") {
          this.refCv = e.refDocument;
          this.dataStep2['cv'].value = e.name;
        }

        if (e.nature == "picture") {
          this.refPicture = e.refDocument;
          this.dataStep2['picture'].value = e.name;
        }

        if (e.nature == "ribFile") {
          this.refRecuFile = e.refDocument;
          this.dataStep2['ribFile'].value = e.name;
        }

      });

    }, (err) => {
      console.log(err);
    });

    this.wizardForm.goToNextStep();
    this.isForm1Submitted = true;
  }


  /**
   * Go to next step while form value is valid
   */

  form2Submit() {
    /*
    if(this.validationForm2.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.documentService.storeDocs(this.fileData).subscribe(
      (res) => {

      },
      (err) => {
        this.handleRequestService.handleError(err);
      }
    );


    this.documentService.updateDocuments(this.fileDataToUpdate).subscribe(
      (res) => {

      },
      (err) => {

      }
    );

    //   }
    // );

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
  }
  form3Submit() {
    /*
    if(this.validationForm3.valid) {
      this.wizardForm.goToNextStep();
    }*/
    this.demandPrice.accountOwner = this.dataStep1A.refArtistAccount;
    let data3ToSend = JSON.parse(JSON.stringify(this.demandPrice));
    this.isForm3Submitted = true;
    this.hassan2AwardService.addNewDemandeAwardHassan2(data3ToSend).subscribe((res) => {
      this.demandPriceResponse.setObject(res);
    },
      (err) => {
        console.log(err);

      });

    this.wizardForm.goToNextStep();
    this.isForm3Submitted = true;
  }
  form4Submit() {
    /*
    if(this.validationForm4.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.mauscriptRequest.demand = this.demandPriceResponse.refDemand;
    this.mauscriptRequest.owner = this.demandPriceResponse.refOwner;
    let data4ToSend = JSON.parse(JSON.stringify(this.mauscriptRequest));
    this.isForm3Submitted = true;
    this.hassan2AwardService.addManuscritInfromation(data4ToSend).subscribe((res) => {
      this.mauscriptRequest.setObject(res);
    },
      (err) => {
        console.log(err);

      });
    this.wizardForm.goToNextStep();
    this.isForm4Submitted = true;

  }

  form5Submit() {
    /*
    if(this.validationForm5.valid) {
      this.wizardForm.goToNextStep();
    }*/
    this.documentService.storeDocs(this.fileData1).subscribe(
      (res) => {
        this.wizardForm.goToNextStep();
        this.isForm5Submitted = true;
      },
      (err) => {
        this.handleRequestService.handleError(err);
      }
    );
  }

  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
    element.click();

  }

  fileSelected(model: Event) {
    const files = (model.target as HTMLInputElement).files;
    if (files.length > 0) {
      this.importFile = files[0];
    }
  }


  handleFileInput(event: any, key) {
    if (event.target.files.length) {
      let currentFile: DocumentRequest = new DocumentRequest();
      let currentFileUpdating: Documents = new Documents();
      let file = event.target.files[0];
      currentFile.file = file;
      currentFile.refObject = this.dataStep1A.refArtistAccount;
      currentFile.refParent = this.dataStep1A.refArtistAccount;
      currentFile.documentType = key;
      let flagFound: Boolean = false;
      this.fileData = this.fileData.map((element) => {
        if (element.documentType == currentFile.documentType) {
          flagFound = true;
          return currentFile;
        }
        return element;
      });
      if (!flagFound) {
        if (key == "cv") {
          if (this.refCv != null) {
            currentFileUpdating.refDocument = this.refCv;
            currentFileUpdating.file = file;
            this.fileDataToUpdate.push(currentFileUpdating);
          } else {
            this.fileData.push(currentFile);
          }
        }

        if (key == "picture") {
          if (this.refPicture != null) {
            currentFileUpdating.refDocument = this.refPicture;
            currentFileUpdating.file = file;
            this.fileDataToUpdate.push(currentFileUpdating);
          } else {
            this.fileData.push(currentFile);
          }
        }

        if (key == "ribFile") {
          if (this.refRecuFile != null) {
            currentFileUpdating.refDocument = this.refRecuFile;
            currentFileUpdating.file = file;
            this.fileDataToUpdate.push(currentFileUpdating);
          } else {
            this.fileData.push(currentFile);
          }
        }

      }
      this.dataStep2[key].value = file.name;

      var x = {};
      x[key] = file;
      this.validationForm2.patchValue({ ...x });
    }
  }




  handleFileInput1(event: any, key) {
    if (event.target.files.length) {
      let currentFile: DocumentRequest = new DocumentRequest();
      let file = event.target.files[0];
      currentFile.file = file;
      currentFile.refObject = this.demandPriceResponse.refDemand;
      currentFile.refParent = this.demandPriceResponse.refDemand;
      currentFile.documentType = key;
      let flagFound: Boolean = false;
      this.fileData1 = this.fileData1.map((element) => {
        if (element.documentType == currentFile.documentType) {
          flagFound = true;
          return currentFile;
        }
        return element;
      });
      if (!flagFound) {
        this.fileData1.push(currentFile);
      }
      this.dataStep5[key].value = file.name;
      var x = {};
      x[key] = file;
      this.validationForm5.patchValue({ ...x });
    }
  }







}
