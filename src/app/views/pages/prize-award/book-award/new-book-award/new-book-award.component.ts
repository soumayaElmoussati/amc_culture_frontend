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
import { BookAwardService } from 'src/app/services/prize-award/book-award/book-award.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import { DocumentRequest } from "src/app/entities/sharedView/document-request";
import { DocumentService } from "src/app/services/shared/document.service";


import Swal from 'sweetalert2';

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
  birthdata = new BirthData();
  biography: String;
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


class publicationRequest {

  title: String;
  author: String;
  publishingHouse: String;
  publishingDate: String;
  pagesNumber: String;
  language: String;
  abstractBook: String;
  publicationPlace: String;
  country: String;
  domain: String;


  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class bookRequest {

  title: String;
  author: String;
  publishingHouse: String;
  publishingDate: String;
  pagesNumber: String;
  language: String;
  abstractBook: String;
  publicationPlace: String;
  country: String;
  domain: String;


  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class AwardObtained {

  award: String;
  organisers: String;
  year: Number;
  artist: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class DemandPrice {

  comment: String;
  accountOwner: String;
  awardCategories: String;
  bookPrice: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class DemandAwardBookResponse {

  refDemand: any;
  refArtist: any;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class BookPrice {

  refBook: String;
  ptitle: String;
  publishingHouse: String;
  publishingDate: String;
  pagesNumber: Number;
  language: String;
  abstractBook: String;
  publicationPlace: String;
  country: String;
  author: String;
  domain: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }

}

class DocumentInfromation {

  refObject: string;
  refParent: string;
  documentType: string;
  file: any;
  handwrittenRequest?: any;
  translationRights?: any;
  documentTypeSelected: any;
  digitalVersion?: any;
  recu?: any;

  constructor() {
    this.handwrittenRequest = { file: null, value: "", refDocument: "" };
    this.translationRights = { file: null, value: "", refDocument: "" };
    this.digitalVersion = { file: null, value: "", refDocument: "" };
    this.recu = { file: null, value: "", refDocument: "" };
  }

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
  idCard?: any;
  passport?: any;


  constructor() {
    this.idCard = { file: null, value: "", refDocument: "" };
    this.passport = { file: null, value: "", refDocument: "" };

  }
  setObject(arr: any) {
    for (let i of Object.keys(arr)) this[i] = arr[i];
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



@Component({
  selector: 'app-new-book-award',
  templateUrl: './new-book-award.component.html',
  styleUrls: ['./new-book-award.component.scss']
})
export class NewBookAwardComponent implements OnInit {

  //LIST
  pays = COUNTRIES;


  dataStep1A = new Step1AwardData();
  dataStepPublication = new publicationRequest();
  awardObtained = new AwardObtained();
  bookPrice = new BookPrice();
  dataStepBook = new bookRequest();
  demandPrice = new DemandPrice();
  documentInfromation = new DocumentInfromation();
  dataStep2 = new Dtep2PersonalDocument();
  demandAwardBookResponse = new DemandAwardBookResponse();

  dataPublication: any;
  dataAwards: any;
  refAwardType: String;
  dataAwardCategories: any;

  refIdCard: any;
  refPassport: any;

  fileData: DocumentRequest[] = [];
  fileData1: DocumentRequest[] = [];
  fileDataToUpdate: Documents[] = [];

  dataStep4B = new Step4DemandCardForm();

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;
  validationForm6: FormGroup;
  validationForm7: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;
  isForm5Submitted: Boolean;
  isForm6Submitted: Boolean;
  isForm7Submitted: Boolean;

  Domain: any = [
    { id: "domain1", name: "domain1" },
    { id: "domain2", name: "domain2" },
    { id: "domain3", name: "domain3" },
    { id: "domain4", name: "domain4" },
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

  constructor(public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public languageService: LanguageService, private translate: TranslateService, private hassan2AwardService: Hassan2AwardService, private bookAwardService: BookAwardService, private documentService: DocumentService, private handleRequestService: HandleRequestService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    /**
     * form1 value validation
     */

    this.refAwardType = "AWARDT_AMC_000000003";

    this.hassan2AwardService.getArtistInformation(this.dataStep1A.email).subscribe((response) => {

      this.dataStep1A = response;
    }, (err) => {
      console.log(err);
    });


    this.bookAwardService.getCategoriesAward(this.refAwardType).subscribe((response) => {

      this.dataAwardCategories = response;
    }, (err) => {
      console.log(err);
    });


    this.validationForm1 = this.formBuilder.group({
      lastName: ['', Validators.required],
      lastNameAR: ['', Validators.required],
      firstName: ['', Validators.required],
      firstNameAR: ['', Validators.required],
      nationality: ['1', Validators.required],
      biography: ['', Validators.required],
      identityNumber: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['0', Validators.required],
      maritalStatus: ['2', Validators.required],
      dependentChildren: ['', Validators.required],
      country: ['1', Validators.required],
      region: ['1', Validators.required],
      province: ['1', Validators.required],
      city: ['1', Validators.required],
      birthCity: ['1', Validators.required],
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
      idCard: ['', Validators.required],
      passport: ['', Validators.required]
    });

    this.validationForm3 = this.formBuilder.group({
      title: ['', Validators.required],
      publishingHouse: ['', Validators.required],
      publishingDate: ['', Validators.required],
      pagesNumber: ['', Validators.required],
      abstractBook: ['', Validators.required],
      publicationPlace: ['', Validators.required],
      country: ['', Validators.required],
      Author: ['', Validators.required],
      domain: ['1', Validators.required],
      language: ['', Validators.required]
    });
    this.validationForm4 = this.formBuilder.group({
      award: ['', Validators.required],
      organisers: ['', Validators.required],
      year: ['', Validators.required]
    });

    this.validationForm5 = this.formBuilder.group({
      title: ['', Validators.required],
      publishingHouse: ['', Validators.required],
      publishingDate: ['', Validators.required],
      pagesNumber: ['', Validators.required],
      abstractBook: ['', Validators.required],
      publicationPlace: ['', Validators.required],
      country: ['', Validators.required],
      Author: ['', Validators.required],
      domain: ['', Validators.required],
      language: ['', Validators.required]
    });

    this.validationForm6 = this.formBuilder.group({
      priceType: ['', Validators.required],
      comment: ['', Validators.required]
    });

    this.validationForm7 = this.formBuilder.group({
      handwrittenRequest: ['', Validators.required],
      translationRights: ['', Validators.required],
      documentTypeSelected: ['', Validators.required],
      digitalVersion: ['', Validators.required],
      recu: ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
    this.isForm4Submitted = false;
    this.isForm5Submitted = false;
    this.isForm6Submitted = false;
    this.isForm7Submitted = false;

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
    return this.validationForm5.controls;
  }

  get form6() {
    return this.validationForm6.controls;
  }

  get form7() {
    return this.validationForm7.controls;
  }
  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    /* if(this.validationForm1.valid) {
       this.wizardForm.goToNextStep();
     } */
    this.wizardForm.goToNextStep();
    let data1ToSend = JSON.parse(JSON.stringify(this.dataStep1A));

    this.isForm1Submitted = true;
    this.bookAwardService.createNewDemandeAwardBook(data1ToSend).subscribe((res) => {
      this.dataStep1A.setObject(res);
    },
      (err) => {
        console.log(err);

      });

    this.hassan2AwardService.getDocuments(this.dataStep1A.refArtistAccount).subscribe((response) => {

      response.forEach(e => {

        if (e.nature == "idCard") {
          this.refIdCard = e.refDocument;
          this.dataStep2['idCard'].value = e.name;
        }

        if (e.nature == "passport") {
          this.refPassport = e.refDocument;
          this.dataStep2['passport'].value = e.name;
        }

      });


    }, (err) => {
      console.log(err);
    });

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

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;

    this.bookAwardService.getAllPublication(this.dataStep1A.refArtistAccount).subscribe((response) => {
      this.dataPublication = response;
    }, (err) => {
      console.log(err);
    });

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
  }
  form3Submit() {
    /*
    if(this.validationForm3.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.bookAwardService.getAllAwardsObtained(this.dataStep1A.refArtistAccount).subscribe((response) => {
      this.dataAwards = response;
    }, (err) => {
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
    this.wizardForm.goToNextStep();
    this.isForm4Submitted = true;

  }
  form5Submit() {
    /*
    if(this.validationForm5.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.dataStepBook.author = this.dataStep1A.refArtistAccount;
    let data5ToSend = JSON.parse(JSON.stringify(this.dataStepBook));

    this.isForm1Submitted = true;
    this.bookAwardService.addBookPrice(data5ToSend).subscribe((res) => {
      this.bookPrice.setObject(res);
    },
      (err) => {
        console.log(err);

      });

    this.wizardForm.goToNextStep();
    this.isForm5Submitted = true;

  }

  form6Submit() {
    /*
    if(this.validationForm6.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.demandPrice.bookPrice = this.bookPrice.refBook;
    this.demandPrice.accountOwner = this.dataStep1A.refArtistAccount;

    this.bookAwardService.createDemand(this.demandPrice).subscribe((res) => {
      this.demandAwardBookResponse.setObject(res);
    },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          Swal.fire(
            {
              position: 'center',
              title: this.translate.instant('error'),
              text: "this.translate.instant('invalidDemand')",
              showConfirmButton: true,
              confirmButtonText: this.translate.instant('ok'),
              icon: 'error'
            });
          return;
        }
        this.handleRequestService.handleError(err);

      });

    this.wizardForm.goToNextStep();
    this.isForm6Submitted = true;

  }

  form7Submit() {
    /*
    if(this.validationForm6.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.documentService.storeDocs(this.fileData1).subscribe(
      (res) => {

      },
      (err) => {
        this.handleRequestService.handleError(err);
      }
    );
    this.wizardForm.goToNextStep();
    this.isForm7Submitted = true;

  }


  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
    element.click();

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
        if (key == "idCard") {
          if (this.refIdCard != null) {
            currentFileUpdating.refDocument = this.refIdCard;
            currentFileUpdating.file = file;
            this.fileDataToUpdate.push(currentFileUpdating);
          } else {
            this.fileData.push(currentFile);
          }
        }

        if (key == "passport") {
          if (this.refPassport != null) {
            currentFileUpdating.refDocument = this.refPassport;
            currentFileUpdating.file = file;
            this.fileDataToUpdate.push(currentFileUpdating);
          } else {
            this.fileData.push(currentFile);
          }
        }


        this.dataStep2[key].value = file.name;

        var x = {};
        x[key] = file;
        this.validationForm2.patchValue({ ...x });
      }
    }
  }


  handleFileInput1(event: any, key) {
    if (event.target.files.length) {
      let currentFile: DocumentRequest = new DocumentRequest();
      let file = event.target.files[0];
      currentFile.file = file;
      currentFile.refObject = this.demandAwardBookResponse.refDemand;
      currentFile.refParent = this.demandAwardBookResponse.refDemand;
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
      this.documentInfromation[key].value = file.name;
      var x = {};
      x[key] = file;
      this.validationForm5.patchValue({ ...x });
    }
  }

  addPublication() {

    this.dataStepPublication.author = this.dataStep1A.refArtistAccount;
    let data3ToSend = JSON.parse(JSON.stringify(this.dataStepPublication));
    this.bookAwardService.addPublicationInformation(data3ToSend).subscribe((res) => {
      this.dataStepPublication.setObject(res);
    },
      (err) => {
        console.log(err);

      });
    this.clearForm3();

    this.bookAwardService.getAllPublication(this.dataStep1A.refArtistAccount).subscribe((response) => {

      this.dataPublication = response;
    }, (err) => {
      console.log(err);
    });
  }

  clearForm3() {
    this.validationForm3.patchValue({
      title: '',
      publishingHouse: '',
      publishingDate: '',
      pagesNumber: '',
      abstractBook: '',
      publicationPlace: '',
      country: '',
      author: '',
      domain: '',
      language: ''
    });
  }

  addAward() {

    this.awardObtained.artist = this.dataStep1A.refArtistAccount;
    let data4ToSend = JSON.parse(JSON.stringify(this.awardObtained));
    this.bookAwardService.addAwardObtained(data4ToSend).subscribe((res) => {
      this.dataStepPublication.setObject(res);
    },
      (err) => {
        console.log(err);

      });


    this.bookAwardService.getAllAwardsObtained(this.dataStep1A.refArtistAccount).subscribe((response) => {
      this.dataAwards = response;
    }, (err) => {
      console.log(err);
    });

    this.clearForm4();
  }

  clearForm4() {
    this.validationForm4.patchValue({
      award: '',
      organisers: '',
      year: ''
    });
  }

}
