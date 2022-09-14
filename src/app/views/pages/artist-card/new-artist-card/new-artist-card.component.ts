import { StepperOrientation } from "@angular/cdk/stepper";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BreakpointObserver } from "@angular/cdk/layout";
import { WizardComponent as BaseWizardComponent } from "angular-archwizard";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from "ngx-dropzone-wrapper";
import { LanguageService } from "src/app/services/language/language.service";
import { TranslateService } from "@ngx-translate/core";
import { COUNTRIES } from "src/app/lists/countries";
import { REGIONS } from "src/app/lists/regions";
import Step1DemandCardForm from "src/app/entities/artistCardView/Step1DemandCardForm";
import { PROVINCE } from "src/app/lists/Province";
import { VILLES } from "src/app/lists/villes";
import Step2DemandCardForm from "src/app/entities/artistCardView/Step2DemandCardForm";
import Step3DemandCardForm from "src/app/entities/artistCardView/Step3DemandCardForm";
import Step4DemandCardForm from "src/app/entities/artistCardView/Step4DemandCardForm";
import { ArtistCardService } from "src/app/services/artist-card/artist-card.service";
import Step3DemandInformation from "src/app/entities/artistCardView/Step3DemandInfo";
import { AccountResponse } from "src/app/entities/AuthenticatedAccount";
import { DocumentRequest } from "src/app/entities/sharedView/document-request";
import { DocumentService } from "src/app/services/shared/document.service";
import { HandleRequestService } from "src/app/services/shared/handle-request.service";
@Component({
  selector: "app-new-artist-card",
  templateUrl: "./new-artist-card.component.html",
  styleUrls: ["./new-artist-card.component.scss"],
})
export class NewArtistCardComponent implements OnInit {
  //LIST
  pays = COUNTRIES;
  region = REGIONS;
  province = PROVINCE;
  villes = VILLES;
  birthCountry = VILLES;
  refArtistAccount: string;
  //model
  Step1Data = Step1DemandCardForm;

  dataStep1B = new Step1DemandCardForm();
  dataStep2B = new Step2DemandCardForm();
  dataStep3A = new Step3DemandInformation();
  dataStep3B = new Step3DemandCardForm();
  dataStep4B = new Step4DemandCardForm();
  connectedUser = new AccountResponse();

  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;

  isForm1Submitted: Boolean = false;
  isForm2Submitted: Boolean = false;
  isForm3Submitted: Boolean = false;
  isForm4Submitted: Boolean = false;

  fileData: DocumentRequest[] = [];

  allowSubmitBtn: Boolean = false;

  selectedCar: number;
  nationality: any[] = [
    { id: "1", name: "Marocain/Marocaine" },
    { id: "2", name: "Etranger resident au maroc" },
  ];
  identityType: any[] = [
    { id: "CIN_CARD", name: "Carte d'identité nationale" },
    { id: "RESIDENT_CARD", name: "Carte de séjour" },
  ];

  codePostale: any[] = [
    { id: "1", name: "code1" },
    { id: "2", name: "code2" },
    { id: "3", name: "code3" },
  ];
  SituationFamiliale: any = [
    { id: "SINGLE", name: "Celibataire" },
    { id: "MARRIED", name: "Mariée/Marié" },
    { id: "DIVORCED", name: "Divorcée/Divorcé" },
  ];
  StudyLevel: any = [
    { id: "1", name: "Collège" },
    { id: "2", name: "Secondaire" },
    { id: "3", name: "Supérieur" },
    { id: "4", name: "Autres" },
  ];
  Response: any = [
    { id: "1", name: "Oui" },
    { id: "2", name: "Nom" },
  ];
  CardType: any = [
    { id: "1", name: "Carte professionnelle d’artiste" },
    {
      id: "2",
      name: "Carte professionnelle des techniciens ",
    },
  ];
  ArtisticSpecialityFR: any = [
    { id: "1", name: "spécialité artistique 1" },
    { id: "2", name: "specialité artistique 2" },
    { id: "3", name: "spécialité artistique 3" },
    { id: "4", name: "spécialité artistique 4" },
  ];
  ArtisticSpecialityAR: any = [
    { id: "1", name: "spécialité artistique 1" },
    { id: "2", name: "specialité artistique 2" },
    { id: "3", name: "spécialité artistique 3" },
    { id: "4", name: "spécialité artistique 4" },
  ];
  userConnected: any
  @ViewChild("wizardForm") wizardForm: BaseWizardComponent;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private handleRequestService: HandleRequestService,
    private documentService: DocumentService,
    public formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    public languageService: LanguageService,
    // private translate: TranslateService,
    private artistCardService: ArtistCardService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe("(min-width: 800px)")
      .pipe(map(({ matches }) => (matches ? "horizontal" : "vertical")));
  }

  ngOnInit(): void {
    //getConnectedUser
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    this.artistCardService.getAuthenticatedUser(userInfo.user).subscribe(
      (res) => {
        this.connectedUser.setObject(res);
        this.dataStep1B.setObject(res);
      },
      (err) => {
        console.log(err);
      }
    );

    //  form1 value validation
    this.validationForm1 = this.formBuilder.group({
      lastName: ["", Validators.required],
      lastNameAR: ["", Validators.required],
      firstName: ["", Validators.required],
      firstNameAR: ["", Validators.required],
      nationality: ["1", Validators.required],
      identityType: ["1", Validators.required],
      cin: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      gender: ["0", Validators.required],
      maritalStatus: ["2", Validators.required],
      dependentChildren: ["", Validators.required],
      country: ["1", Validators.required],
      region: ["1", Validators.required],
      province: ["1", Validators.required],
      city: ["1", Validators.required],
      birthCity: ["1", Validators.required],
      birthDate: ["", Validators.required],
      address: ["", Validators.required],
      postalCode: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      otherPhoneNumber: ["", Validators.required],
    });
    /**
     * form value validation
     */
    this.validationForm2 = this.formBuilder.group({
      studyLevel: ["", Validators.required],
      artisticEtablishmentName: ["", Validators.required],
      isGraduated: ["1", Validators.required],
      artistSpeciality: ["", Validators.required],
      graduatedYear: ["", Validators.required],
    });

    this.validationForm3 = this.formBuilder.group({
      cardType: ["", Validators.required],
      artisticSpecialityFR: ["1", Validators.required],
      artisticSpecialityAR: ["1", Validators.required],
      otherJob: ["1", Validators.required],
      organism: ["", Validators.required],
      socialCoverage: ["1", Validators.required],
      establishmentName: ["", Validators.required],
      numeroAffiliation: ["0", Validators.required],
      firstArtisticJobDate: ["", Validators.required],
      lastArtisticActivity: ["", Validators.required],
      belongToGroup: ["", Validators.required],
      goupName: ["", Validators.required],
      creationGroupDate: ["", Validators.required],
    });

    this.validationForm4 = this.formBuilder.group({
      cv: ["", Validators.required],
      catalogues: ["", Validators.required],
      piecesMusicales: ["", Validators.required],
      ficheJudiciaire: ["", Validators.required],
      contratTravail: ["", Validators.required],
      attestationTravail: ["", Validators.required],
    });
  }

  onUploadError(event: any): void { }

  onUploadSuccess(event: any): void { }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  /**
   * Wizard finish function
   */
  finishFunction() {
    alert("Successfully Completed");
  }
  /** getMaskPhoneNumber */
  get getNumberCodeForm2() {
    return this.pays.filter((item) => (item.alpha2Code == "MA"))[0].callingCodes[0];
  }

  /**
   * Returns form
   */
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

  /**
   * Go to next step while form value is valid
   */
  form1Submit() {
    this.isForm1Submitted = true;
    if (this.validationForm1.valid) {

      let Data1toSend = JSON.parse(JSON.stringify(this.dataStep1B));
      if (!this.dataStep1B.refArtistAccount) {
        console.log(Data1toSend);
        this.artistCardService.createArtistAccount(Data1toSend).subscribe(
          (res) => {
            this.dataStep1B.setObject(res);

            this.dataStep2B.refArtistAccount = this.dataStep1B.refArtistAccount;
          },
          (err) => {
            console.log(err);
            this.allowSubmitBtn = false;
          }
        );
      } else {
        this.artistCardService.updateArtistAccount(Data1toSend).subscribe(
          (res) => {
            this.dataStep1B.setObject(res);
            this.dataStep2B.refArtistAccount = this.dataStep1B.refArtistAccount;
          },
          (err) => {
            console.log(err);
            this.allowSubmitBtn = false;
          }
        );
      }
      this.wizardForm.goToNextStep();
    } else {
      this.allowSubmitBtn = false;
    }

    this.isForm1Submitted = true;
    this.wizardForm.goToNextStep();
  }

  form2Submit() {
    this.isForm2Submitted = true;

    if (this.validationForm2.valid) {
      let Data2toSend = JSON.parse(JSON.stringify(this.dataStep2B));
      this.artistCardService.updateArtistAccount(Data2toSend).subscribe(
        (res) => {
          this.dataStep2B.setObject(res);
          this.dataStep3B.refArtistAccount = res["refArtistAccount"];
          this.dataStep3A.refArtistAccount = res["refArtistAccount"];
        },
        (err) => {
          console.log(err);
        }
      );
      this.dataStep3B.refArtistAccount = this.dataStep2B.refArtistAccount;
      this.dataStep3A.refArtistAccount = this.dataStep2B.refArtistAccount;
      this.wizardForm.goToNextStep();

    } else {

      console.log("error Submit form2 ", this.validationForm2);
    }


  }
  form3Submit() {
    this.isForm3Submitted = true;
    if (this.validationForm3.valid) {
      let Data3AtoSend = JSON.parse(JSON.stringify(this.dataStep3A));
      if (!this.dataStep3A.refDemandCard) {
        this.artistCardService
          .createDemandCard(Data3AtoSend, Data3AtoSend.refArtistAccount)
          .subscribe(
            (res) => {
              this.dataStep3A.setObject(res);
              this.dataStep4B.refObject = this.dataStep3A.refDemandCard;
              console.log("seccess demand card");
            },
            (err) => {
              console.log(err);
              console.log("faild demand card");
            }
          );
      } else {
        this.artistCardService.updateDemandCard(Data3AtoSend).subscribe(
          (res) => {
            this.dataStep3A.setObject(res);
            console.log("seccess update demand card");
          },
          (err) => {
            console.log(err);
            console.log("faild update card");
          }
        );
      }

      let Data3toSend = JSON.parse(JSON.stringify(this.dataStep3B));
      this.artistCardService.updateArtistAccount(Data3toSend).subscribe(
        (res) => {
          this.dataStep3B.setObject(res);
          this.dataStep4B.refParent = res["refArtistAccount"];
          console.log("sussec update artist ");
        },
        (err) => {
          console.log(err);
          console.log("faild update artist ");
        }
      );
      this.dataStep4B.refParent = this.dataStep3B.refArtistAccount;
      this.dataStep4B.refObject = this.dataStep3A.refDemandCard;
      this.wizardForm.goToNextStep();
    }
    else {
      console.log("error Submit form3", this.validationForm3);
    }

  }
  form4Submit() {
    this.isForm4Submitted = true;
    if (this.validationForm4.valid) {
      this.documentService.storeDocs(this.fileData).subscribe(
        (res) => {
          this.wizardForm.goToNextStep();
          this.isForm4Submitted = true;
        },
        (err) => {
          this.handleRequestService.handleError(err);
        }
      );
    }
    else {

      console.log("error Submit form2 ", this.validationForm4);
    }

  }
  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#" + id) as HTMLElement;
    element.click();
  }
  handleFileInput(event: any, key) {
    if (event.target.files.length) {
      let currentFile: DocumentRequest = new DocumentRequest();
      let file = event.target.files[0];
      currentFile.file = file;
      currentFile.refObject = this.dataStep4B.refObject;
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
        this.fileData.push(currentFile);
      }
      this.dataStep4B[key].value = file.name;
      var x = {};
      x[key] = file;
      this.validationForm4.patchValue({ ...x });
    }
  }
}
