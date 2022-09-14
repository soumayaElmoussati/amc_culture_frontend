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
import Step1DemandCardForm from 'src/app/entities/artistCardView/Step1DemandCardForm';
import Step2DemandCardForm from 'src/app/entities/artistCardView/Step2DemandCardForm';
import Step3DemandCardForm from 'src/app/entities/artistCardView/Step3DemandCardForm';
import Step4DemandCardForm from 'src/app/entities/artistCardView/Step4DemandCardForm';
import { ArtistCardService } from 'src/app/services/artist-card/artist-card.service';
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';
import { HonoraryAwardService } from 'src/app/services/prize-award/honorary-award/honorary-award.service';
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

class Documents {
  refDocument: string;
  file: any;

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

class DemandPrice {
  comment: String;
  accountOwner: String;
  awardCategories: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}


@Component({
  selector: 'app-new-honorary-award',
  templateUrl: './new-honorary-award.component.html',
  styleUrls: ['./new-honorary-award.component.scss']
})
export class NewHonoraryAwardComponent implements OnInit {

  //LIST
  pays = COUNTRIES;
  region = REGIONS;
  province = PROVINCE;
  villes = VILLES;
  birthCountry = VILLES;
  //model
  Step1Data = Step1DemandCardForm;
  refAwardType: String;

  step1AwardData = new Step1AwardData();
  dataAwardCategories: any;
  demandPrice = new DemandPrice();

  fileData: DocumentRequest[] = [];
  fileDataToUpdate: Documents[] = [];
  dataStep2 = new Dtep2PersonalDocument();
  refCv: any;
  refPicture: any;
  refRecuFile: any;


  dataStep1B = new Step1DemandCardForm();
  dataStep2B = new Step2DemandCardForm();
  dataStep3B = new Step3DemandCardForm();
  dataStep4B = new Step4DemandCardForm();

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;


  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;


  selectedCar: number;
  statuts: any[] = [
    { id: "1", name: 'Divorcé' },
    { id: "2", name: 'Marié' },
    { id: "3", name: 'Célibataire' },
  ];
  nationality: any[] = [
    { id: "1", name: "Marocain/Marocaine" },
    { id: "2", name: "Etranger resident au maroc" }
  ]
  identityType: any[] = [
    { id: "1", name: "Carte d'identité nationale" },
    { id: "2", name: "Carte de séjour" }
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
  StudyLevel: any = [
    { id: "1", name: "Collège" },
    { id: "2", name: "Secondaire" },
    { id: "3", name: "Supérieur" },
    { id: "4", name: "Autres" },

  ]
  Response: any = [
    { id: "1", name: "Oui" },
    { id: "2", name: "Nom" },
  ]
  CardType: any = [
    { id: "1", name: "Carte professionnelle d’artiste" },
    { id: "2", name: "Carte professionnelle des techniciens et des administrateurs des oeuvres" }
  ]
  ArtisticSpecialityFR: any = [
    { id: "1", name: "spécialité artistique 1" },
    { id: "2", name: "specialité artistique 2" },
    { id: "3", name: "spécialité artistique 3" },
    { id: "4", name: "spécialité artistique 4" },
  ]
  ArtisticSpecialityAR: any = [
    { id: "1", name: "spécialité artistique 1" },
    { id: "2", name: "specialité artistique 2" },
    { id: "3", name: "spécialité artistique 3" },
    { id: "4", name: "spécialité artistique 4" },
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

  constructor(public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public languageService: LanguageService, private translate: TranslateService, private artistCardService: ArtistCardService, private hassan2AwardService: Hassan2AwardService, private honoraryAwardService: HonoraryAwardService, private documentService: DocumentService, private handleRequestService: HandleRequestService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    /**
     * form1 value validation
     */

    this.refAwardType = "AWARDT_AMC_000000002";

    this.hassan2AwardService.getArtistInformation(this.step1AwardData.email).subscribe((response) => {
      this.step1AwardData = response;
    }, (err) => {
      console.log(err);
    });

    this.hassan2AwardService.getCategoriesAward(this.refAwardType).subscribe((response) => {
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
      identityType: ['1', Validators.required],
      identityNumber: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      domain: ['0', Validators.required],
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
      otherPhoneNumber: ['', Validators.required],
      ribNumber: ['', Validators.required]
    });

    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      picture: ['', Validators.required],
      cv: ['', Validators.required],
      ribFile: ['', Validators.required]
    });

    this.validationForm3 = this.formBuilder.group({
      awardCategories: ['', Validators.required],
      comment: ['1', Validators.required]

    });


    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;

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

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    /* if(this.validationForm1.valid) {
       this.wizardForm.goToNextStep();
     } */
    this.wizardForm.goToNextStep();
    let data1ToSend = JSON.parse(JSON.stringify(this.step1AwardData));
    this.isForm1Submitted = true;
    this.honoraryAwardService.createNewDemandeAwardHonorary(data1ToSend).subscribe((res) => {
      this.step1AwardData.setObject(res);
    },
      (err) => {
        console.log(err);

      });

    this.hassan2AwardService.getDocuments(this.step1AwardData.refArtistAccount).subscribe((response) => {

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

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
  }
  form3Submit() {
    /*
    if(this.validationForm3.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.demandPrice.accountOwner = this.step1AwardData.refArtistAccount;

    this.wizardForm.goToNextStep();

    let data3ToSend = JSON.parse(JSON.stringify(this.demandPrice));
    this.isForm3Submitted = true;
    this.honoraryAwardService.createNewDemandeAwardHonorary(data3ToSend).subscribe((res) => {

    },
      (err) => {
        console.log(err);

      });

    this.isForm3Submitted = true;
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
      currentFile.refObject = this.step1AwardData.refArtistAccount;
      currentFile.refParent = this.step1AwardData.refArtistAccount;
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


}
