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
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';
import { TheaterAwardService } from 'src/app/services/prize-award/theater-award/theater-award.service';
import ParticipantsInformation from 'src/app/entities/prizeAwardView/ParticipantsInfromation';
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


class Step1ArtistData {
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
  domain: String;

  constructor() {
    const user_d = JSON.parse(localStorage.getItem("userData"));
    this.email = user_d?.user ? user_d.user : "";
  }

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class FileDataAwardTheater {

  picture: File;
  cv: File;
  rib: File;
  numC: String;
  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class TheaterPieceRequest {

  title: String;
  theaterTroupeName: String;
  date: Date;
  textTheaterPiece: String;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }

}

class DemandPrice {

  comment: String;
  accountOwner: String;
  awardCategories: String;
  theaterPieceRequest = new TheaterPieceRequest();

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

class Participants {

  refParticipant: string;
  lastName: string;
  firstName: string;
  cin: string;
  role1 = new RoleTheater();
  role2 = new RoleTheater();
  role3 = new RoleTheater();
  personalityName: string;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class DemandPriceResponse {
  refTheaterPiece: any;

  title: String;
  theaterTroupeName: String;

  textTheaterPiece: String;

  date: Date;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

class RoleTheater {

  refRoleTheater: string;
  name: string;

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}


@Component({
  selector: 'app-new-theater-award',
  templateUrl: './new-theater-award.component.html',
  styleUrls: ['./new-theater-award.component.scss']
})
export class NewTheaterAwardComponent implements OnInit {

  pays = COUNTRIES;
  region = REGIONS;
  province = PROVINCE;
  villes = VILLES;
  birthCountry = VILLES;
  //model
  Step1Data = Step1DemandCardForm;
  artistData = new Step1ArtistData();
  fileDataAwardTheater = new FileDataAwardTheater();
  demandPrice = new DemandPrice();
  participantInformation = new ParticipantsInformation();
  dataAwardCategories: any;
  refAwardType: String;
  refTheaterPiece: String;
  participants: any;
  roleTheater: any;
  demandPriceResponse = new DemandPriceResponse();

  fileData: DocumentRequest[] = [];
  fileDataToUpdate: Documents[] = [];
  dataStep2 = new Dtep2PersonalDocument();
  refCv: any;
  refPicture: any;
  refRecuFile: any;

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;


  statuts: any[] = [
    { id: "1", name: 'Divorcé' },
    { id: "2", name: 'Marié' },
    { id: "3", name: 'Célibataire' },
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

  constructor(public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, public languageService: LanguageService, private translate: TranslateService, private hassan2AwardService: Hassan2AwardService, private theaterAwardService: TheaterAwardService, private documentService: DocumentService, private handleRequestService: HandleRequestService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    /**
     * form1 value validation
     */

    this.refAwardType = "AWARDT_AMC_000000002";
    console.log(this.participantInformation);

    this.hassan2AwardService.getArtistInformation(this.artistData.email).subscribe((response) => {
      this.artistData = response;
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
      gender: ['0', Validators.required],
      domain: ['0', Validators.required],
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
      title: ['', Validators.required],
      theaterTroupeName: ['', Validators.required],
      date: ['', Validators.required],
      textTheaterPiece: ['', Validators.required],
      awardCategories: ['1', Validators.required],
      comment: ['', Validators.required]
    });

    this.validationForm4 = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      role1: ['', Validators.required],
      role2: ['', Validators.required],
      role3: ['', Validators.required],
      personalityName: ['', Validators.required]
    })

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
    this.isForm4Submitted = false;

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
  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    this.wizardForm.goToNextStep();
    let data1ToSend = JSON.parse(JSON.stringify(this.artistData));
    this.isForm1Submitted = true;
    this.hassan2AwardService.createNewDemandeAwardHassan2(data1ToSend).subscribe((res) => {
      this.artistData.setObject(res);
    },
      (err) => {
        console.log(err);

      });


    this.hassan2AwardService.getDocuments(this.artistData.refArtistAccount).subscribe((response) => {

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

    this.wizardForm.goToNextStep();
    this.isForm2Submitted = true;
  }
  form3Submit() {
    /*
    if(this.validationForm3.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.demandPrice.accountOwner = this.artistData.refArtistAccount;
    let data3ToSend = JSON.parse(JSON.stringify(this.demandPrice));


    this.theaterAwardService.createDemand(data3ToSend).subscribe((res) => {
      this.demandPriceResponse = res;
      this.refTheaterPiece = res.refTheaterPiece;
      console.log(res);
      console.log(this.demandPriceResponse);
    },
      (err) => {
        console.log(err);

      });

    this.wizardForm.goToNextStep();
    this.isForm3Submitted = true;

    this.theaterAwardService.getRoles().subscribe((response) => {
      this.roleTheater = response;
    }, (err) => {
      console.log(err);
    });

  }
  form4Submit() {
    /*
    if(this.validationForm4.valid) {
      this.wizardForm.goToNextStep();
    }*/

    this.wizardForm.goToNextStep();
    this.isForm4Submitted = true;

  }
  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
    element.click();

  }

  addParticipant() {

    this.participantInformation.theaterPiece = this.demandPriceResponse.refTheaterPiece;
    let data4ToSend = JSON.parse(JSON.stringify(this.participantInformation));
    this.theaterAwardService.addParticipant(data4ToSend).subscribe((res) => {
    },
      (err) => {
        console.log(err);

      });

    this.clearForm4();
    this.theaterAwardService.getParticipants(this.demandPriceResponse.refTheaterPiece).subscribe((response) => {
      this.participants = response;
    }, (err) => {
      console.log(err);
    });

  }

  handleFileInput(event: any, key) {
    if (event.target.files.length) {
      let currentFile: DocumentRequest = new DocumentRequest();
      let currentFileUpdating: Documents = new Documents();
      let file = event.target.files[0];
      currentFile.file = file;
      currentFile.refObject = this.artistData.refArtistAccount;
      currentFile.refParent = this.artistData.refArtistAccount;
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



  clearForm4() {
    this.validationForm4.patchValue({
      lastName: '',
      firstName: '',
      cin: '',
      role1: '',
      role2: '',
      role3: '',
      personalityName: '',
    });
  }

}
