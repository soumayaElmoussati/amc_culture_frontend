import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import {COUNTRIES} from "../../../../lists/countries";
import {SUPERFICIES} from "../../../../lists/superficies";
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {BRANCHES} from "../../../../lists/branches";
import {PASSPORTS_TYPE} from "../../../../lists/passportsType";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import {LIEUX_ACTIVITES} from "../../../../lists/lieuxActivitee";
import {PRODUITS_EXPOSES} from "../../../../lists/produitsExposes";
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/services/language/language.service';
import {SielService} from "../../../../services/siel/exposant/siel.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DocumentView } from 'src/app/entities/sharedView/document-view';

import {forkJoin} from 'rxjs';



@Component({
  selector: 'app-nouvelle-demande-exposant',
  templateUrl: './nouvelle-demande-exposant.component.html',
  styleUrls: ['./nouvelle-demande-exposant.component.scss']
})
export class NouvelleDemandeExposantComponent implements OnInit {

  currentYear = new Date().getFullYear();
  date;
  lang = "";
  validationForm1: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;
  validationcsvForm: FormGroup;
  validationRecapForm1: FormGroup;
  validationRecapStand: FormGroup;

  isForm1Submitted: Boolean;
  isForm2Submitted: Boolean;
  isForm3Submitted: Boolean;
  isForm4Submitted: Boolean;
  isForm5Submitted: Boolean;
  isRecapForm1: Boolean;

  countries = [];
  passportsType =[];
  superficies = [];
  typesStand = [];
  branches = [];
  prodsExposes = [];
  modesPaiement = [];
  lieusActivitee = [];
  tmpPublications = [];

  showStepTitles = true;
  selectedDialCodeF1 = "212";
  selectedDialCodeF2 = "212";

  checkfinished:boolean=false;

  showAddForm = false;
  showCsvTable = false;
  showAddCsvItemButton = true;
  showEditCsvItemButton = false;
  showEmptyCsvFormButton = false;
  showActionsContainer = false;
  showAddNewLine = true;
  csvFileErrors = [];
  representedEditorsStep2List = [];
  activityPropositionsStep5List = [];
  selectedBranches = [];
  showSecondStep = true;
  isMobile = false;
  showStep1Loader = false;
  showStep2Loader = false;
  showStep3Loader = false;
  showStep4Loader = false;
  showStep5Loader = false;

  dataSent:boolean=false;

  showRepresentedEditorsSaveBtn = false;
  showPropositionActiviteSaveBtn = false;
  showCinFirstStep = true;

  enableDownloadRecapBtn = false;

  showCloseSrvErrorsModal = false;
  showCloseSrvErrorsModalLoader = false;

  refExibitor:string = null;

  documentAlreadySent:DocumentView[]=[];

  documentFlags={
    'RECAP_REQUEST_EXHIBITION':false,
    'PASSPORT1':false,
    'PASSPORT2':false
  };

  // toggleAddForm(){
  //   this.showAddNewLine = false;
  //   this.showAddForm = true;
  //   this.showActionsContainer = true;
  // }


  canEnterSteps = {
    step1 : true,
    step11 : false,
    step2 : false,
    step3 : false,
    step4 : false,
    step5 : false,
  };

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('recapDemandeParticipation') recapDemandeParticipation;
  @ViewChild('recapStandData') recapStandData;
  @ViewChild('csvSrvFileErrors') csvSrvFileErrors;


  stepperOrientation: Observable<StepperOrientation>;


  setNewDialCodeF1(e){
    if(e != undefined){
          let dialCode = this.countries.filter((item)=>(item.alpha2Code == e));
    this.selectedDialCodeF1 = dialCode[0].callingCodes[0];
    }else{
      this.selectedDialCodeF1 = "212";
    }
  }
  step1CountryChangeEventHandler(e){
    if(this.validationForm1.get("pays").value == "MA"){
      this.showCinFirstStep = true;
    }else{
      this.showCinFirstStep = false;
    }
    this.setNewDialCodeF1(e);
  }
  setNewDialCodeF2(e){
    if(e != undefined){
    let dialCode = this.countries.filter((item)=>(item.alpha2Code == e));
    this.selectedDialCodeF2 = dialCode[0].callingCodes[0];
    }else{
      this.selectedDialCodeF2 = "212";
    }
  }

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private ngxCsvParser: NgxCsvParser, private modalService: NgbModal, private snackBar:MatSnackBar, public  languageService: LanguageService, private sielService: SielService, private router:Router,private translate: TranslateService) {
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

   ngOnInit():void {
     
    try{
      this.translate.get('proposalActivityEmpty').toPromise().then();
    }catch(e)
    {

    }
    this.sielService.verifierEditionDispo().subscribe((response)=>{
      if(!response){
        //this.router.navigate(["/edition-expiré"]);
      }
    }, (error)=>{
      //this.router.navigate(["/edition-expiré"]);
    });

    let user  = JSON.parse(localStorage.getItem("userData"));
    this.sielService.checkUpdateExibitor(user.user).subscribe(exhibData=>{
      this.checkfinished=true;
      this.refExibitor=exhibData.refExhibitor;
      localStorage.setItem("refExhibitor",this.refExibitor);
      if(exhibData["country"] == "MA"){
        this.showCinFirstStep = true;
      }else if(exhibData["country"]!=null){
        this.showCinFirstStep = false;
      }
      let condSecondFormShown = (exhibData["hasMultipleRepresented"]==false&&exhibData["hasMultipleRepresented"]!=null);
      if(condSecondFormShown)
        this.showSecondStep=false;
      this.validationForm1.patchValue({
        maisonEdition : exhibData["publishingHouseName"],
        pays : exhibData["country"],
        email : exhibData["email"],
        telephone : exhibData["phoneNumber"],
        responsable : exhibData["responsibleManagerName"],
        ville : exhibData["city"],
        mobile : exhibData["personalPhoneNumber"],
        fax : exhibData["fax"],
        adresse : exhibData["address"],
        categorieStand : parseInt(exhibData["hallClass"]),
        specialite : exhibData["specialization"],
        nbrEditionAr : exhibData["numberArabicVersion"],
        nbrEditionAu : exhibData["numberArabicVersion"],
        representePar : exhibData["companyRepresentative"],
        produitsExposes : exhibData["presentedMateriels"].map((item)=>parseInt(item)),
        superficie : exhibData["wingAreaSquare"],
        branches : exhibData.activityBranches.map(item=>parseInt(item)),
        cin : exhibData.cin,
        passportExpiration : exhibData["passportExpiration"],
        passportType : exhibData["passportType"],
        passportNumber : exhibData["passportNumber"],
        birthNationality : exhibData["birthNationality"],
        personName : exhibData["personName"],
        birthDay : exhibData["birthDay"],
        birthCountry:exhibData["birthCountry"],
        editeursRepresentes : condSecondFormShown?'n':'y'
      });
    },error=>{
      
    })

    localStorage.removeItem("refExhibitor");
    if(window.navigator.userAgent.toLowerCase().includes("mobi")){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }

    this.date = new Date();
    this.lang = this.languageService.userLanguage;
    if(document.documentElement.clientWidth <= 720){
      this.showStepTitles = false;
    }else{
      this.showStepTitles = true;
    }
    this.passportsType=PASSPORTS_TYPE;
    this.countries = COUNTRIES;
    this.superficies = SUPERFICIES;
    this.typesStand = STAND_TYPES;
    this.branches = BRANCHES;
    this.modesPaiement = MODES_PAIEMENT;
    this.lieusActivitee = LIEUX_ACTIVITES;
    this.prodsExposes = PRODUITS_EXPOSES;
    /**
     * form1 value validation
     */
    this.validationForm1 = this.formBuilder.group({
      maisonEdition : ['', Validators.required],
      pays : ['MA', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      telephone : ['', Validators.required],
      responsable : ['', Validators.required],
      ville : ['', Validators.required],
      mobile : ['', Validators.required],
      fax : ['', Validators.required],
      adresse : ['', Validators.required],
      categorieStand : ['', Validators.required],
      specialite : ['', Validators.required],
      nbrEditionAr : ['', Validators.required],
      nbrEditionAu : ['', Validators.required],
      representePar : ['', Validators.required],
      produitsExposes : ['', Validators.required],
      superficie : ['', Validators.required],
      branches : ['', Validators.required],
      cin : [''],
      passportExpiration :[''],
      passportType : [''],
      passportNumber : [''],
      birthNationality : [''],
      personName : [''],
      birthDay : [''],
      birthCountry:[''],
      editeursRepresentes : ['y', Validators.required]    });

    /**
     * formw value validation
     */
    this.validationForm2 = this.formBuilder.group({
      id : '',
      nomMaisonEdition : ['', [Validators.required]],
      pays : ['MA', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      telephone : ['', Validators.required],
      responsable : ['', Validators.required],
      fax : ['', Validators.required],
      adresse : ['', Validators.required],
      siteWeb : ['', Validators.required],
      specialite : ['', Validators.required],
      nbrEditionsAutreLangues : ['', Validators.required],
      branche : ['', Validators.required],
      img : ['', Validators.required],
    });

    this.validationForm3 = this.formBuilder.group({

    });


    this.validationForm4 = this.formBuilder.group({
      volumeM3 : ['', Validators.required],
      categorieStand : ['', Validators.required],
      modePaiement : ['', Validators.required],
    });

    this.validationForm5 = this.formBuilder.group({
      id : '',
      dateProposee : ['', Validators.required],
      theme : ['', Validators.required],
      participants : ['', Validators.required],
      lieuActivite : ['1', Validators.required],
      titreLivre : ['', Validators.required],
      auteur : ['', Validators.required],
      maisonEdition : ['', Validators.required],
      anneeEdition : ['', Validators.required],
      procuration : ['', Validators.required],
      editeur : ['', Validators.required],
    });

    this.validationcsvForm = this.formBuilder.group({
      anneePublication: ['', Validators.required],
      auteur: ['', Validators.required],
      depotLegal: ['', Validators.required],
      editeur: ['', Validators.required],
      id: [''],
      isbn : ['', Validators.required],
      nbrExemplaire: ['', Validators.required],
      prixDirhams: ['', Validators.required],
      specialiteDewey: ['', Validators.required],
      titreLivre: ['', Validators.required],
      colis : ['', Validators.required],
      quantite : ['', Validators.required]
    });

    this.validationRecapForm1 = this.formBuilder.group({
      recap : ['', Validators.required],
      img1 : [''],
      img2 : [''],
    });
    this.validationRecapStand = this.formBuilder.group({
      recap : ['', Validators.required]
    });

    this.isForm1Submitted = false;
    this.isForm2Submitted = false;
    this.isForm3Submitted = false;
    this.isForm4Submitted = false;
    this.isForm5Submitted = false;
    this.isRecapForm1 = false;



  }
  openFileBrowserPPR1(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#ppr1") as HTMLElement;
    element.click()
  }
  openFileBrowserPPR2(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#ppr2") as HTMLElement;
    element.click()
  }

  handleFileInputPPR1(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#ppr1 + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      this.validationRecapForm1.patchValue({
        img1 : event.target.files[0]
      });
    }
  }

  handleFileInputPPR2(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#ppr2 + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      this.validationRecapForm1.patchValue({
        img2 : event.target.files[0]
      });
    }
  }

  openFileBrowserPSP(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#psp") as HTMLElement;
    element.click()
  }

  handleFileInputPSP(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#psp + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      this.validationForm2.patchValue({
        img : event.target.files[0]
      });
    }
  }

  openFileBrowserPROC(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#proc") as HTMLElement;
    element.click();
  }

  handleFileInputPROC(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#proc + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      this.validationForm5.patchValue({
        procuration : event.target.files[0]
      });
    }
  }


  openFileBrowserCsvUpload(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#uploadCsvFile") as HTMLElement;
    element.setAttribute( 'value', null);
    element.click();
  }
  csvRecords: any[] = [];
  header = true;

  checkCsvFileErrors(result, file){
    this.sielService.checkPublicationsFileErrors(localStorage.getItem("refExhibitor"), file).subscribe((response)=>{
      let warnings = response["warnings"];
      let errLines = Object.keys(warnings);
      if(errLines.length > 0){
        this.csvFileErrors = errLines.map((item)=>{
          return {"ligne" : item, "msg" : warnings[item]};
        });
        this.modalService.open(this.csvSrvFileErrors, {centered: true, backdrop: 'static', keyboard: false, size : 'xl'}).result.then((result) => {

        })
      }
      result.forEach((item, index)=>{
        if(!errLines.includes(index.toString()) && index != 0){
          this.csvRecords.push(item);
        }
      });
      this.tmpPublications = this.csvRecords;
      this.showCloseSrvErrorsModalLoader = false;
    },(err)=>{
      console.log(err);
      this.showCloseSrvErrorsModalLoader = false;
    });

  }

  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      this.showCloseSrvErrorsModal = true;
    }
  }

  handleFileInputCsvUpload(event: any) {
    this.showCloseSrvErrorsModal = false;
    if(localStorage.getItem("refExhibitor")){
      if (event.target.files.length > 0) {
        let file = event.target.files[0];
        if(file.name.endsWith("csv") || (file.name.endsWith("xls") || file.name.endsWith("xlsx"))){
          this.csvFileErrors = [];
          this.csvRecords = [];
          this.tmpPublications = [];
          this.showCsvTable = true;
          this.showAddForm = true;
          this.showActionsContainer = true;
          this.showAddNewLine = false;
          this.snackBar.dismiss();
          if(file.name.endsWith("csv")){
            this.ngxCsvParser.parse(file, { header: false, delimiter: ',' })
            .pipe().subscribe((result: Array<any>) => {
              this.showCloseSrvErrorsModalLoader = true;
              this.checkCsvFileErrors(result, file);
              // if(this.csvFileErrors.length <= 0){
              //   this.csvRecords = result;
              //   this.tmpPublications = this.csvRecords;
              //   this.tmpPublications.shift();
              // }
            }, (error: NgxCSVParserError) => {
            });
          }
          else if(file.name.endsWith("xls") || file.name.endsWith("xlsx")){
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = (event:any)=>{
              let binaryData = event.target.result;
              let workbook = XLSX.read(binaryData, {type : 'binary'});
              const data = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
              let lines = data.split(/(?:\r\n|\n)+/).filter(function(el) {return el.length != 0});
              let records = [];
              lines.map((item)=>{
                records.push(item.split(","));
              });
              console.log(records);
              this.showCloseSrvErrorsModalLoader = true;
              this.checkCsvFileErrors(records, file);
              // if(this.csvFileErrors.length <= 0){
              //   this.csvRecords = records;
              //   this.tmpPublications = this.csvRecords;
              //   this.tmpPublications.shift();
              // }
            }
          }
        }
        else{
          this.snackBar.open(this.translate.instant('excelFileInsert'), this.translate.instant('close'));
        }
      }
    }else{
      this.snackBar.open(this.translate.instant('emptyFormFirstStep'), this.translate.instant('close'));
    }
  }

  removeCsvItem(id, content){
    this.openConfirmCsvItemDelete(content, id);
  }
  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
 }

ExcelDateToJSDate(date) {
  return new Date(Math.round((date - 25569)*86400*1000));
}

  setEditCsvItem(item, index){
    this.validationcsvForm.patchValue({
      id : index,
      auteur : (typeof item[0] == 'string') ?item[0].trim() :item[0] ,
      titreLivre : (typeof item[1] == 'string') ?item[1].trim() :item[1] ,
      editeur : (typeof item[2] == 'string') ?item[2].trim() :item[2] ,
      anneePublication : this.formatDate(new Date(item[3])),
      nbrExemplaire : (typeof item[4] == 'string') ?item[4].trim() :item[4] ,
      prixDirhams : (typeof item[5] == 'string') ?item[5].trim() :item[5] ,
      specialiteDewey : (typeof item[6] == 'string') ?item[6].trim() :item[6] ,
      depotLegal : (typeof item[7] == 'string') ?item[7].trim() :item[7] ,
      isbn : (typeof item[8] == 'string') ?item[8].trim() :item[8] ,
      colis : (typeof item[9] == 'string') ?item[9].trim() :item[9] ,
      quantite : (typeof item[10] == 'string') ?item[10].trim() :item[10]
    });
    this.showEditCsvItemButton = true;
  }

  setEditEditeurRepresente(item, index){
    this.showRepresentedEditorsSaveBtn = true;
    this.validationForm2.patchValue({
      id : index,
      nomMaisonEdition : item.nomMaisonEdition,
      pays : item.pays,
      email : item.email,
      telephone : item.telephone,
      responsable : item.responsable,
      fax : item.fax,
      adresse : item.adresse,
      siteWeb : item.siteWeb,
      specialite : item.specialite,
      nbrEditionsAutreLangues : item.nbrEditionsAutreLangues,
      branche : item.branche,
      img : item.img,
    });
    let element: HTMLInputElement = document.querySelector("#pspData") as HTMLInputElement;
    element.setAttribute("value", (item.img==null||item.img==undefined)?"":item.img?.name);
    this.setNewDialCodeF2(item.pays);
  }

  setEditPopositionsActivite(item, index){
    this.showPropositionActiviteSaveBtn = true;
    this.validationForm5.patchValue({
      id : index,
      dateProposee : item.dateProposee,
      theme : item.theme,
      participants : item.participants,
      lieuActivite : item.lieuActivite,
      titreLivre : item.titreLivre,
      auteur : item.auteur,
      maisonEdition : item.maisonEdition,
      anneeEdition : item.anneeEdition,
      procuration : item.procuration,
      editeur : item.editeur,
    });
    let element: HTMLInputElement = document.querySelector("#procData") as HTMLInputElement;
    element.setAttribute("value", item.procuration.name);
  }

  openConfirmNewEditeurEdit(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.isForm2Submitted=true;
        if(this.validationForm2.valid){
          this.representedEditorsStep2List[this.validationForm2.get("id").value] = {
            refPublisherRepresented:this.representedEditorsStep2List[this.validationForm2.get("id").value].refPublisherRepresented,
            nomMaisonEdition : this.validationForm2.get("nomMaisonEdition").value,
            pays : this.validationForm2.get("pays").value,
            email :this.validationForm2.get("email").value,
            telephone : this.validationForm2.get("telephone").value,
            responsable : this.validationForm2.get("responsable").value,
            fax : this.validationForm2.get("fax").value,
            adresse : this.validationForm2.get("adresse").value,
            siteWeb : this.validationForm2.get("siteWeb").value,
            specialite : this.validationForm2.get("specialite").value,
            nbrEditionsAutreLangues : this.validationForm2.get("nbrEditionsAutreLangues").value,
            branche : this.validationForm2.get("branche").value,
            img : this.validationForm2.get("img").value,
          };
        }
      }
    }).catch((res) => {

    });
  }

  openConfirmPropositionActiviteEdit(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        if(this.validationForm5.valid){
          this.activityPropositionsStep5List[this.validationForm5.get("id").value] = this.validationForm5.value;
        }
      }
    }).catch((res) => {

    });
  }

  // finishFunction() {
  //   let data = this.createServicePostObject();
  //   if(this.validationForm1.valid && this.csvRecords.length > 0 && this.validationForm4.valid && this.activityPropositionsStep5List.length > 0){
  //     if(this.isMobile){
  //       if(this.representedEditorsStep2List.length > 0){
  //         this.sielService.createNewDemande(data).subscribe((res)=>{
  //           Swal.fire(
  //             {
  //               position: 'center',
  //               title: 'Demande enregistrée avec succès',
  //               text: '',
  //               showConfirmButton: false,
  //               timer: 2000,
  //               icon: 'success'
  //             }
  //           ).then(()=>{
  //             this.wizardForm.goToNextStep();
  //           });
  //         }, (err)=>{
  //           this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
  //         });
  //       }
  //     }else{
  //       this.sielService.createNewDemande(data).subscribe((res)=>{
  //         Swal.fire(
  //           {
  //             position: 'center',
  //             title: 'Demande enregistrée avec succès',
  //             text: '',
  //             showConfirmButton: false,
  //             timer: 2000,
  //             icon: 'success'
  //           }
  //         ).then(()=>{
  //           this.wizardForm.goToNextStep();
  //         })
  //       }, (err)=>{
  //         this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
  //       });
  //     }
  //   }else{
  //     this.snackBar.open("Veuillez remplir tous les champs des étapes du formulaire", this.translate.instant('close'));
  //   }
  // }

  createServicePostObject(){
    // let produitsExposes = this.validationForm1.get("produitsExposes").value.split(",").map((item)=>item.trim());
    let object = {
      "country": this.validationForm1.get("pays").value,
      "email": this.validationForm1.get("email").value,
      "city": this.validationForm1.get("ville").value,
      "phoneNumber": this.validationForm1.get("telephone").value,
      "fax": this.validationForm1.get("fax").value,
      "address": this.validationForm1.get("adresse").value,
      "hallClass": this.validationForm1.get("categorieStand").value,
      "specialization": this.validationForm1.get("specialite").value,
      "numberArabicVersion": this.validationForm1.get("nbrEditionAr").value,
      "numberForeignVersion": this.validationForm1.get("nbrEditionAu").value,
      "companyRepresentative": this.validationForm1.get("representePar").value,
      "presentedMateriels": this.validationForm1.get("produitsExposes").value,
      "wingAreaSquare": this.validationForm1.get("superficie").value,
      "publishingHouseName": this.validationForm1.get("maisonEdition").value,
      // "emailPublishingHouse": this.validationForm1.get("email").value,
      // "numberForeignVersionPublishingHouse": this.validationForm1.get("nbrEditionAu").value,
      "responsibleManagerName": this.validationForm1.get("responsable").value,
      "cin" : this.validationForm1.get("cin").value,
      "activityBranches" : this.validationForm1.get("branches").value,
      "personalPhoneNumber" : this.validationForm1.get("mobile").value,
      "passportExpiration" : this.validationForm1.get("passportExpiration").value,
      "passportType" : this.validationForm1.get("passportType").value,
      "passportNumber" : this.validationForm1.get("passportNumber").value,
      "birthNationality" : this.validationForm1.get("birthNationality").value,
      "personName" : this.validationForm1.get("personName").value,
      "birthDay" : this.validationForm1.get("birthDay").value,
      "birthCountry":this.validationForm1.get("birthCountry").value,
      "hasMultipleRepresented":(this.validationForm1.get("editeursRepresentes").value=='y'?true:false)
    };

    return object;
  }

  editCsvItem(content){
    if(this.validationcsvForm.valid){
      this.openConfirmCsvItemEdit(content);
    }else{
      this.snackBar.open(this.translate.instant('emptyForm'), this.translate.instant('close'));
    }
  }

  addCsvItem(content){
    if(this.validationcsvForm.valid){
      this.openConfirmCsvItemAdd(content);
    }else{
      this.snackBar.open(this.translate.instant('emptyForm'), this.translate.instant('close'));
    }
  }

  openConfirmCsvItemDelete(content, id) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.tmpPublications = this.tmpPublications.filter((item, index)=>(index !== id));
        this.validationcsvForm.patchValue({
          auteur : "",
          titreLivre : "",
          editeur : "",
          anneePublication : "",
          nbrExemplaire : "",
          prixDirhams : "",
          specialiteDewey : "",
          depotLegal : "",
          isbn : "",
          colis : "",
          quantite : ""
        });
      }
      this.showEditCsvItemButton = false;
    }).catch((res) => {

    });
  }

  openConfirmNewDemande(content){
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.showStep5Loader = true;
        this.activityPropositionsStep5List.forEach((item, index)=>{
          let activityPlace = this.lieusActivitee.filter((elm)=>elm.id == item.lieuActivite);
          let object = {
            "proposedDate": item.dateProposee,
            "topic": item.theme,
            "participants": item.participants,
            "activityPlace": activityPlace[0]["code"],
            "bookTitle": item.titreLivre,
            "author": item.auteur,
            "publishingHouse": item.maisonEdition,
            "publishingYear": item.anneeEdition
          }
          this.sielService.addActiviteProposee(object, localStorage.getItem("refExhibitor")).subscribe((response)=>{
            let bodyRepresentedEditor = {
              'documentType' : `PROCURATION_ACTIVITE_PROPOSEE_${index}`,
              'refObject' : response["refActivityProposal"],
              'file' : item["procuration"]
            };
            this.sielService.storeDoc(bodyRepresentedEditor).subscribe((res)=>{

            }, (error)=>{
              this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
            })
          },(error)=>{
            this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          })
        });
        this.showStep5Loader = false;
        this.sielService.validerDemande(localStorage.getItem("refExhibitor")).subscribe((resp)=>{

        },(error)=>{

        });
        Swal.fire(
          {
            position: 'center',
            title: 'Demande enregistrée et validée avec succès',
            text: '',
            showConfirmButton: false,
            timer: 2000,
            icon: 'success'
          }
        ).then(()=>{
        });
        // this.sielService.addActivitesProposees(formattedRepresentedActivityPropositionsList, localStorage.getItem("refExhibitor")).subscribe((response)=>{
        //   Swal.fire(
        //     {
        //       position: 'center',
        //       title: 'Propositions d\'activité ajoutés',
        //       text: '',
        //       showConfirmButton: false,
        //       timer: 2000,
        //       icon: 'success'
        //     }
        //   ).then(()=>{
        //     this.wizardForm.goToNextStep();
        //   });
        // }, (err)=>{
        //   this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
        //   console.log(err);
        // })
      }
      this.showEditCsvItemButton = false;
    }).catch((res) => {

    });
  }

  clearCsvForm(){
    this.showEditCsvItemButton = false;
    this.validationcsvForm.patchValue({
      auteur : "",
      titreLivre : "",
      editeur : "",
      anneePublication : "",
      nbrExemplaire : "",
      prixDirhams : "",
      specialiteDewey : "",
      depotLegal : "",
      isbn : "",
      colis : "",
      quantite : ""
    });
  }

  clearForm2(){
    this.isForm2Submitted=false;
    this.validationForm2.patchValue({
      nomMaisonEdition : '',
      pays : 'MA',
      email : '',
      telephone : '',
      responsable : '',
      fax : '',
      adresse : '',
      siteWeb : '',
      specialite : '',
      nbrEditionsAutreLangues : '',
      branche : '',
      img : '',
    });
    this.selectedDialCodeF2 = "212";
    let element: HTMLInputElement = document.querySelector("#pspData") as HTMLInputElement;
    element.setAttribute("value", "");
    this.showRepresentedEditorsSaveBtn = false;
  }

  clearForm5(){
    this.validationForm5.patchValue({
      id : '',
      dateProposee : '',
      theme : '',
      participants : '',
      lieuActivite : '1',
      titreLivre : '',
      auteur : '',
      maisonEdition : '',
      anneeEdition : '',
      procuration : '',
      editeur : '',
    });
    let element: HTMLInputElement = document.querySelector("#procData") as HTMLInputElement;
    element.value = "";
  }
//-----------------
  goToThirdStep(){
    if(localStorage.getItem("refExhibitor")){
      if(this.representedEditorsStep2List.length > 0){
        this.dataSent=true;
        let listRepresentedToSend = [];
        // refExhibitor
          this.representedEditorsStep2List.forEach((item, index)=>{
            let object = {
              "refPublisherRepresented": item.refPublisherRepresented,
              "name": item.nomMaisonEdition,
              "country": item.pays,
              "email": item.email,
              "phoneNumber": item.telephone,
              "responsibleName": item.responsable,
              "fax": item.fax,
              "address": item.adresse,
              "webSite": item.siteWeb,
              "specialization": item.specialite,
              "numberForeignPublishing": item.nbrEditionsAutreLangues
            };
            if(item.img!=null)
            {
              console.log(item["img"]);
                object["photoScanned"]={
                  "documentType": "",
                  "file": item["img"]
                };
            }
            listRepresentedToSend.push(object);
          });
          this.sielService.updateEditeursRepresentesAdapted(listRepresentedToSend,this.refExibitor).subscribe(response=>{
              Swal.fire(
                {
                  position: 'center',
                  title: 'Editeurs representés ajoutés',
                  text: '',
                  showConfirmButton: false,
                  timer: 2000,
                  icon: 'success'
                }
              ).then(()=>{
                this.canEnterSteps.step3 = true;
                setTimeout(()=>{
                  this.wizardForm.goToNextStep();
                }, 1000);
              });
              this.dataSent=false;
          },err=>{
            console.log(err);
            this.dataSent=false;
          })
          
      }else{
        this.snackBar.open(this.translate.instant('emptyEditor'), this.translate.instant('close'));
      }
      }else{
        this.snackBar.open(this.translate.instant('emptyFormFirstStep')
, this.translate.instant('close'));
      }
    this.isForm2Submitted = true;
  }


  goToLastStep(content){
    if(localStorage.getItem("refExhibitor")){
      if(this.activityPropositionsStep5List.length > 0){
        this.openConfirmNewDemande(content);
      }
      if(this.activityPropositionsStep5List.length <= 0){
        this.snackBar.open(this.translate.instant('proposalActivityEmpty'), this.translate.instant('close'));
        this.showStep5Loader = false;
      }
    }else{
      this.snackBar.open(this.translate.instant('emptyFormFirstStep')
, this.translate.instant('close'));
      this.showStep5Loader = false;
    }
    this.isForm5Submitted = true;
  }


  openConfirmCsvItemEdit(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        if(this.validationcsvForm.valid){
          let newList = this.tmpPublications.map((item, index)=>{
            if(this.validationcsvForm.get("id").value == index){
              item = [
                this.validationcsvForm.get("auteur").value,
                this.validationcsvForm.get("titreLivre").value,
                this.validationcsvForm.get("editeur").value,
                this.validationcsvForm.get("anneePublication").value,
                this.validationcsvForm.get("nbrExemplaire").value,
                this.validationcsvForm.get("prixDirhams").value,
                this.validationcsvForm.get("specialiteDewey").value,
                this.validationcsvForm.get("depotLegal").value,
                this.validationcsvForm.get("isbn").value,
                this.validationcsvForm.get("colis").value,
                this.validationcsvForm.get("quantite").value,
              ];
            }
            return item;
          });
          this.tmpPublications = newList;
        }
        this.showEditCsvItemButton = false;
        this.clearCsvForm();
      }
    }).catch((res) => {

    });
  }

  openConfirmCsvItemAdd(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        if(this.validationcsvForm.valid){
          let newItem = [
            this.validationcsvForm.get("auteur").value,
            this.validationcsvForm.get("titreLivre").value,
            this.validationcsvForm.get("editeur").value,
            this.validationcsvForm.get("anneePublication").value,
            this.validationcsvForm.get("nbrExemplaire").value,
            this.validationcsvForm.get("prixDirhams").value,
            this.validationcsvForm.get("specialiteDewey").value,
            this.validationcsvForm.get("depotLegal").value,
            this.validationcsvForm.get("isbn").value,
            this.validationcsvForm.get("colis").value,
            this.validationcsvForm.get("quantite").value,
          ];
         let newList = this.tmpPublications;
         newList.push(newItem);
         this.tmpPublications = newList;
         this.clearCsvForm();
         this.showEditCsvItemButton = false;
         this.showCsvTable = true;
        }
      }
    }).catch((res) => {});
  }


  openFileRecapDemandeBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#recapDemandeFile") as HTMLElement;
    element.click();
  }

  handleFileRecapDemandeInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#recapDemandeFile + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName);
      this.validationRecapForm1.patchValue({
        recap : event.target.files[0]
      });
    }
  }

  openFileRecapStandDataBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#recapStandDataFile") as HTMLElement;
    element.click();
  }

  handleFileRecapStandDataInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#recapStandDataFile + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      this.validationRecapStand.patchValue({
        recap : event.target.files[0]
      });
    }
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

    /**
   * Returns form
   */
     get form3() {
      return this.validationForm3.controls;
    }

      /**
     * Returns form
     */
     get form4() {
      return this.validationForm4.controls;
    }

      /**
     * Returns form
     */
       get form5() {
        return this.validationForm5.controls;
      }

            /**
     * Returns form
     */
        get formCsv() {
        return this.formCsv;
      }

                  /**
     * Returns form
     */
        get formRecap() {
        return this.validationRecapForm1.controls;
      }
      get formRecapStand() {
        return this.validationRecapStand.controls;
      }

  /**
   * Go to next step while form value is valid
   */

   download()
   {
      this.openDemandeRecap(this.refExibitor);
   }

    openDemandeRecap(refExhibitor){
      this.dataSent = true;
      let object = {
        "refExhibitor" : refExhibitor,
        "language" : this.languageService.userLanguage
      }
      this.sielService.getRecapDemande(object).subscribe((response)=>{
        /*let objectUrl = URL.createObjectURL(response);
        let link = document.createElement('a');
        link.href = objectUrl;
        link.setAttribute("download", "file");
        link.click();
        // window.open(objectUrl);
        this.dataSent = false;
        localStorage.setItem("refExhibitor", refExhibitor);
        /*this.modalService.open(this.recapDemandeParticipation, {centered: true}).result.then((result) => {
          if(result == "save"){
            console.log(this.validationRecapForm1.valid);
            console.log(this.validationRecapForm1.value);
          }
        }).catch((res) => {
        });*/
      }, (error)=>{
        this.dataSent = false;
      });

    }

    alertFirstStep()
    {
      Swal.fire(
        {
          position: 'center',
          title: "Succès",
          text: "Demande d'exposant est "+(this.refExibitor?"modifiée":"ajoutée")+".",
          showConfirmButton: false,
          timer: 2000,
          icon: 'success'
        }
      ).then(()=>{
        setTimeout(()=>{
          let recapDocUpdate = this.documentAlreadySent.find(d=>d.nature=="RECAP_REQUEST_EXHIBITION");
          if(recapDocUpdate!=undefined)
          {
            let element: HTMLElement = document.querySelector("#recapDemandeFile + .input-group .file-upload-info") as HTMLElement;
            element.setAttribute( 'value', recapDocUpdate?.name);
            this.documentFlags.RECAP_REQUEST_EXHIBITION=true;
          }
          
          if(!this.showCinFirstStep)
          {
            let passport1DocUpdate = this.documentAlreadySent.find(d=>d.nature=="PASSPORT1");
            if(passport1DocUpdate!=undefined)
            {
              let element: HTMLElement = document.querySelector("#ppr1 + .input-group .file-upload-info") as HTMLElement;
              element.setAttribute( 'value', passport1DocUpdate?.name);
              this.documentFlags.PASSPORT1=true;
            }
            let passport2DocUpdate = this.documentAlreadySent.find(d=>d.nature=="PASSPORT2");
            if(passport2DocUpdate!=undefined)
            {
              let element: HTMLElement = document.querySelector("#ppr2 + .input-group .file-upload-info") as HTMLElement;
              element.setAttribute( 'value', passport2DocUpdate?.name);
              this.documentFlags.PASSPORT2=true;
            }
          }
          this.wizardForm.goToNextStep();
        }, 1000);
      });
    }

    finishingFirstStep(refExibitor:string,flag:boolean=false)
    {
      this.showStep1Loader = false;
      this.dataSent=false;
      this.canEnterSteps.step11=true;
      if(this.validationForm1.get("editeursRepresentes").value=="n")
      {
        this.showSecondStep=false;
      }
      if(flag)
        this.sielService.checkDocumentExistance(refExibitor).subscribe(response=>{
          this.documentAlreadySent=response;
          this.alertFirstStep();
        },err=>{
          this.alertFirstStep();
        });
      else
      {
        this.alertFirstStep();
      }
    }

    handleFirstStep(res,userData){
      
        if(!this.refExibitor)
          this.sielService.createAccount(userData.user,res["refExhibitor"]).subscribe((re)=>{
              this.finishingFirstStep(res["refExhibitor"]);
          },(err)=>{
            this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
            this.showStep1Loader = false;
          });
        else
          {
            this.finishingFirstStep(res["refExhibitor"],true);
          }
    }

    sendFirstStepRequest() {
      this.showStep1Loader = true;
      let userData = JSON.parse(localStorage.getItem("userData"));
      let data = this.createServicePostObject();
      if(!this.refExibitor)
        this.sielService.createNewDemande(data).subscribe((res)=>
        {
          this.handleFirstStep(res,userData);
          this.refExibitor=res["refExibitor"];
        }, (err)=>{
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          this.showStep1Loader = false;
          this.dataSent=false;
        });
      else 
      {
        data["refExhibitor"]=this.refExibitor;
        this.sielService.updateDemande(data).subscribe((res)=>
        {
          this.handleFirstStep(res,userData);
        }, (err)=>{
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          this.showStep1Loader = false;
          this.dataSent=false;
        });
      }
  }

  changeShowSecondStep(e){
    if(e.target.value == "n"){
      this.showSecondStep = false;
    }else{
      this.showSecondStep = true;
    }
  }

  form1Submit() {
    this.dataSent=true;
    if(this.showCinFirstStep){
      this.validationForm1.controls['cin'].setValidators([Validators.required]);
      this.validationForm1.controls['passportExpiration'].clearValidators();
      this.validationForm1.controls['passportType'].clearValidators();
      this.validationForm1.controls['passportNumber'].clearValidators();
      this.validationForm1.controls['birthNationality'].clearValidators();
      this.validationForm1.controls['personName'].clearValidators();
      this.validationForm1.controls['birthDay'].clearValidators();
      this.validationForm1.controls['birthCountry'].clearValidators();
    }else{
      this.validationForm1.controls['cin'].clearValidators();
      this.validationForm1.controls['passportExpiration'].setValidators([Validators.required]);
      this.validationForm1.controls['passportType'].setValidators([Validators.required]);
      this.validationForm1.controls['passportNumber'].setValidators([Validators.required]);
      this.validationForm1.controls['birthNationality'].setValidators([Validators.required]);
      this.validationForm1.controls['personName'].setValidators([Validators.required]);
      this.validationForm1.controls['birthDay'].setValidators([Validators.required]);
      this.validationForm1.controls['birthCountry'].setValidators([Validators.required]);
    }
    this.validationForm1.controls['cin'].updateValueAndValidity();
    this.validationForm1.controls['passportExpiration'].updateValueAndValidity();
    this.validationForm1.controls['passportType'].updateValueAndValidity();
    this.validationForm1.controls['passportNumber'].updateValueAndValidity();
    this.validationForm1.controls['birthNationality'].updateValueAndValidity();
    this.validationForm1.controls['personName'].updateValueAndValidity();
    this.validationForm1.controls['birthDay'].updateValueAndValidity();
    this.validationForm1.controls['birthCountry'].updateValueAndValidity();
    if(this.validationForm1.valid) {
      this.sendFirstStepRequest();
    }
    else
    {
      this.dataSent=false;
      this.snackBar.open(this.translate.instant('emptyForm'), this.translate.instant('close'));
    }
    this.isForm1Submitted = true;

  }

  /**
   * Go to next step while form value is valid
  */
  form2Submit() {
    if(this.validationForm2.valid) {
      this.representedEditorsStep2List.push(this.validationForm2.value);
    }else{
      this.snackBar.open(this.translate.instant('emptyForm'), this.translate.instant('close'));
      this.isForm2Submitted = true;
    }
  }

  formRecapDemande() {
    //TODO
    if(this.documentFlags.RECAP_REQUEST_EXHIBITION)
    {
      this.validationRecapForm1.controls['recap'].clearValidators();
      this.validationRecapForm1.controls['recap'].updateValueAndValidity();
    }
    this.dataSent=true;
      if(!this.showCinFirstStep){
        if(!this.documentFlags.PASSPORT1)
          this.validationRecapForm1.controls['img1'].setValidators([Validators.required]);
        if(!this.documentFlags.PASSPORT2)
          this.validationRecapForm1.controls['img2'].setValidators([Validators.required]);
      }else{
        this.validationRecapForm1.controls['img1'].clearValidators();
        this.validationRecapForm1.controls['img2'].clearValidators();
      }
      this.validationRecapForm1.controls['img1'].updateValueAndValidity();
      this.validationRecapForm1.controls['img2'].updateValueAndValidity();
    if(this.validationRecapForm1.valid) {
        let refToSend = localStorage.getItem("refExhibitor");
        let bodyRepresentedEditor = {
          'documentType' : 'RECAP_REQUEST_EXHIBITION',
          'refObject' : refToSend,
          'refParent' : refToSend,
          'file' : this.validationRecapForm1.get("recap").value
        }
        let bodyImg1 = {
          'documentType' : 'PASSPORT1',
          'refObject' : refToSend,
          'refParent' : refToSend,
          'file' : this.validationRecapForm1.get("img1").value
        };
        let bodyImg2 = {
          'documentType' : 'PASSPORT2',
          'refObject' : refToSend,
          'refParent' : refToSend,
          'file' : this.validationRecapForm1.get("img2").value
        };
      let requestToSend = [];
      let liberate={};
      if(this.documentFlags.RECAP_REQUEST_EXHIBITION&&this.validationRecapForm1.get("recap").value)
      {
          requestToSend.push(
            this.sielService.updateDoc(
            {
              'file':this.validationRecapForm1.get("recap").value,
              'refDocument':this.documentAlreadySent.find(d=>d.nature=="RECAP_REQUEST_EXHIBITION").refDocument
            })
          );
          liberate["recap"]=null;
      }
      else if(!this.documentFlags.RECAP_REQUEST_EXHIBITION)
      {
          requestToSend.push(this.sielService.storeDoc(bodyRepresentedEditor));
          liberate["recap"]=null;
          this.validationRecapForm1.controls['recap'].clearValidators();
          this.validationRecapForm1.controls['recap'].updateValueAndValidity();
      }
      
      if(this.documentFlags.PASSPORT1&&this.validationRecapForm1.get("img1").value&&!this.showCinFirstStep)
      {
          requestToSend.push(
            this.sielService.updateDoc(
            {
              'file':this.validationRecapForm1.get("img1").value,
              'refDocument':this.documentAlreadySent.find(d=>d.nature=="PASSPORT1").refDocument
            })
          );
          liberate["img1"]=null;
      }
      else if(!this.documentFlags.PASSPORT1&&!this.showCinFirstStep)
      {
          requestToSend.push(this.sielService.storeDoc(bodyImg1));
          liberate["img1"]=null;
          this.validationRecapForm1.controls['img1'].clearValidators();
          this.validationRecapForm1.controls['img1'].updateValueAndValidity();
      }

      if(this.documentFlags.PASSPORT2&&this.validationRecapForm1.get("img2").value&&!this.showCinFirstStep)
      {
          requestToSend.push(
            this.sielService.updateDoc(
            {
              'file':this.validationRecapForm1.get("img2").value,
              'refDocument':this.documentAlreadySent.find(d=>d.nature=="PASSPORT2")?.refDocument
            })
          );
          liberate["img2"]=null;
      }
      else if(!this.documentFlags.PASSPORT2&&!this.showCinFirstStep)
      {
          requestToSend.push(this.sielService.storeDoc(bodyImg2));
          liberate["img2"]=null;
          this.validationRecapForm1.controls['img2'].clearValidators();
          this.validationRecapForm1.controls['img2'].updateValueAndValidity();
      }
      const finishing = (timeout=1000)=>
      {
        this.sielService.getEditeursRepresentes(this.refExibitor).subscribe(response=>{
          this.representedEditorsStep2List=this.sielService.publisherResponseMapper(response);
          this.dataSent=false;
          if(this.showSecondStep)
            this.canEnterSteps.step2 = true;
          else
            this.canEnterSteps.step3=true;
          setTimeout(()=>{
              this.wizardForm.goToNextStep();
            }, timeout);
        },err=>{
          this.dataSent=false;
          console.log(err);
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
        });
        
      }
      if(requestToSend.length==0)
      {
        finishing(100);
      }
      forkJoin(requestToSend).subscribe(data=>{
        finishing();
        this.validationRecapForm1.patchValue(liberate);
        if(Array.isArray(data))
        {
          data.forEach(d=>{
            if(typeof d == "object")
            {
              if(d["refDocument"]!=undefined&&d["refDocument"]!=null)
              {
                this.documentFlags[d["nature"]]=true;
                this.documentAlreadySent.push(d);
              }
            }
          });
        }
      },err=>{
        this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
        this.dataSent = false;
      });
      /*this.sielService.storeDoc(bodyRepresentedEditor).subscribe((res)=>{
        this.canEnterSteps.step2 = true;
        if(!this.showCinFirstStep)
        {
            
            this.sielService.storeDoc(bodyImg1).subscribe((response1)=>{
              this.sielService.storeDoc(bodyImg2).subscribe((response2)=>{
                  
                    setTimeout(()=>{
                      console.log("go to next step");
                      this.wizardForm.goToNextStep();
                      this.dataSent=false;
                    }, 1000);
              }, (error)=>{
                this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
                this.dataSent = false;
              });
            },(err)=>{
              this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
              this.dataSent = false;
            });
      }
      else
      {
        setTimeout(()=>{
          console.log("go to next step");
          this.wizardForm.goToNextStep();
          this.dataSent=false;
        }, 1000);
      }
      }, (error)=>{
        this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          this.dataSent=false;
      })*/
    }
    else
      this.dataSent=false;
    this.isRecapForm1 = true;
  }

  formRecapStandDoc() {
    if(this.validationRecapStand.valid) {
      let refToSend=localStorage.getItem("refExhibitor");
      let bodyRepresentedEditor = {
        'documentType' : 'Recap demande stand',
        'refObject' : refToSend,
        'refParent' : refToSend,
        'file' : this.validationRecapForm1.get("recap").value
      };
      this.sielService.storeDoc(bodyRepresentedEditor).subscribe((res)=>{
        this.canEnterSteps.step5 = true;
        setTimeout(()=>{
          console.log("go to next step");
          this.wizardForm.goToNextStep();
        }, 1000);
        this.modalService.dismissAll();
      }, (error)=>{
        this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
      })
    }
    this.isRecapForm1 = true;
  }


  // activityPropositionsStep5List

  openConfirmListRepresentativesDelete(content, index) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.representedEditorsStep2List = this.representedEditorsStep2List.filter((item, i)=>(i != index && item));
      }
    }).catch((res) => {

    });
  }

  openConfirmListActivityDelete(content, index) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.activityPropositionsStep5List = this.activityPropositionsStep5List.filter((item, i)=>(i != index && item));
      }
    }).catch((res) => {

    });
  }

  // validateDemande(){

  // }

  form3Submit() {
    // if(this.validationForm3.valid) {
    //   this.wizardForm.goToNextStep();
    // }
    // this.isForm3Submitted = true;
    if(this.tmpPublications.length > 0){
      this.showStep3Loader = true;
      let body = this.tmpPublications.map((item)=>{
        return   {
          "refPublication": "string",
          "author": item[0],
          "title": item[1],
          "publishingDate": item[3],
          "publisher": item[2],
          "copiesNbr": parseInt(item[5]),
          "amout": parseInt(item[10]),
          "speciality": item[6],
          "isbn": item[8],
          "legalDeposit": item[7],
          "colis": item[10],
        };
      });

      let refExhibitor = localStorage.getItem("refExhibitor") ?? "";

      if(refExhibitor != ""){
        this.sielService.modifyPublication(body, refExhibitor).subscribe((response)=>{
          Swal.fire(
            {
              position: 'center',
              title: 'Publications enregistrés avec succès',
              text: '',
              showConfirmButton: false,
              timer: 2000,
              icon: 'success'
            }
          ).then(()=>{
            this.canEnterSteps.step4 = true;
            //TODO
            setTimeout(()=>{
              this.wizardForm.goToNextStep();
            }, 1000);
            this.showStep3Loader = false;
          });
          this.showStep3Loader = false;
        }, (err)=>{
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          this.showStep3Loader = false;
        });
      }else{
        this.snackBar.open(this.translate.instant('emptyFormFirstStep')
, this.translate.instant('close'));
        this.showStep3Loader = false;
      }

    }else{
      this.snackBar.open(this.translate.instant('emptyFile'), this.translate.instant('close'));
      this.showStep3Loader = false;
    }
  }

  openRecapStandDataParticipation() {
    let object = {
      "refExhibitor" : localStorage.getItem("refExhibitor"),
      "language" : this.languageService.userLanguage
    }
    this.sielService.getRecapStand(object).subscribe((response)=>{
      let objectUrl = URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute("download", "file");
      link.click();
      // window.open(objectUrl);
      this.showStep4Loader = false;
      this.modalService.open(this.recapDemandeParticipation, {centered: true}).result.then((result) => {
        if(result == "save"){
          console.log(this.validationForm4.valid);
          console.log(this.validationForm4.value);
        }
      }).catch((res) => {
      });
    }, (error)=>{
      this.showStep4Loader = false;
      console.log(error);
    });
  }
    // volumeM3 : ['', Validators.required],
  // categorieStand : ['', Validators.required],
  // modePaiement : ['', Validators.required],
  form4Submit() {
    if(this.validationForm4.valid) {
      this.showStep4Loader = true;
      let body = {
        "volumeInCubicMeter": this.validationForm4.get("volumeM3").value,
        "category": this.validationForm4.get("categorieStand").value,
        "paymentMethod": this.validationForm4.get("modePaiement").value,
        "branchActivity": "string"
      };
      if(localStorage.getItem("refExhibitor")){
        this.sielService.bookStand(body, localStorage.getItem("refExhibitor")
        ).subscribe((res)=>{
          this.openRecapStandDataParticipation();

        }, (err)=>{
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          this.showStep4Loader = false;
        });
      }else{
        this.snackBar.open(this.translate.instant('emptyFormFirstStep'), this.translate.instant('close'));
        this.showStep4Loader = false;
      }
    }
    this.isForm4Submitted = true;
  }

  form5Submit() {
    if(this.validationForm5.valid) {
      this.activityPropositionsStep5List.push(this.validationForm5.value);
    }else{
      this.clearForm5();
      this.snackBar.open(this.translate.instant('emptyForm'), this.translate.instant('close'));
      this.isForm5Submitted = true;
    }
  }
}
