import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WizardComponent as BaseWizardComponent} from 'angular-archwizard';
import {Router} from '@angular/router';
import {LanguageService} from 'src/app/services/language/language.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxCsvParser} from 'ngx-csv-parser';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BackendService} from 'src/app/services/siel/exposant/Backend/BackendService.service';
import {forkJoin} from 'rxjs';
import {COUNTRIES} from 'src/app/lists/countries';
import {PASSPORTS_TYPE} from 'src/app/lists/passportsType';
import {SUPERFICIES} from 'src/app/lists/superficies';
import {STAND_TYPES} from 'src/app/lists/StandTypes';
import {BRANCHES} from 'src/app/lists/branches';
import {LIEUX_ACTIVITES} from 'src/app/lists/lieuxActivitee';
import {MODES_PAIEMENT} from 'src/app/lists/modePaiement';
import {PRODUITS_EXPOSES} from 'src/app/lists/produitsExposes';
import {SielService} from 'src/app/services/siel/exposant/siel.service';
import {TranslateService} from '@ngx-translate/core';
import Swal from 'sweetalert2';
import {HandleRequestService} from 'src/app/services/shared/handle-request.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const user = JSON.parse(localStorage.getItem("userData"));


class Step1Data {
  refExhibitor?: string;
  publishingHouseName?:string;
  country:string;
  email:string;
  responsibleManagerName:string;
  city:string;
  phoneNumber:string;
  personalPhoneNumber:string;
  fax:string;
  address:string;
  specialization:string;
  numberArabicVersion:any;
  numberForeignVersion:number;
  companyRepresentative:string;
  personName:string;
  birthDay:any;
  birthNationality:any;
  passportNumber:string;
  passportExpiration :string;
  passportType : string;
  presentedMateriels?:any;
  hasMultipleRepresented?:Boolean;
  hasMultipleForiegen?:Boolean;
  activityBranches?:any;
  cin?:any;
  hallClass:string;
  birthCountry:any;
  wingAreaSquare:any;
  constructor(){
    const user_d = JSON.parse(localStorage.getItem("userData"));

    this.country="MA";
    this.hasMultipleRepresented=false;
    this.hasMultipleForiegen=false;
    this.email = user_d?.user?user_d.user:"";
    this.responsibleManagerName =  user_d?.fullname?user_d.fullname:"";
  }
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];

  }
}

class Step1BData {
  refForeignRepresented?:string;
  personName:string;
  birthDay:any;
  birthCountry:any;
  passportNumber:string;
  passportExpiration :string;
  passportType : string;
  birthNationality:any;
  PASSPORT1?:any;
  PASSPORT2?:any;
  TITRE_VOYAGE?:any;
  constructor(){
    this.PASSPORT1={file:null,value:"",refDocument:""};
    this.PASSPORT2={file:null,value:"",refDocument:""};
    this.TITRE_VOYAGE={file:null,value:"",refDocument:""};
  }
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];
  }
}

class Step2Data {
  refPublisherRepresented?:any;
  name ?:any;
  country ?:any;
  email ?:any;
  phoneNumber ?:any;
  responsibleName ?:any;
  fax ?:any;
  address ?:any;
  webSite ?:any;
  specialization ?:any;
  numberForeignPublishing ?:any;
  activityBranches ?:Array<any>;
  img ?:any;
  filename?:any;
  constructor(){
    this.country="MA";
    this.filename="";
  }
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];
  }

}

class StepPublicationData{
  refPublication?:any;
  author?:any;
  publishingDate?:any;
  title?:any;
  publisher?:any;
  copiesNbr?:any;
  amout?:any;
  speciality?:any;
  isbn?:any;
  legalDeposit?:any;
  colis?:any;
  constructor(){
    this.colis=4;
  }
  setObject(arr:any){
    for(let i of Object.keys(arr)){
      this[i]=arr[i];
    }
  }

}

class Step4Data {
  refBookingStand?:any;
  volumeInCubicMeter ?:any;
  category?:any;
  paymentMethod?:any;
  branchActivity?:any;
  constructor(){
    this.branchActivity="MA";
    this.volumeInCubicMeter=12;
  }
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];
  }
}

class Step5Data {
  refActivityProposal?:any;
  publishingHouse?:any;
  proposedDate?:string;
  topic?:any;
  activityPlace?:any;
  bookTitle?:any;
  author?:any;
  publishingYear?:any;
  editeur?:any;
  participants?:any;
  constructor(){
    this.activityPlace="1"
  }
  setObject(arr:any){
    for(let i of Object.keys(arr))
      this[i]=arr[i];
  }
}

@Component({
  selector: 'app-demande-exposant',
  templateUrl: './demande-exposant.component.html',
  styleUrls: ['./demande-exposant.component.scss']
})

export class DemandeExposantComponent implements OnInit {

  /*****    Fome Group for validation     *****/
  validationForm0: FormGroup;
  validationForm1: FormGroup;
  validationForm1B: FormGroup;
  validationForm2: FormGroup;
  validationForm3: FormGroup;
  validationForm4: FormGroup;
  validationForm5: FormGroup;


  page:any=0;//to remove


  paginationPage:any=0;
  paginationSize:any=10;

  /*****    Submit Data     *****/
  dataStep1=new Step1Data();
  dataStep1B=new Step1BData();
  dataStep1BArray:Array<Step1BData>=[];
  dataStep2=new Step2Data();
  dataStep2Array:Array<Step2Data>=[];
  dataPublicationStep = new StepPublicationData();
  dataPublicationArray:Array<StepPublicationData>=[];
  editiPublication=false;

  erreurImportPublication=[];
  dataStep4=new Step4Data();
  dataStep5=new Step5Data();
  dataStep5Array:Array<Step5Data>=[];

  /*****    Flags     *****/
  isLoded:Boolean=false;
  isLodedAllPage:Boolean=false;
  isDisabled:Boolean=false;
  isFormSubmitted:Boolean=false;
  isModification:Boolean=false;
  disableLoadModal:Boolean=true;
  isLodedPage3:any=-1;
  iseditablePage3:Boolean=false;
  ibnsError:Boolean=false;

  /*****   Inputs : Generation in HTML by *ngFor    *****/
  inputsStep1;
  inputsStep2:Array<any>;
  inputsStepPublication;
  inputsStep5:Array<any>;

  Files = ["RECAP_REQUEST_EXHIBITION","PASSPORT1","PASSPORT2","TITRE_VOYAGE"];

  initinputsStep2= ()=>{
    let x = [];
    let data =[];
    let i = 0;
    //console.log(this.Files)
    for(let k of this.Files){
      if(this.inputsStep2!=null&&this.inputsStep2[i]!=null)
        x.push(this.inputsStep2[i])
      else
        x.push({file:null,documentType:k,key:k,data:{name:"",refDocument:""}});
      i++;
      if(k=="PASSPORT2")
        data["PASSPORT2"]=[];
      else
        data[k]=[null, Validators.required];
    }
    // if(this.Files.includes("")){

    // }
    this.inputsStep2=[...x];
    this.validationForm1 = this.formBuilder.group({...data});
    console.log(this.inputsStep2 )
    //console.log(this.inputsStep2)
  }

  /*****   Select Variable     *****/
  countries = COUNTRIES;
  passportsType=PASSPORTS_TYPE;
  superficies = SUPERFICIES;
  typesStand = STAND_TYPES;
  branches = BRANCHES;
  modesPaiement = MODES_PAIEMENT;
  lieusActivitee = LIEUX_ACTIVITES;
  prodsExposes = PRODUITS_EXPOSES;

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;
  @ViewChild('recapDemandeParticipation') recapDemandeParticipation;
  @ViewChild('recapStandData') recapStandData;
  @ViewChild('csvSrvFileErrors') csvSrvFileErrors;
  @ViewChild('xlModal') xlModal;

  user:any;
  verticalCenteredModalCode: any;
  currentYear = new Date().getFullYear();
  expiredEdition =false;

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private ngxCsvParser: NgxCsvParser, private modalService: NgbModal, private snackBar:MatSnackBar, public  languageService: LanguageService, private sielService: SielService, private router:Router,private translate: TranslateService,private backendService:BackendService,private handleRequestService:HandleRequestService) {
  this.user  = JSON.parse(localStorage.getItem("userData"));
  this.sielService.verifierEditionDispo().subscribe((response)=>{
      this.expiredEdition =!response;
  });
  this.initData();
  this.initFormValidator();
  }
  ngOnInit(): void {
  }
  showBranches(d){
    let x = BRANCHES.filter(a=>a.id==d);
    if(x.length>0){
      if(this.languageService.userLanguage=="fr")
       return x[0].name;
       else
       return x[0].nameAr;
    }
    return null;
  }
  onInitAllData(){
    if(!this.isLodedAllPage)
      if(!this.isDisabled && !this.isFormSubmitted)
        setTimeout(() => {
          this.onFormSubmit()
        }, 500);
  }
  initData(){
    this.initFomePublication()
    this.sielService.checkUpdateExibitor(this.user.user)
    .subscribe(exhibData=>{
      if(exhibData!=null)
        this.dataStep1.setObject(exhibData);
      if(exhibData.refExhibitor!=null){
        if(exhibData.status!='VALID_SUBSCRIPTION'){
          this.initFome1();
          this.initFormValidator();
          this.sielService.getAllDocs(exhibData.refExhibitor)
            .subscribe(r=>{
              if(r.length>0){
                for (let e of r) {
                  let i = this.Files.indexOf(e.nature);
                  if(i>-1)
                    this.inputsStep2[i].data=e;
                }
              }
              this.isLoded=true;
              this.onInitAllData();
            })
        }else{
          this.router.navigate(['exposant/exposant-demande-details']);
        }
      }
      else{
        this.dataStep1=new Step1Data();
        this.initFome1();
        this.initFormValidator();
        this.isLoded=true;
        this.isLodedAllPage=true;
      }
    });
    this.initFome5();
  }
  initFome1(){
   this.inputsStep1 = [
      {label:"F_NDE_PublishingHouse",type:"text",ngModel: this.dataStep1.publishingHouseName,onChange:(e)=>{this.dataStep1.publishingHouseName=e;},formControlName:"publishingHouseName",placeHolder:"F_NDE_PublishingHouse_Description"},
      {label:"F_NDE_PersonInCharge",type:"text",ngModel: this.dataStep1.responsibleManagerName,onChange:(e)=>{this.dataStep1.responsibleManagerName=e},formControlName:"responsibleManagerName",placeHolder:"F_NDE_PersonInCharge_Description"},
      {label:"F_NDE_Email",type:"email",ngModel: this.dataStep1.email,onChange:(e)=>{this.dataStep1.email=e},formControlName:"email",placeHolder:"F_NDE_Email_Description"},
      {label:"F_NDE_Address",type:"text",ngModel: this.dataStep1.address,onChange:(e)=>{this.dataStep1.address=e},formControlName:"address",placeHolder:"F_NDE_Address_Description"},
      {label:"F_NDE_City",type:"text",ngModel: this.dataStep1.city,onChange:(e)=>{this.dataStep1.city=e},formControlName:"city",placeHolder:"F_NDE_City_Description"},
      {label:"F_NDE_Speciality",type:"text",ngModel: this.dataStep1.specialization,onChange:(e)=>{this.dataStep1.specialization=e},formControlName:"specialization",placeHolder:"F_NDE_Speciality_Description"},
      {label:"F_NDE_NumberEditionsOtherLangs",type:"number",ngModel: this.dataStep1.numberArabicVersion,onChange:(e)=>{this.dataStep1.numberArabicVersion=e},formControlName:"numberArabicVersion",placeHolder:"F_NDE_NumberEditionsOtherLangs_Description"},
      {label:"F_NDE_NumberEditions",type:"number",ngModel: this.dataStep1.numberForeignVersion,onChange:(e)=>{this.dataStep1.numberForeignVersion=e},formControlName:"numberForeignVersion",placeHolder:"F_NDE_NumberEditions_Description"},
      {label:"F_NDE_Representants",type:"text",ngModel: this.dataStep1.companyRepresentative,onChange:(e)=>{this.dataStep1.companyRepresentative=e},formControlName:"companyRepresentative",placeHolder:"F_NDE_Representants_Description"},
    ];
  }
  initFome5(){
    this.inputsStep5 = [
      {label:"F_NDE_PublishingHouse",type:"text",onChange:(e)=>{this.dataStep5.publishingHouse=e;},formControlName:"publishingHouse",placeHolder:"F_NDE_PublishingHouse_Description"},
      {label:"F_PropositionActivite_Theme",type:"text",onChange:(e)=>{this.dataStep5.topic=e;},formControlName:"topic",placeHolder:"F_PropositionActivite_Theme_Description"},
      {label:"F_PropositionActivite_Participants",type:"text",onChange:(e)=>{this.dataStep5.participants=e;},formControlName:"participants",placeHolder:"F_PropositionActivite_Participants_Description"},
      {label:"F_PropositionActivite_TitreLivre",type:"text",onChange:(e)=>{this.dataStep5.bookTitle=e;},formControlName:"bookTitle",placeHolder:"F_PropositionActivite_TitreLivre_Description"},
      {label:"F_OuvragesPourSalon_Auteur",type:"text",onChange:(e)=>{this.dataStep5.author=e;},formControlName:"author",placeHolder:"F_OuvragesPourSalon_Auteur_Description"},
      {label:"F_OuvragesPourSalon_Editeur",type:"text",onChange:(e)=>{this.dataStep5.editeur=e;},formControlName:"editeur",placeHolder:"F_OuvragesPourSalon_Editeur_Description"},
      {label:"F_PropositionActivite_AnneeEdition",type:"number",onChange:(e)=>{this.dataStep5.publishingYear=e;},formControlName:"publishingYear",placeHolder:"F_PropositionActivite_AnneeEdition"},
    ];
  }

  initFormValidator(){
    let validationElemets1 = ['country','phoneNumber','personalPhoneNumber','fax','hallClass','presentedMateriels','publishingHouseName','responsibleManagerName','city','address','specialization',
    'numberForeignVersion','companyRepresentative','wingAreaSquare','activityBranches','hasMultipleRepresented','cin','passportExpiration','passportType','passportNumber','birthNationality','personName','birthDay','birthCountry'];
    var Validation1AllElement={};
    for(let el of validationElemets1)
      Validation1AllElement[el]=[this.dataStep1[el], Validators.required];
    Validation1AllElement["email"] = [this.dataStep1.email, [Validators.required, Validators.email]];
    Validation1AllElement['hasMultipleForiegen']=[];
    Validation1AllElement['numberArabicVersion']=[];
    this.validationForm0 = this.formBuilder.group({...Validation1AllElement});

    let validationElemets1b=["personName","birthDay","birthCountry","passportNumber","passportExpiration","passportType","birthNationality","PASSPORT1","TITRE_VOYAGE"];
    var Validation1BAllElement={};
    for(let el of validationElemets1b)
    Validation1BAllElement[el]=['', Validators.required];
    Validation1BAllElement['PASSPORT2']=[];

    this.validationForm1B = this.formBuilder.group({...Validation1BAllElement});

    this.validationForm1 = this.formBuilder.group({recap : ['', Validators.required]});
    this.onChangePays(this.dataStep1.country);

    var validationElemets2=['name','country','phoneNumber','responsibleName','fax','address','specialization','numberForeignPublishing','activityBranches','img'];
    var Validation2AllElement={};
    for(let el of validationElemets2)
      Validation2AllElement[el]=[this.dataStep2[el], Validators.required];
    Validation2AllElement['email']=[this.dataStep2.email, [Validators.required,Validators.email]];
    this.validationForm2 = this.formBuilder.group(Validation2AllElement);

    var validationElemets4=['paymentMethod'];
    var Validation4AllElement={};
    for(let el of validationElemets4)
      Validation4AllElement[el]=[this.dataStep4[el], Validators.required];
      Validation4AllElement["category"]=[{value: this.dataStep4["category"], disabled: true},Validators.required];
      this.validationForm4 = this.formBuilder.group(Validation4AllElement);
    var validationElemets5=['proposedDate','topic','participants','activityPlace','bookTitle','author','publishingYear','editeur','publishingHouse'];
    var Validation5AllElement={};
    for(let el of validationElemets5)
      Validation5AllElement[el]=[this.dataStep2[el], Validators.required];
      this.validationForm5 = this.formBuilder.group(Validation5AllElement);
  }
  onFormSubmit(){
    this.isFormSubmitted=true;
    this.isDisabled=true;
    switch (this.page) {
      case 0:
        return this.onSubmit0();
      case 1:
        return this.onSubmit1();
      case 2:
          return this.onSubmit1B();
      case 3:
        return this.onSubmit2();
      case 4:
        return this.onSubmit3();
      case 5:
        return this.onSubmit4();
      case 6:
        return this.onSubmit5();
      case 7:
          return this.onSubmit6();
      default:
        break;
    }
  }
  AfterCheckLastPage(){
    if(!this.isLodedAllPage ){
      this.isLodedAllPage=true;
      this.isDisabled=false;
      this.isFormSubmitted=false;
    }
  }
  getEditeursRepresentes(){
    if(this.dataStep1.hasMultipleForiegen && this.dataStep1.country!="MA" && this.page==1){
      this.getForeigenRepresented();
    }
    else{

      if(this.dataStep1.hasMultipleRepresented)
        this.sielService.getEditeursRepresentes(this.dataStep1.refExhibitor)
        .subscribe(r=>{
          this.dataStep2Array=[];
          if(r){
            for(let el of r){
              let d = new Step2Data();
              d.setObject(el);
              this.dataStep2Array.push(d);
            }
            if(this.page==1) this.page=2;
            this.nextPage();
          }
        },e=>{});
      else{
        this.getExposantPublications(this.dataStep1.refExhibitor);
      }
    }
  }
  getPropsessActivities(){
      this.sielService.getProposedActivities(this.dataStep1.refExhibitor)
      .subscribe(r=>{
        if(r){
          this.dataStep5Array=[];
          for(let el of r){
            let d = new Step2Data();
            d.setObject(el);
            this.dataStep5Array.push(d);
          }
          this.nextPage();
        }
      },e=>{});
  }
  get getFormGroup(){
    switch (this.page) {
      case 0:
        return this.validationForm0;
      case 1:
        return this.validationForm1;
      case 2:
        return this.validationForm1B;
      case 3:
        return this.validationForm2;
      case 4:
        return this.validationForm3;
      case 5:
        return this.validationForm4;
      case 6:
        return this.validationForm5;
      case 7:
          return this.validationForm5;
      default:
        break;
    }
  }
  get form(){
    return this.getFormGroup.controls;
  }
  beforChangePage(){
    this.isDisabled=false;
    this.isFormSubmitted=false;
  }
  previousPage(){
    this.beforChangePage();
    if(!this.dataStep1.hasMultipleRepresented && this.page==4)
      {
        if(!(this.dataStep1.hasMultipleForiegen && this.dataStep1.country!="MA"))
          {this.page=1;}
        else{this.page=2;}
        this.wizardForm.goToPreviousStep();
        return ;
      }
    if(!(this.dataStep1.hasMultipleForiegen && this.dataStep1.country!="MA") && this.page==3)
          {this.page=1;this.wizardForm.goToPreviousStep();return ;}

      this.page--;
    this.wizardForm.goToPreviousStep();
  }
  nextPage(){
    this.beforChangePage();
    this.page++;
    this.wizardForm.goToNextStep();
    this.disableLoadModal=true;
    this.onInitAllData();
  }
  SwalDone(){
    if(this.isLodedAllPage)
      Swal.fire(
        {
          position: 'center',
          title: this.translate.instant("table_add_done"),
          text: '',
          showConfirmButton: false,
          timer: 2000,
          icon: 'success'
        }
      )
      .then(()=>{this.nextPage()})
    else this.nextPage();
  }
  getErrorInputs(key:string):string{
    let errors = this.getFormGroup.get(key).errors;
    let s =  (Object.keys(errors)[0]+"Field");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  get getNumberCodeForm1(){
    return this.countries.filter((item)=>(item.alpha2Code == this.dataStep1.country))[0].callingCodes[0];
  }
  get getNumberCodeForm2(){
    return this.countries.filter((item)=>(item.alpha2Code == this.dataStep2.country))[0].callingCodes[0];
  }
  onChangehallClass(e){
    this.dataStep1.hallClass=e;
    let a = this.dataStep1.wingAreaSquare;
    a=a==null?0:a;
    if(e==1 && a<12) this.dataStep1.wingAreaSquare = 12;
    if(e==2 && a<45) this.dataStep1.wingAreaSquare = 45;
  }
  onChangePassportType =(e,d)=>{
    this.dataStep1.passportType = e;
    let x = [...this.Files];
    let i = x.indexOf("TITRE_VOYAGE");
    if(i>-1)  x.splice(i, 1);
    if(e=="TTRVOYGE" && d==null)
        x.push("TITRE_VOYAGE");
    this.Files = [...x];
    this.initinputsStep2();
  }
  onChangePays(e){
    if(e==null) return;
    let d =null;
    let validationElemets2 = ['passportExpiration','passportType','passportNumber','birthNationality','personName','birthDay','birthCountry'];
    if(e=="MA"){
      d = true;
      this.validationForm0.controls['cin'].setValidators([Validators.required]);
      for(let i of validationElemets2){
        this.validationForm0.controls[i].clearValidators();
        this.validationForm0.controls[i].updateValueAndValidity();
      }
      this.Files = ["RECAP_REQUEST_EXHIBITION"];
    }
    else{
      this.validationForm0.controls['cin'].clearValidators();
      for(let i of validationElemets2){
        this.validationForm0.controls[i].setValidators([Validators.required]);
        this.validationForm0.controls[i].updateValueAndValidity();
      }
      this.Files = ["RECAP_REQUEST_EXHIBITION","PASSPORT1","PASSPORT2"];
    }

    this.onChangePassportType(this.dataStep1.passportType,d);
    this.initinputsStep2();
    this.validationForm0.controls['cin'].updateValueAndValidity();
    this.dataStep1.country=e;
  }
  checkDateEXpiration():Boolean{
    let dateexp = this.dataStep1.passportExpiration;
    if(this.dataStep1.country!="MA" && dateexp!=null){
      let d1 = (Date.parse(dateexp));
      let d2 = new Date();
      let m = d1 - d2.getTime()-6*30*24*60*60*1000 ;
        if(m<0){
          if(this.isLodedAllPage)
            this.snackBar.open(this.translate.instant('datepassporterror'), this.translate.instant('close'));
          return false;
        }
    }
    return true;
  }
  checkwingAreaSquare():Boolean{
    if(this.form.wingAreaSquare.errors?.required) return true;
    let d = this.dataStep1.wingAreaSquare;
    let n:any= this.dataStep1.hallClass;
    d=(d==null)?0:d;
    if(n==null){
      return false;
    }
    n=(n==1)?12:45;
    if(d<n) {
      return false;
    }
    return true;
  }
  getNumberhallClass(){
    let n:any= this.dataStep1.hallClass;
    n=(n==1)?12:45;
  }
  onSubmit0(){
    this.checkDateEXpiration();
    if(this.validationForm0.valid && this.checkwingAreaSquare()){
      if(this.dataStep1.numberArabicVersion==null || this.dataStep1.numberArabicVersion=="")this.dataStep1.numberArabicVersion=0;
      let DatatoSend = JSON.parse(JSON.stringify(this.dataStep1));
      let userData = this.user;
      if(!this.dataStep1.refExhibitor)
        this.sielService.createNewDemande(DatatoSend).subscribe((res)=>{
          this.dataStep1.setObject(res);
            this.sielService.createAccount(userData.user,res["refExhibitor"]).subscribe(
              (re)=>{this.SwalDone();},
              (err)=>{
                this.SwalDone();
              });
          this.initFome1();
        },
        (err)=>{
          this.isDisabled=false;
        });
      else{
        this.sielService.updateDemande(DatatoSend)
        .subscribe((res)=>{
          this.dataStep1.setObject(res);
          this.SwalDone();
          this.initFome1();
        },
        (err)=>{
          if(this.isLodedAllPage){
            this.isDisabled=false;
            this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
          }
        });
      }
      this.dataStep4.category = this.dataStep1.hallClass;
    }
    else {this.inValidDataMessage();this.isDisabled=false;this.AfterCheckLastPage()}
  }
  onSubmit1(){
    this.isDisabled=true;
    let dtoupdate = this.inputsStep2.filter(d=>d.data.refDocument!="");
    let dtostore = this.inputsStep2.filter(d=>d.data.refDocument=="");
    var httpRequests = [];
    var dataKey  = [];
    if(this.dataStep2.email==null && this.dataStep2Array.length==0)
      this.dataStep2.setObject({email:this.dataStep1.email,phoneNumber:this.dataStep1.phoneNumber,fax:this.dataStep1.fax,responsibleName:this.dataStep1.responsibleManagerName,address:this.dataStep1.address})

      if(dtoupdate.length>0){
      for(let d of dtoupdate){
        if(d.key!="PASSPORT2"){
        this.validationForm1.controls[d.key].clearValidators();
        this.validationForm1.controls[d.key].updateValueAndValidity();
        }
        if(d.file!=null){
          httpRequests.push(this.sielService.updateDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:this.dataStep1.refExhibitor,file:d.file}));
          dataKey.push(d.documentType);
        }
      }
    }
    if(dtostore.length>0){
      for(let d of dtostore){
        if(d.key!="PASSPORT2"){
          this.validationForm1.controls[d.key].setValidators([Validators.required]);
          this.validationForm1.controls[d.key].updateValueAndValidity();
        }
        if(d.file!=null){
          dataKey.push(d.documentType);
          httpRequests.push(this.sielService.storeDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:this.dataStep1.refExhibitor,file:d.file}));
        }
      }
    }
    if(this.validationForm1.valid )
      if(httpRequests.length>0)
        forkJoin(httpRequests).subscribe(r=>{
          //console.log(r)
          r.forEach((e:any,j) => {
            let t = typeof e;
            let i = this.Files.indexOf(dataKey[j]);
            if( t=="string")
              this.inputsStep2[i].data.name=e;
            else
              this.inputsStep2[i].data=e;

          });
          this.getEditeursRepresentes();
        },
        error=>{this.isDisabled=false;}
        );
      else this.getEditeursRepresentes();
    else {
      this.isDisabled=false;
      this.AfterCheckLastPage();
    }
  }
  onSubmit1B(){
    this.isFormSubmitted=false;
    if(this.dataStep1BArray.length>0){
      this.getEditeursRepresentes();
    }
    else {
      this.isDisabled=false;
      if(this.isLodedAllPage)
        this.snackBar.open(this.translate.instant('emptydata'), this.translate.instant('close'));
      this.AfterCheckLastPage();
    }
  }
  onSubmit2(){
    this.isFormSubmitted=false;
    if(this.dataStep2Array.length>0){
      this.getExposantPublications(this.dataStep1.refExhibitor);
    }
    else{
      this.isDisabled=false;
      if(this.isLodedAllPage)
        this.snackBar.open(this.translate.instant('emptyEditor'), this.translate.instant('close'));
      this.AfterCheckLastPage();
    }
  }
  onSubmit3(){
    this.isFormSubmitted=false;
    if(this.dataPublicationArray.length>0){
      this.getStandBook();
    }
    else {
      this.isDisabled=false;
      if(this.isLodedAllPage)
        this.snackBar.open(this.translate.instant('emptydata'), this.translate.instant('close'));
      this.AfterCheckLastPage();
    }
  }
  onSubmit4(){
    if(this.validationForm4.valid){
      let data = {};
      let dataKey = ['category','paymentMethod'];
      data['branchActivity']="string";
      data['volumeInCubicMeter']=this.dataStep1.wingAreaSquare;
      for(let i of dataKey)
        data[i]=this.dataStep4[i];
      let refExhibitor = this.dataStep1.refExhibitor;
      let refBookingStand  =this.dataStep4.refBookingStand;
      if(refBookingStand==null){
        this.sielService.bookStand(data,refExhibitor)
        .subscribe((r)=>{
          if(r)
            this.dataStep4.setObject(r);
            this.getPropsessActivities();
        }
        ,er=>{
          //console.log(er);
        }
        );
      }
      else
        this.sielService.modifyBookStand(data,refExhibitor,refBookingStand)
        .subscribe((r)=>{
          if(r)
            this.dataStep4.setObject(r);
            this.getPropsessActivities();
        }
        ,er=>{
          //console.log(er);
        }
        );
    }
    else {
      this.inValidDataMessage();
      this.isDisabled=false;
      this.AfterCheckLastPage()
    }
  }
  onSubmit5(){
    this.isFormSubmitted=false;
    this.nextPage();

      // if(this.dataStep5Array.length>0){
      //   this.nextPage();
      // }
      // else{
      //   if(this.isLodedAllPage)
      //     this.snackBar.open(this.translate.instant('emptydata'), this.translate.instant('close'));
      //   this.isDisabled=false;
      //   this.AfterCheckLastPage();
      // }
  }
  onSubmit6(){
    if(this.isLodedAllPage){
    }
    else
     this.AfterCheckLastPage();
  }
  valideDemande(event){
        this.sielService.validerDemande(this.dataStep1.refExhibitor).subscribe(data=>{
          this.beforChangePage();
          Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } )
        .then(()=>{
          this.page = 0;
          this.wizardForm.goToStep(0)
          this.router.navigate(['exposant/exposant-demande-details']);
        })
        })
  }

  download1(event){
    event.preventDefault();
    this.isDisabled=true;
    let object = {refExhibitor : this.dataStep1.refExhibitor,language : this.languageService.userLanguage}
   
   if(this.languageService.userLanguage=="ar"){

    this.sielService.getRecapDemande2(object).subscribe((response)=>{
      let objectUrl = URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = objectUrl;
      link.download = "demande_participation2.pdf";
      link.click();
      this.isDisabled=false;
    }, (error)=>{
      this.isDisabled=false;
    });
   }

else{

  
  this.sielService.getRecapDemande(object).subscribe((response)=>{
    let objectUrl = URL.createObjectURL(response);
    let link = document.createElement('a');
    link.href = objectUrl;
    link.download = "demande_participation.pdf";
    link.click();
    this.isDisabled=false;
  }, (error)=>{
    this.isDisabled=false;
  });

}





  }
  onChangeFile = (event,index)=>{
    if (event.target.files.length) {
      let file = event.target.files[0];
      let elementFile:any = this.inputsStep2[index];
      elementFile.data.name=file.name;
      elementFile.file=file;
      let x = {};
      x[elementFile.key]=file;
      this.getFormGroup.patchValue({...x});
    }
  }
  downloadFile = (index,refDoc)=>{
    if(refDoc!=null){
      let icon:HTMLElement=document.querySelector("#"+refDoc+index+" .download-icon") as HTMLElement;
      let loader:HTMLElement=document.querySelector("#"+refDoc+index+" .spinner-border.spinner-border-sm") as HTMLElement;
      icon.style.display="none";
      loader.style.display="inline-block";
      this.sielService.getDocByDocRef(refDoc).subscribe((response)=>{
      let objectUrl = URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute("download", "file");
      link.click();
      icon.style.display="inline";
      loader.style.display="none";
      },
      err=>{
        icon.style.display="inline";
        loader.style.display="none";
      });
    }
  }
  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#"+id) as HTMLElement;
    element.click();
  }
  openlModal(content){

    this.modalService.open(content, {size: 'xl'}).result.then((result) => {

    }).catch((res) => {});
  }
  PrintElement(contents) {
    var frame1:any = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
     frameDoc.document.write(`<html><head><title></title>`);
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();


    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}
  handleFileInputPSP(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#psp + .input-group .file-upload-info") as HTMLElement;
      let file = event.target.files[0];
      let fileName = file.name;
      element.setAttribute( 'value', fileName);
      this.dataStep2.filename=fileName;
      this.dataStep2.filename=fileName;
        this.validationForm2.patchValue({
          img : file
        });
    }
  }
  onAddData5(){
    this.isFormSubmitted=true;
    let refExhi =  this.dataStep1.refExhibitor;
    let data = JSON.parse(JSON.stringify(this.dataStep5));
    /***on Edit***/
    if(this.dataStep5.refActivityProposal){
      this.sielService.modifyActiviteProposee(data,refExhi)
      .subscribe(
        r=>{
          this.page5OnEditDone(r);
          Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
        },
        e=>{}
      );
    }
    /***on Add***/
    else{
      this.sielService.addActiviteProposee(data,refExhi)
      .subscribe(
        (r:any)=>{
          let d5 = new Step5Data();
          d5.setObject(r);
          this.dataStep5Array.push(d5);
          this.clearFom5();
          Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
        },
        e=>{}
      );
    }
  }
  clearFom5(){
    this.disableLoadModal=true;
    this.isFormSubmitted=false;
    this.dataStep5=new Step5Data();
    var validationElemets5=['proposedDate','participants','activityPlace','bookTitle','author','publishingYear','editeur','publishingHouse'];
    var Validation2AllElement={};
    for(let el of validationElemets5)
      Validation2AllElement[el]='';
    this.validationForm2.patchValue(validationElemets5);
  }
  onChangeDate(e){
    if(e){
    this.dataStep5.proposedDate=e;
    }
  }
  page5OnEditDone(data){
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    this.dataStep5Array=[];
    for(let i of data){
        let d5=new Step5Data();
        d5.setObject(i)
        this.dataStep5Array.push(d5);
      }
    this.dataStep5 = new Step5Data();
    this.clearFom5();
  }
  setEditElementPage5(item){
    this.dataStep5= new Step5Data();
    this.dataStep5.setObject(item);
    console.log(item)
    document.getElementById('modaleditadd5').scrollIntoView(false);
  }
  deleteElementPage5(c,i){
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.sielService.deleteProposedActivity(this.dataStep1.refExhibitor,this.dataStep5Array[i].refActivityProposal)
      .subscribe(e=>{
        this.dataStep5Array = this.dataStep5Array.filter((e,j)=>j!=i)
      })
    }});
  }
  onAddData2(){
    this.isFormSubmitted=true;
    let refExhi =  this.dataStep1.refExhibitor;
    let imagetoSend = this.validationForm2.get('img').value ;
    /***on Edit***/
    if(this.dataStep2.refPublisherRepresented){
      this.validationForm2.get('img').clearValidators();
      this.validationForm2.get('img').clearValidators();
      if(this.validationForm2.valid){
        this.disableLoadModal=false;
        let delement = ['refPublisherRepresented','name','country','email','phoneNumber','responsibleName','fax','address','webSite','specialization','numberForeignPublishing','activityBranches'];
        let data = {};
          for(let d of delement)
            data[d]=this.dataStep2[d];
            //console.log(data)
        this.sielService.modifyEditeurRepresente(data, refExhi).subscribe(
          (resp)=>{
            if(typeof(this.validationForm2.get('img').value)=='object' && imagetoSend!=null){
                  if(this.dataStep2.img!=null){
                        let bodyRepresentedEditor = {'refDocument' : this.dataStep2.img,'file' : imagetoSend};
                        this.sielService.updateDoc(bodyRepresentedEditor).subscribe((res:any)=>{
                          this.dataStep2.img=res.refDocument;
                          this.page2OnEditDone(data)
                          Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
                        }, (error)=>{
                          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
                    })
                  }
                  else{
                    let bodyRepresentedEditor = {
                      'documentType' : `PROCURATION_EDITEUR_REPRESENTE_${this.dataStep2Array.length+1}`,
                      'refObject' : data['refPublisherRepresented'],
                      'refParent' :refExhi,
                      'file' : imagetoSend
                    };
                    this.sielService.storeDoc(bodyRepresentedEditor).subscribe((res:any)=>{
                      this.dataStep2.img=res.refDocument;
                      this.page2OnEditDone(data)
                      Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
                    });
                  }
                }
            else{
              this.page2OnEditDone(data)
              Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
            }

              },
          (err)=>{
                  this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
              }
        );
      }
      else
        this.inValidDataMessage();
      return;
    }
    else {
      this.iseditablePage3=false;
      this.validationForm2.get('img').setValidators([Validators.required]);
    }
    /***on Add***/

    if(this.validationForm2.valid){
      this.disableLoadModal=false;
      let delement = ['name','country','email','phoneNumber','responsibleName','fax','address','specialization','numberForeignPublishing','activityBranches'];
        let data = {};
          for(let d of delement)
            data[d]=this.dataStep2[d];
        //console.log(data)
        this.sielService.addEditeurRepresente(data, refExhi).subscribe((resp)=>{
          this.dataStep2.refPublisherRepresented=resp["refPublisherRepresented"];
          this.isFormSubmitted=false;
          let bodyRepresentedEditor = {
            'documentType' : `PROCURATION_EDITEUR_REPRESENTE_${this.dataStep2Array.length}`,
            'refObject' : resp["refPublisherRepresented"],
            'refParent' :refExhi,
            'file' : imagetoSend
          };
          if(imagetoSend!=null)
            this.sielService.storeDoc(bodyRepresentedEditor).subscribe((res:any)=>{
              this.dataStep2.img=res.refDocument;
              this.page2OnAddtDone();
              Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
            }, (error)=>{
              this.page2OnAddtDone();
              this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
            })
          else
            this.page2OnAddtDone();
        },(err)=>{
          this.page2OnAddtDone();
          this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));
        });
    }
    else
      this.inValidDataMessage();

  }
  setEditEditeurRepresente(item){
    this.validationForm2.get('img').clearValidators();
    this.validationForm2.get('img').updateValueAndValidity();
    this.dataStep2= new Step2Data();
    if(item.img==null){
      this.isLodedPage3=item.refPublisherRepresented;
      this.sielService.getDocsByRf(item.refPublisherRepresented)
      .subscribe(
        r=>{
          if(r.length>0){r=r[0];item.img=r.refDocument;item.filename=r.name;this.onEditEditeurRepresenteD(item);}
          else this.onEditEditeurRepresenteD(item)
        },
        error=>{this.onEditEditeurRepresenteD(item)})
    }
    else
      this.onEditEditeurRepresenteD(item)
  }
  onEditEditeurRepresenteD(item){
    this.iseditablePage3=true;
    this.isLodedPage3=-1;
    this.dataStep2.setObject(item);
    document.getElementById('modaleditadd3').scrollIntoView(false);
  }
  clearFom2(){
    this.iseditablePage3=false;
    this.dataStep2=new Step2Data();
    var validationElemets2=['name','email','phoneNumber','responsibleName','fax','address','webSite','specialization','numberForeignPublishing','branche','img'];
    var Validation2AllElement={};
    for(let el of validationElemets2)
      Validation2AllElement[el]='';
    this.validationForm2.patchValue(Validation2AllElement);
  }
  deleteEditeurRepresente(c,i){
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.dataStep2Array[i] ;
      this.backendService.deleteEditeurRepresente(this.dataStep1.refExhibitor,this.dataStep2Array[i].refPublisherRepresented)
      .subscribe(e=>{
        this.dataStep2Array = this.dataStep2Array.filter((e,j)=>j!=i)
      })
    }});
  }
  page2OnEditDone(data){
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    for(let i of this.dataStep2Array)
      if(i.refPublisherRepresented==data['refPublisherRepresented']){
       i.setObject(this.dataStep2);
        break;
      }
    this.dataStep2 = new Step2Data();
    this.clearFom2();
  }
  page2OnAddtDone(){
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    this.dataStep2Array.push(this.dataStep2);
    this.dataStep2 = new Step2Data();
    this.clearFom2();

  }
  // Page 1 ==> B;
  getForeigenRepresented(){
    this.sielService.getForeigenRepresented(this.dataStep1.refExhibitor)
    .subscribe((r)=>{
      for(let i of r) {
        let nd = new Step1BData();
        nd.setObject(i);
        this.dataStep1BArray.push(nd);
      }
      this.nextPage();
    },e=>{}
    );
  }
  handleFileInput(event: any,key) {
    if (event.target.files.length) {
      let file = event.target.files[0];
      this.dataStep1B[key].value=file.name;
      let x = {};
      x[key]=file;
        this.validationForm1B.patchValue({...x});
    }
  }
  onChangePassportTypeB =(e)=>{
    this.dataStep1B.passportType = e;
    if(e=="TTRVOYGE")
      this.validationForm1B.controls['TITRE_VOYAGE'].setValidators([Validators.required]);
    else
      this.validationForm1B.controls['TITRE_VOYAGE'].clearValidators();
    this.validationForm1B.controls['TITRE_VOYAGE'].updateValueAndValidity();
  }
  onAddData1B(){
    this.isFormSubmitted=true;
    if(this.validationForm1B.valid ){
    let refExhi =  this.dataStep1.refExhibitor;
    let data ={};
    const keyToSnd = ["personName","passportType","passportNumber","passportExpiration","birthNationality","birthDay","birthCountry"];
    for(let i of keyToSnd)
        data[i]= this.dataStep1B[i];
        //console.log(data);
    let FilestoSend = [];
    FilestoSend["PASSPORT1"] = this.validationForm1B.get('PASSPORT1').value;
    let p2 = this.validationForm1B.get('PASSPORT2').value;
    if(p2!="" && p2!=null)
      FilestoSend["PASSPORT2"] = this.validationForm1B.get('PASSPORT2').value;
    if(this.dataStep1B.passportType=="TTRVOYGE")
      FilestoSend["TITRE_VOYAGE"] = this.validationForm1B.get('TITRE_VOYAGE').value;
    /***on Edit***/
    if(this.dataStep1B.refForeignRepresented!=null){
      data['refForeignRepresented']=this.dataStep1B.refForeignRepresented;
      this.sielService.modifyForeignRepreseted(data,refExhi)
      .subscribe(
        (r:any)=>{
          let refoBject = r.refForeignRepresented;
          let httpRequests = [];
          let xe = [];
          //console.log(FilestoSend);
          for(let i in FilestoSend)
            if(FilestoSend[i]!==''){
              if(this.dataStep1B[i].refDocument==='')
                httpRequests.push(this.sielService.storeDoc({documentType:i,refObject:refoBject,file:FilestoSend[i]}));
              else
                httpRequests.push(this.sielService.updateDoc({refDocument:this.dataStep1B[i].refDocument,documentType:i,refObject:refoBject,file:FilestoSend[i]}));
                xe.push(i);
            }
            //console.log(xe);
            if(httpRequests.length>0)
              forkJoin(httpRequests).subscribe(r=>{
                //console.log(r)
                r.forEach((e:any,j) => {
                  let t = typeof e;
                  if( t!="string")
                    this.dataStep1B[e.nature].refDocument=e.refDocument;
                });

              this.page1BOnEditDone(data)
              Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
          },
            error=>{this.isDisabled=false;}
            );
            else {
              this.page1BOnEditDone(data)
              Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
              }

        },
        e=>{}
      );
    }
    /***on Add***/
    else{
      this.sielService.addForeignRepreseted(data,refExhi)
      .subscribe(
        (r:any)=>{
          let refoBject = r.refForeignRepresented;
          console.log(r);
          let httpRequests = [];
          let xe = [];
          for(let i in FilestoSend)
            if(FilestoSend[i]!=null){
                httpRequests.push(this.sielService.storeDoc({documentType:i,refObject:refoBject,file:FilestoSend[i]}));
                xe.push(i);
            }
          if(httpRequests.length>0)
          forkJoin(httpRequests).subscribe(x=>{
            x.forEach((e:any,j) => {
              this.dataStep1B[e.nature].refDocument=e.refDocument;
              //console.log(this.dataStep1B[e.nature])
            });
            this.onDoneAddA1b(r);
          });
          else{
            this.onDoneAddA1b(r);
          }
        },
        e=>{}
      );
    }
  }
  else
    this.snackBar.open(this.translate.instant('internalError'), this.translate.instant('close'));

  }
  inValidDataMessage = ()=>{
    if( this.isDisabled){
      this.snackBar.open(this.translate.instant('invalid__data'), this.translate.instant('close'));
      document.getElementsByTagName("body")[0].scrollIntoView(false);
    }
  }
  onDoneAddA1b(r){
    let x = new Step1BData();
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    let d1b = this.dataStep1B;
    x.setObject(r);
   x.setObject({PASSPORT1:d1b.PASSPORT1,PASSPORT2:d1b.PASSPORT2,TTRVOYGE:d1b.TITRE_VOYAGE});
    this.dataStep1BArray.push(x);
    this.clearFom1b();
    Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } ).then(()=>{this.disableLoadModal=true;})
  }
  setEdit1B(item){
    //console.log(item);
    this.dataStep1B= new Step1BData();
    // if(item.PASSPORT1.refDocument=="" ){
      this.isLodedPage3=item.refPublisherRepresented;
      this.sielService.getDocsByRf(item.refForeignRepresented)
      .subscribe(
        r=>{
          //console.log(r);
          if(r.length>0)
            for(let i of r){
              let n =i.nature;
              item[n].refDocument=i.refDocument;
              item[n].value=i.name;
              this.validationForm1B.get(n).clearValidators();
              this.validationForm1B.get(n).updateValueAndValidity();
              //console.log(n,item[n])

            }
          this.onEdit1B(item);
        },
        error=>{this.onEdit1B(item)})
    // }
    // else
    //   this.onEdit1B(item);

  }
  onEdit1B(item){
    this.iseditablePage3=true;
    this.isLodedPage3=-1;
    this.dataStep1B.setObject(item);
    document.getElementById('modaleditadd1b').scrollIntoView(false);
  }
  clearFom1b(){
    this.iseditablePage3=false;
    this.dataStep1B = new Step1BData();
    let validationElemets1b=["personName","birthDay","birthCountry","passportNumber","passportExpiration","passportType","birthNationality","PASSPORT1","PASSPORT2","TITRE_VOYAGE"];
    var Validation1BAllElement={};
    for(let el of validationElemets1b)
    Validation1BAllElement[el]='';

    this.validationForm1B.patchValue(Validation1BAllElement);
  }
  deleteE1B(c,i){
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.dataStep1BArray[i] ;
      this.sielService.deleteForeigenR(this.dataStep1.refExhibitor,this.dataStep1BArray[i].refForeignRepresented)
      .subscribe(e=>{
        this.dataStep1BArray = this.dataStep1BArray.filter((e,j)=>j!=i)
      })
    }});
  }
  page1BOnEditDone(data){
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    for(let i of this.dataStep1BArray)
      if(i.refForeignRepresented==data['refForeignRepresented']){
       i.setObject(this.dataStep1B);
        break;
      }
    this.dataStep1B = new Step1BData();
    this.clearFom2();
  }
  page1BOnAddtDone(){
    this.disableLoadModal=false;
    this.isFormSubmitted=false;
    this.dataStep2Array.push(this.dataStep2);
    this.dataStep2 = new Step2Data();
    this.clearFom2();

  }
  //publication//
  initFomePublication(){
    this.inputsStepPublication = [
       {label:"F_OuvragesPourSalon_Auteur",type:"text",ngModel: this.dataPublicationStep.author,onChange:(e)=>{this.dataPublicationStep.author=e;},formControlName:"author",placeHolder:"F_OuvragesPourSalon_Auteur_Description"},
       {label:"F_OuvragesPourSalon_TitreLivre",type:"text",ngModel: this.dataPublicationStep.title,onChange:(e)=>{this.dataPublicationStep.title=e},formControlName:"title",placeHolder:"F_OuvragesPourSalon_TitreLivre"},
       {label:"F_OuvragesPourSalon_Editeur",type:"text",ngModel: this.dataPublicationStep.publisher,onChange:(e)=>{this.dataPublicationStep.publisher=e},formControlName:"publisher",placeHolder:"F_OuvragesPourSalon_Editeur"},
       {label:"F_OuvragesPourSalon_NombreExemplaire",type:"number",ngModel: this.dataPublicationStep.copiesNbr,onChange:(e)=>{this.dataPublicationStep.copiesNbr=e},formControlName:"copiesNbr",placeHolder:"F_OuvragesPourSalon_NombreExemplaire"},

       {label:"F_OuvragesPourSalon_AnneePublication",type:"text",ngModel: this.dataPublicationStep.publishingDate,onChange:(e)=>{this.dataPublicationStep.publishingDate=e},formControlName:"publishingDate",placeHolder:"F_OuvragesPourSalon_AnneePublication"},
       {label:"ISBN",type:"text",ngModel: this.dataPublicationStep.isbn,onChange:(e)=>{this.dataPublicationStep.isbn=e},formControlName:"isbn",placeHolder:"isbn"},

       {label:"F_OuvragesPourSalon_PrixEnDH",type:"number",ngModel: this.dataPublicationStep.amout,onChange:(e)=>{this.dataPublicationStep.amout=e},formControlName:"amout",placeHolder:"F_OuvragesPourSalon_PrixEnDH"},
       {label:"F_OuvragesPourSalon_SpecialiteSelonDewey",type:"text",ngModel: this.dataPublicationStep.speciality,onChange:(e)=>{this.dataPublicationStep.speciality=e},formControlName:"speciality",placeHolder:"F_OuvragesPourSalon_SpecialiteSelonDewey"},
       {label:"F_OuvragesPourSalon_DepotLegal",type:"text",ngModel: this.dataPublicationStep.legalDeposit,onChange:(e)=>{this.dataPublicationStep.legalDeposit=e},formControlName:"legalDeposit",placeHolder:"F_OuvragesPourSalon_DepotLegal"},
       {label:"F_OuvragesPourSalon_Colis",type:"number",ngModel: this.dataPublicationStep.colis,onChange:(e)=>{this.dataPublicationStep.colis=e},formControlName:"colis",placeHolder:"F_OuvragesPourSalon_Colis"},

     ];
     this.initFormPublicationValidator();
  }
  initFormPublicationValidator(){
     let validationElemets1 = ['author','title','publisher','amout','legalDeposit','speciality','publishingDate','copiesNbr','isbn'];
     var Validation1AllElement={};
     for(let el of validationElemets1)
       Validation1AllElement[el]=[this.dataStep1[el], Validators.required];

     this.validationForm3 = this.formBuilder.group({...Validation1AllElement});
  }
  getExposantPublications(refExhibitor: string) {
    this.sielService.getExposantPublications(refExhibitor,'',this.paginationPage,this.paginationSize)
          .subscribe(publication=>{
            if(publication){
              this.dataPublicationArray=[];
              for(let el of publication["content"]){
                let d = new StepPublicationData();
                d.setObject(el);
                this.dataPublicationArray.push(d);
              }
            }
            if(this.page!=4){
              this.page=3;
              this.nextPage();
            }
          })
  }
  removePublication(refPublication:any,remove:any){
    this.sielService.deletePublication(this.dataStep1.refExhibitor,refPublication).subscribe((data)=>{
      this.getExposantPublications(this.dataStep1.refExhibitor);
      },(err)=>{
    });
   }
   setUpdatePublication(refPublication:any){
    this.dataPublicationStep=new StepPublicationData();
    this.dataPublicationStep.setObject(refPublication)
    this.editiPublication=true;
   }
   clearFormPublication(){
    this.dataPublicationStep=new StepPublicationData();
    this.editiPublication=false;
   }
   updatePublication(){
    this.sielService.updatePublication(this.dataStep1.refExhibitor,this.dataPublicationStep.refPublication,this.dataPublicationStep).subscribe((dataA)=>{
      this.getExposantPublications(this.dataStep1.refExhibitor);
      Swal.fire(
        {
          position: 'center',
          title: this.translate.instant("table_edit_done"),
          text: '',
          showConfirmButton: false,
          timer: 2000,
          icon: 'success'
          }
      );
    });
   }
   addnewPublication(){
     if(this.dataPublicationStep.author!=null)
      this.sielService.createPublication(this.dataStep1.refExhibitor,this.dataPublicationStep).subscribe((data)=>{
        this.getExposantPublications(this.dataStep1.refExhibitor);
        Swal.fire(
          {
            position: 'center',
            title: this.translate.instant("table_add_done"),
            text: '',
            showConfirmButton: false,
            timer: 2000,
            icon: 'success'
            }
        );
        },(err)=>{
          console.log(err)
          if(err.error.messageArguments.includes("isbn"))
            this.snackBar.open(this.translate.instant('isbnformatinc'), this.translate.instant('close'));
          else
          this.handleRequestService.handleError(err);
        })
      else
        this.snackBar.open(this.translate.instant('invalid__data'), this.translate.instant('close'));

   }
   downloadModelPublication(){
    this.sielService.getModelPublication().subscribe((data)=>{
      let objectUrl = URL.createObjectURL(data);
        let link = document.createElement('a');
        link.href = objectUrl;
        link.setAttribute("download", "siel_model_publication.xlsx");
        link.click();
    })
  }
  handleFileInputCsvUpload= (event)=>{
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#uploadModelPublicationFile") as HTMLElement;
    element.setAttribute( 'value', null);
    element.click();
  }
  uploadModelPublication(event: any) {
    if (event.target.files.length > 0) {
    let file = event.target.files[0];
    this.sielService.checkPublicationsFileErrors(this.dataStep1.refExhibitor, file).subscribe((response)=>{
      let warnings = response["warnings"];
      let errLines = Object.keys(warnings);
      if(errLines.length > 0){
        this.erreurImportPublication = errLines.map((item)=>{
          return {"ligne" : item, "msg" : warnings[item]};
        });
        this.modalService.open(this.csvSrvFileErrors, {centered: true, backdrop: 'static', keyboard: false, size : 'lg'}).result.then((result) => {
        })
      }
      else
        Swal.fire(
          {
            position: 'center',
            title: this.translate.instant("doneadd"),
            text: '',
            showConfirmButton: false,
            timer: 2000,
            icon: 'success'
            }
        );
      this.getExposantPublications(this.dataStep1.refExhibitor)

    });
    }
  }
  getStandBook(){
    this.sielService.getBookingStand(this.dataStep1.refExhibitor)
    .subscribe(
      (r)=>{
        if(r)
          this.dataStep4.setObject(r);
          this.dataStep4.category = this.dataStep1.hallClass;
        this.nextPage();
      },
      e=>{})
  }

/*
countries = COUNTRIES;
*/
getLabelContries(code){
  let countrie = COUNTRIES.find(ele => ele.alpha2Code==code);
  //console.log(countrie)
  if(this.languageService.userLanguage=="ar"){
    return countrie.translations.fa;
  }
  return countrie.translations.fr;
}
getLabelBranches(code){
  let branche = BRANCHES.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return branche.nameAr;
  }
  return branche.name
}
getLabelStand(code){
  let stand = STAND_TYPES.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return stand.nameAr;
  }
  return stand.name
}

getLabelProduct(code){
  let product = PRODUITS_EXPOSES.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return product.nameAr;
  }
  return product.name
}

getLabelActivityPlace(code){
  let activity = LIEUX_ACTIVITES.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return activity.nameAr;
  }
  return activity.name
}

getLabelPassport(code){
  let passport = PASSPORTS_TYPE.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return passport.nameAr;
  }
  return passport.name
}

getLabelPaiement(code){
  let Paiement = MODES_PAIEMENT.find(ele=>ele.id==code)
  if(this.languageService.userLanguage=="ar"){
    return Paiement.nameAr;
  }
  return Paiement.name
}

  FileFRdemandePartictionHtml = ()=>{
    let d:any = this.dataStep1;
    return(`<div class="p_sep" style="padding:20px"> <style>.p_sep div { margin: 11px 0; } .table_u tr:nth-child(even){background-color: #f2f2f2;} .table_u { margin:10px 0; font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%; } .table_u td, .table_u th { border: 1px solid #ddd; padding: 8px; } .table_u th { padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #000; color: white; } .p_sep em { display: block; font-size: 16px; margin: 10px; } .p_sep strong { display: block; margin: 9px; }</style><br/> <div><strong>Salon International de l'Edition  et du Livre Rabat  du 03-02-2022 au 06-06-2022</strong></div> <div><strong><em>Fiche 1</em></strong></div> <div><strong>Demande  de participation  et engagement</strong></div> <div>Tout exposant au SIEL 2022, encomplétant et signant la présente demande, s'engage à respecter les clauses  du règlement intérieur du salon, à retourner avant  le 03-02-2022. à la Direction du Livre, des Bibliothèques  et des Archives</div> <div><strong>Informations  à fournir</strong></div> <div>Nous:  ${d.publishingHouseName}</div> <div>Adresse :  ${d.address} </div> <div>Directeur responsible:  ${d.responsibleManagerName}</div> <div>Tél  : ${d.phoneNumber}</div> <div> Fax : ${d.fax} </div> <div>E-mail: ${d.email}</div> <div>Représenté  au Salon  par : ${d.companyRepresentative}</div> <div>Produits  exposés: 1</div> <div>Demandons  à participer  au salon et nous engageons  à respecter  son règlementintérieur</div> <table class="table_u"> <tr> <td colspan="2"> <div>catégorie du stand</div> </td> <td> <div>Surface reserve en m<sup>2 </sup></div> <div>(multiple de 9m<sup>2</sup>)</div> </td> </tr> <tr> <td> <div><strong>${(d.hallClass!="1"?'□':'■')} Stand aménagé</strong></div> <div>surface min 12m<sup>2</sup></div> </td> <td> <div><strong>${(d.hallClass=="1"?'□':'■')} Terrain nu</strong></div> <div>surface min 54 m<sup>2</sup></div> <div><em>(Pour stand personnalisé sans modulaire)       </em></div> </td> <td> <div>${d.wingAreaSquare}</div> </td> </tr> </table> <div><strong>A l’ntention  de l'ensemble  des exposants:</strong></div> <div><em> Je m’engage à déclarer la valeur des ventes journalières, et ce, en remplissant le formulaire des ventes par jour, et en le remetant à la Direction du salon, de façon quotidienne, tout au longe d l’événement, conformément à l’article 6, alinéa10 du réglement du salon</em></div> <div><strong>A l’ntention des exposants étrangers:</strong></div> <div><em>Je m’engage à réexpedier les ouvrages non vendus au salon à distination de leur pays d’origine dans un délai de dix jours après la cloture du salon, au-délà de cette date la direction du salon se reserve le droit de les saisir.</em></div> <div>Pour la reservation d’un stand, veuillez remplir le formulaire  du bon de commande joint .Le paiement de la réservation du stand doit être fait au profit du:</div> <div>Ministère de la Jeunesse, de la Culture et de la Communication, Département de la Culture (FNAC)</div> <div>Toute participation n'est valable qu'après approbation de la Direction du Livre, des Bibliothèques  et des Archives - Ministère de la Jeunesse, de la Culture et de la Communication, Département de la Culture- Maroc.</div> <div>Un acompte de 50% des frais de participation doit être réglé immédiatement  après l'approbation   et le reste dû se fera à l'ouverture du salon, autrement l’organisateur se réserve le droit de bloquer le stand (équipement  et produits exposés) sans aucune possibilité de recours, à cet effet le démontage  du stand par l’organisateur et l'entreposage  de l'équipement et produits exposés se fera à la charge de l'exposant et sera additionné à la facture du stand.</div> <div>En vue de faciliter l'obtention du visa d'entrée au Maroc, les participants étrangers sont priés de joindre à cette demande une copie de Ieur passeport.</div> <br/> <div>Date : 16-03-2022</div> <div>Signature et Cachet précédés de la mention: lus et approuvés  : le dossier  d'exposant  et le réglement du Salon</div> </div>`)
  }

  FileARdemandePartictionHtml  = ()=>{
    let d:any = this.dataStep1;
    return `<div class="p_sep" style="padding:20px"> <style>*{ text-align: right!important} .p_sep div { margin: 11px 0; } .table_u tr:nth-child(even){background-color: #f2f2f2;} .table_u { margin:10px 0; font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%; } .table_u td, .table_u th { border: 1px solid #ddd; padding: 8px; } .table_u th { padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #000; color: white; } .p_sep em { display: block; font-size: 16px; margin: 10px; } .p_sep strong { display: block; margin: 9px; }</style> <br/><br/> <div><strong>المعرض الدولي للنشر والكتاب </strong></div> <div>الرباط من <strong>2022-02-03</strong> إلى <strong>2022-06-06</strong> </div> <div><strong>بطاقة رقم 1:  </strong></div> <div><strong> طلب مشاركة والتزام</strong></div> <div>يعتبر تقديم هذا الطلب بمثابة قبول وتعهد باحترام مقتضيات القانون الداخلي للمعرض. ويرسل قبل 2022-02-03 2022 إلى مديرية الكتاب والخزانات والمحفوظات.</div> <br/> <div><strong>معلومات للتعبئة</strong></div> <div>اسم المؤسسة:    ${d.publishingHouseName} </div> <div>العنوان: ${d.address}  </div> <div>المدير المسؤول: ${d.responsibleManagerName}</div> <div>الهاتف: ${d.phoneNumber} </div> <div>الفاكس: ${d.fax} </div> <div>البريد الإلكتروني: ${d.email} </div> <div>مندوب(ة) المؤسسة في المعرض : ${d.companyRepresentative}</div> <div>المواد المعروضة: 1</div> <div>نطلب المشاركة في المعرض ونتعهد باحترام بنود قانونه الداخلي</div> <table class="table_u"> <tr> <td colspan="2"> <div><strong>الصنف</strong></div> </td> <td> <div><strong>المساحة المطلوبة بالمتر المربع</strong></div> <div>مضاعفات 9م<sup>2</sup></div> </td> </tr> <tr> <td> <div><strong>${(d.hallClass!="1"?'□':'■')} رواق مجهز</strong></div> <div>أقل من 18م<sup>2</sup></div> </td> <td> <div><strong>${(d.hallClass=="1"?'□':'■')} أرض عراء*</strong></div> <div>أقل مساحة 54م<sup>2</sup></div> <div><strong>(*يمنع استعمال مأطورات الألومينيوم بالنسبة للأروقة المشخصة.)</strong></div> </td> <td> <div>${d.wingAreaSquare}</div> </td> </tr> </table> <div><strong>يهم عموم العارضين:</strong></div> <div>ألتزم بالتصريح بقيمة المبيعات اليومية، وفق استمارة المبيعات اليومية بناء على المادة 6 من البند 10 من قانون المعرض، وموافاة إدارة المعرض بالاستمارة المذكورة بصفة يومية طيلة فترة المعرض.</div> <div><strong>يهم العارضين الأجانب:</strong></div> <div>ألتزم بإرجاع المواد الموجهة للمعرض الدولي للنشر والكتاب بالرباط، والتي لم تبع بالمعرض المذكور، إلى موطنها الأصلي في أجل أقصاه عشرة(10) أيام بعد انتهاء المعرض. ويحق لإدارة المعرض، بعد انقضاء هذا الأجل ، أن تحجز هذه المواد.</div> <div>تملا بيانات عقد حجز الرواق بين العارض وإدارة المعرض وفق استمارة"طلب حجز رواق" ويتم أداء ثمن الرواق لفائدة:</div> <div><strong>وزارة الشباب والثقافة والتواصل على الحساب البنكي للصندوق الوطني للعمل الثقافي، رقم :</strong></div> <div>null</div> <div>لا تقبل المشاركة إلا بعد موافقة مديرية الكتاب والخزانات و المحفوظات، وزارة الشباب والثقافة والتواصل المغربية.</div> <div>يؤدى ما نسبته 50%  من مجموع واجبات الاشتراك مباشرة بعد الإخبار بالقبول. والمتبقي عند ابتداء المعرض، وخلاف ذلك يحق لإدارة المعرض أن تحجز بصفة لا رجعة فيها على الرواق بتجهيزاته ومعروضاته. وتحتسب إدارة المعرض في هذه الحالة مصاريف تفكيك الرواق ضمن الفاتورة الإجمالية المترتبة على العارض.</div> <div>تيسيرا لإجراءات تأشيرة الدخول إلى المغرب، يرجى من المشاركين الأجانب إرفاق هذا الطلب بصورة من جواز السفر </div> <br/> <div><strong>التاريخ</strong>: 2022-03-16</div> <div><strong>التوقيع والختم</strong> مع الكتابة بخط اليد " اطلعت على ملف العارض وقانون المعرض ووافقت عليه."</div> </div>`;
  }
  donwloadHtmlToPdf = ()=>{
    this.isDisabled = true;
    html2canvas(document.getElementById('output')).then((canvas) => {
          let fileWidth = 208;
          console.log(canvas.height);
          let fileHeight = (canvas.height * fileWidth) / canvas.width;
          const FILEURI = canvas.toDataURL('image/png');
          let PDF = new jsPDF('p', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
          PDF.save('angular-demo.pdf');
          this.isDisabled = false;
        });
  }
}

