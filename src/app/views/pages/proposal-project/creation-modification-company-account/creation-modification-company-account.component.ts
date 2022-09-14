import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyAccountService } from 'src/app/services/proposal-project/company-account/company-account.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CompanyAcount} from "src/app/entities/proposal-project/CompanyAcountResponse";
import GeneralMemberResponse from "src/app/entities/proposal-project/GeneralMemberResponse";
import { REGIONS } from 'src/app/lists/regions';
import { VILLES } from 'src/app/lists/villes';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { forkJoin } from 'rxjs';
import { SielService } from 'src/app/services/siel/exposant/siel.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router } from '@angular/router';
import { ArtisticProfessionService } from 'src/app/services/siel/administration/artistic-porfession/artistic-profession.service';
import { FilesInputsService } from 'src/app/services/proposal-project/files-inputs/files-inputs.service';


// const otherData = {
//   Files:["Planpromotionprojetsoutenu","Estimationprojetfinanciere","Copecartedidentiténationale_residence","Spécimenchèqueporteur_attestation"
// //Generale Info
// ,"Fournir5attestationsthéâtrale","Programmationreprésentations_théâtrale","FicheTechniquePcommunication_distribution"
// ],
//   Files3:["copiesLegaliserPartic","copesCarteProfessionnel","CurriculumVitae"],
//   GeneralInfo:[
//     {label:"SubElpiece",entity:'projectName',type:'text'},
//   ]
// };

// const otherData = JSON.parse('{"Files":["devis_s_lenseme","Estimationprojetfinanciere","Copecartedidentiténationale_residence","Spécimenchèqueporteur_attestation","Déclarationlhonneurlégalisée","Dossierartistiquereprésentatif","Copieslégaliséessociétésdistributionmusique","Engagementreproduire1000","Attestationadhésioninstitution","Textescomplets_chansons","partitionsmusicaleschansonscompositions","EnregistrementmaquetteMP3__t__MP3"],"Files3":["copiesLegaliserPartic","copesCarteProfessionnel","CurriculumVitae"],"GeneralInfo":[{"label":"Titreprojet","entity":"projectName","type":"text"},{"label":"Typeprojetchanson","entity":"projectType","type":"text"},{"label":"Nombrechansonsmorceaux","entity":"numDancesOrSongs","type":"number"},{"label":"Titrechansonmorceaumusical","entity":"projectTitle","type":"text"},{"label":"durée__","entity":"durationTime","type":"text"},{"label":"Noml_auteurcompositeur","entity":"projectDescription","type":"text"},{"label":"Nom_compositeurinstrumenteaux","entity":"albumTitle","type":"text"},{"label":"budget_estimé","entity":"projectCost","type":"number"}]}')

@Component({
  selector: 'app-creation-modification-company-account',
  templateUrl: './creation-modification-company-account.component.html',
  styleUrls: ['./creation-modification-company-account.component.css']
})
export class CreationModificationCompanyAccountComponent implements OnInit {
  
  /*****    Fome Group for validation     *****/
  validationForm1: FormGroup;
  validationFormFiles:FormGroup;
  validationForm3: FormGroup;
  /*****    Submit Data     *****/
  companyAcount:CompanyAcount;
  generalMember:GeneralMemberResponse = new GeneralMemberResponse();
  generalMemberArray:Array<GeneralMemberResponse>=[];
  page:any=1;
  lastPage:any=4;
  isFormSubmitted: Boolean;
  refToUpdate:any=null;

  /*****   Inputs : Generation in HTML by *ngFor    *****/
  inputsStep1;
  inputsStep2:Array<any>;
  inputsStep3;
  inputsStep3Files:Array<any>=[];
  /*****   Flags    *****/
  isDisabled:Boolean=false;
  isModification:Boolean=false;
  isLoded:Boolean=false;
  isInError:Boolean=false;
  isLodedAllPage:Boolean=false;
  iseditablePage2:Boolean=false;
  isdisableLoadModal:Boolean=true;
  noEdition:Boolean=false;
  artisticProfession:any;
  NumberCodeForm="212";
  regions = REGIONS;
  villes =VILLES;
  genderOption = [{id:'H',label:'Homme'},{id:'F',label:'Femme'}];
  roleOption = [{id:"1",label:'Role 1'},{id:"2",label:'Role 2'}]
  DataPage1 = ["companyName","juridicForm","phoneNumber","faxNumber","responsibleName","registerNumber","region","city","postalCode","address","province","projectName","projectTitle","projectType","numDancesOrSongs","durationTime","projectCost","projectDescription","albumTitle","refArtisticProfession"];//
  Files = ["CNSS","LEGAL_STATUS","REGISTER","FISCALITY_REGULARITY"];
  MemberData = ["firstName","lastName",
  // "gender","phoneNumber","email","role"
];
  Files3 = [];
  otherData:any;
  initForme1(){
    
    let x  = [
      {type:"simpleInput",data:{formControlName:"companyName",label:"companyName",placeHolder:"",type:"text",ngModel:this.companyAcount.companyName,onChange:(v)=>{this.onChangevalue(v,'companyAcount','companyName')},required:true}},
      {type:"simpleInput",data:{formControlName:"juridicForm",label:"juridicForm",placeHolder:"",type:"text",ngModel:this.companyAcount.juridicForm,onChange:(v)=>{this.onChangevalue(v,'companyAcount','juridicForm')},required:true}},
      {type:"phoneNumber",data:{formControlName:"phoneNumber",label:"phone",placeHolder:"",ngModel:this.companyAcount.phoneNumber,onChange:(v)=>{this.onChangevalue(v,'companyAcount','phoneNumber')},required:true}},
      {type:"phoneNumber",data:{formControlName:"faxNumber",label:"fax",placeHolder:"",ngModel:this.companyAcount.faxNumber,onChange:(v)=>{this.onChangevalue(v,'companyAcount','faxNumber')},required:true}},
      {type:"simpleInput",data:{formControlName:"responsibleName",label:"responsibleName",placeHolder:"",type:"text",ngModel:this.companyAcount.responsibleName,onChange:(v)=>{this.onChangevalue(v,'companyAcount','responsibleName')},required:true}},
      {type:"simpleInput",data:{formControlName:"registerNumber",label:"registerNumber",placeHolder:"",type:"text",ngModel:this.companyAcount.registerNumber,onChange:(v)=>{this.onChangevalue(v,'companyAcount','registerNumber')},required:true}},
      {type:"selectInput",data:{formControlName:"region",label:"region",placeHolder:"",ngModel:'companyAcount.address.region',onChange:(v)=>{this.onChangeRegion(v)},required:true,options:'regions',value:'id',labelS:'region',getLabel:(r)=>{return r.region;},multiple:false}},
      {type:"selectInput",data:{formControlName:"city",label:"city",placeHolder:"",ngModel:'companyAcount.address.city',onChange:(v)=>{this.onChangeVille(v)},required:true,options:'villes',value:'id',labelS:'ville',getLabel:(r)=>{return r.ville;},multiple:false}},
      {type:"simpleInput",data:{formControlName:"postalCode",label:"postalCode",placeHolder:"",type:"text",ngModel:this.companyAcount.address.postalCode,onChange:(v)=>{this.onChangevalue(v,'companyAcount','address.postalCode')},required:true}},
      {type:"simpleInput",data:{formControlName:"address",label:"address",placeHolder:"",type:"text",ngModel:this.companyAcount.address.address,onChange:(v)=>{this.onChangevalue(v,'companyAcount','address.address')},required:true}},
      {type:"simpleInput",data:{formControlName:"province",label:"province",placeHolder:"",type:"text",ngModel:this.companyAcount.address.province,onChange:(v)=>{this.onChangevalue(v,'companyAcount','address.province')},required:false}},
      {type:"selectInput",data:{formControlName:"refArtisticProfession",label:"refArtisticProfession",placeHolder:"",ngModel:'companyAcount.refArtisticProfession',onChange:(v)=>{this.onChangevalue(v,'companyAcount','refArtisticProfession')},required:true,options:'artisticProfession',value:'refArtisticProfession',labelS:'artisticProfession',getLabel:this.getArtisticProfession,multiple:false}},
     ];
     if(this.otherData!=null && this.otherData.GeneralInfo.length>0){
       var n = [];
        for(let i of this.otherData.GeneralInfo){
          n.push(
            // {type:"titleElement",title:"generalInfo",data:{formControlName:'generalInfo'}}
          {type:"simpleInput",data:{formControlName:i.entity,label:i.label,placeHolder:"",type:i.type,ngModel:this.companyAcount.generalInformation[i.entity],onChange:(v)=>{this.onChangevalue(v,'companyAcount','generalInformation.'+i.entity)},required:true}})
        }
        if(this.otherData.GeneralInfo.length>1) n = [{type:"titleElement",title:"generalInfo",data:{formControlName:'generalInfo'}},...n];
        x = [...x, ...n];
     }
     this.inputsStep1=[...x];
  }
  initinputsStep2= ()=>{    
    this.inputsStep2=[];
    let data =[];
    for(let k of this.Files){
      let ty:any= k.split('__t__');
      if(ty.length>1) ty = "."+ty[1];
      else ty = "image/jpeg,image/jpg,image/png,application/pdf";
      this.inputsStep2.push({file:null,documentType:k,key:k,data:{name:"",refDocument:""},accept:ty,required:true,form:1});
      data[k]=[null, Validators.required];
    }
    this.validationFormFiles = this.formBuilder.group({...data});
  }
  initForme3= (i)=>{
    this.inputsStep3 = [
      {type:"simpleInput",data:{formControlName:"firstName",label:"firstName",placeHolder:"",type:"text",ngModel:this.generalMember.firstName,onChange:(v)=>{this.onChangevalue(v,'generalMember','firstName')},required:true}},
      {type:"simpleInput",data:{formControlName:"lastName",label:"lastName",placeHolder:"",type:"text",ngModel:this.generalMember.lastName,onChange:(v)=>{this.onChangevalue(v,'generalMember','lastName')},required:true}},
      // {type:"simpleInput",data:{formControlName:"email",label:"email",placeHolder:"",type:"text",ngModel:this.generalMember.email,onChange:(v)=>{this.onChangevalue(v,'generalMember','email')},required:true}},
      // {type:"simpleInput",data:{formControlName:"cin",label:"cin",placeHolder:"",type:"text",ngModel:this.generalMember.cin,onChange:(v)=>{this.onChangevalue(v,'generalMember','cin')},required:true}},
      // {type:"selectInput",data:{formControlName:"gender",label:"gender",placeHolder:"",ngModel:'generalMember.gender',onChange:(v)=>{this.onChangevalue(v,'generalMember','gender')},required:true,options:'gender',value:'id',labelS:'label',getLabel:(r)=>{return r.label;},multiple:false}},
      // {type:"phoneNumber",data:{formControlName:"phoneNumber",label:"phoneNumber",placeHolder:"",type:"text",ngModel:this.generalMember.phoneNumber,onChange:(v)=>{this.onChangevalue(v,'generalMember','phoneNumber')},required:true}},
      // {type:"simpleInput",data:{formControlName:"role",label:"role",placeHolder:"",type:"text",ngModel:this.generalMember.role,onChange:(v)=>{this.onChangevalue(v,'generalMember','role')},required:true}},
    ];
    if(i==-1){
      this.inputsStep3Files=[];
      for(let k of this.Files3){
        this.inputsStep3Files.push({file:null,documentType:k,key:k,data:{name:"",refDocument:""},accept:"image/jpeg,image/jpg,image/png,application/pdf",required:true,form:2});
      }
    }
  }

  get getFormGroup(){
    switch (this.page) {
      case 1:
        return this.validationForm1;
      case 2:
        return this.validationFormFiles;
      case 3:
        return this.validationForm3;
      case 4:
          return this.validationForm3;
      default:
        break;
    }
  }
  get form(){
    return this.getFormGroup.controls;
  }
  constructor(private filesInputsService:FilesInputsService,private activatedRoute:ActivatedRoute, public formBuilder: FormBuilder,public artisticProfessionService:ArtisticProfessionService,private translate: TranslateService,private router:Router,private modalService: NgbModal, private companyAccountService: CompanyAccountService, private sielService: SielService,public  languageService: LanguageService,private snackBar:MatSnackBar,) {
    this.companyAcount=this.companyAccountService.initCompanyAccount();
    this.initinputsStep2();
    this.initFormValidator();
  }

  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  ngOnInit(): void {
    this.refToUpdate=this.activatedRoute.snapshot.paramMap.get('ref');
    this.getinitialData();
  }
  onInitAllData(){
    if(!this.isLodedAllPage)
      if(!this.isDisabled && !this.isFormSubmitted)
        setTimeout(() => {
          console.log(this.page)
          this.onFormSubmit()
        }, 500);
  }
  getinitialData = ()=>{
    //to Edit !!!!!!
    let e =this.filesInputsService.getFilesInputsBySousDomain("ref")//this.activatedRoute.snapshot.params.ref
    // .subscribe(e=>{
      this.otherData=e;
      this.Files = [...this.Files,...this.otherData.Files];
      this.Files3 = [...this.otherData.Files3];
      this.initForme3(-1);
    //})
    //to Edit !!!!!!

    let whatToSend = this.companyAccountService.checkIfCompanyAccountExist();
    if(this.refToUpdate)
      whatToSend=this.companyAccountService.getCompanyAccountByRef(this.refToUpdate);
    forkJoin([whatToSend,this.artisticProfessionService.getAllArtisticProfession()])
    .subscribe(
      (re:any)=>{
        this.artisticProfession=re[1];
        console.log(this.artisticProfession);
        if(re[0]!=null && re[0].refCompanyAccount!=null){
          if(re[0].status=="VALID_SUBSCRIPTION"){
            this.router.navigate(['proposal-project/company-account-demande']);
            return;
          }
          this.setDataWithObject('companyAcount',re[0]);
          this.companyAcount.refArtisticProfession=re[0].artisticProfession?.refArtisticProfession;
          this.isModification=true; 
          this.companyAccountService.getAllDocs(re[0].refCompanyAccount)
          .subscribe(r=>{
            this.initinputsStep2();
            if(r.length>0){
              for (let e of r){
                let i = this.Files.indexOf(e.nature);
                if(i>-1)
                  this.inputsStep2[i].data=e;
              }
              this.isLoded =true;
              this.onInitAllData()
            }  
            else
              this.isLoded =true; 
              this.onInitAllData();  
          })
        }
        else {
          this.isLoded =true;
          this.isLodedAllPage=true;
        }
      },
      error=>{this.onError(error,null)}
      )
  }
  initFormValidator(){
    var Validation1AllElement={};
    for(let el of this.DataPage1)
      Validation1AllElement[el]=['', Validators.required];
    Validation1AllElement["province"]=['', Validators.nullValidator];
    this.validationForm1 = this.formBuilder.group({...Validation1AllElement});
    Validation1AllElement={};
    for(let el of this.MemberData)
      Validation1AllElement[el]=['', Validators.required];
    let data = [];
    console.log(this.Files3)
    for(let k of this.Files3){
      data[k]=[null, Validators.required];
    }
    this.validationForm3 = this.formBuilder.group({...Validation1AllElement,...data});
  }
  getCompanyAccountFile = ():any=>{
    return this.inputsStep2;
  }
  onFormSubmit = ()=>{
    this.isFormSubmitted=true;
    this.isInError=false;
    switch(this.page) {
      case 1:
        return this.onSubmitPage1();
      case 2:
        return this.onSubmitPage2();
      case 3:
        return this.onSubmitPage3();
      case 4:
        return this.onSubmitPage4();
      default:
        return null;
    }
  }
  onSubmitPage1 = ()=>{
    if(this.validationForm1.valid){
      this.isDisabled = true;
      if(!this.isModification){
        this.companyAccountService.createNewCompanyAccount({...this.companyAcount})
          .subscribe(
            r=>{this.setDataWithObject('companyAcount',r);this.onDone();},
          e=>{console.log(e);this.isDisabled=false;})
      }
      else {
        this.companyAccountService.updateCompanyAccount(this.companyAcount)
        .subscribe(
          r=>{this.onDone()},
          error=>{this.onError(error,()=>{})});
        }
    }
    else {
      this.isDisabled=false;
      this.AfterCheckLastPage();
    }
  }
  onSubmitPage2 = ()=>{
    this.isDisabled=true;
    let dtoupdate = this.inputsStep2.filter(d=>d.data.refDocument!="");
    let dtostore = this.inputsStep2.filter(d=>d.data.refDocument=="");
    var httpRequests = [];
    var dataKey  = [];
      if(dtoupdate.length>0){
      for(let d of dtoupdate){
        this.validationFormFiles.controls[d.key].clearValidators();
        this.validationFormFiles.controls[d.key].updateValueAndValidity();
        if(d.file!=null){
          httpRequests.push(this.sielService.updateDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:this.companyAcount.refCompanyAccount,file:d.file}));
          dataKey.push(d.documentType);
        }
      }
    }
    if(dtostore.length>0){
      for(let d of dtostore){
          this.validationFormFiles.controls[d.key].setValidators([Validators.required]);
          this.validationFormFiles.controls[d.key].updateValueAndValidity();
        if(d.file!=null){
          dataKey.push(d.documentType);
          httpRequests.push(this.sielService.storeDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:this.companyAcount.refCompanyAccount,file:d.file}));
        }
      }
    }
    if(!this.validationFormFiles.valid){
        this.isDisabled=false;
        this.AfterCheckLastPage();
        return;
    }
      if(httpRequests.length>0)
        forkJoin(httpRequests).subscribe(r=>{
          r.forEach((e:any,j) => {
            let t = typeof e;
            let i = this.Files.indexOf(dataKey[j]);
            if( t=="string")
              this.inputsStep2[i].data.name=e;
            else
              this.inputsStep2[i].data=e;

          });
          this.onDone();
          this.getGeneralInformationMember();
        },
        error=>{this.onError(error,()=>{});}
        );
      else this.getGeneralInformationMember();
   
  }    
  onSubmitPage3 = ()=>{
    this.isFormSubmitted=false;
    if(this.generalMemberArray.length>0){
      this.nextPage();
      this.onDone();
    }
    else {
      this.isDisabled=false;
      if(this.isLodedAllPage)
        this.snackBar.open(this.translate.instant('emptydata'), this.translate.instant('close'));
      this.AfterCheckLastPage();
    }
  }
  onSubmitPage4 = ()=>{
    if(!this.isLodedAllPage){
          this.onDone();
          this.AfterCheckLastPage();
    }
  }
  getGeneralInformationMember(){
    this.companyAccountService.getGeneralInformationMember(this.companyAcount.generalInformation['refGeneralInformation'])
    .subscribe((r:Array<GeneralMemberResponse>)=>{
        if(r.length>0)
          this.generalMemberArray = r;
        this.nextPage();
    },
    error=>{this.onError(error,()=>{})}
    );
  }
  AddGeneralInformationMember(){
    this.beforSendFormwithTable();
    this.companyAccountService.createGeneralInformationMember(this.generalMember)
    .subscribe((r:GeneralMemberResponse)=>{
       this.onAdd3Files(r.refGeneralMember,()=>{
        this.generalMemberArray.push(r);
        Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
        });
    },
    error=>{this.onError(error,()=>{})}
    );
  }
  EditGeneralInformationMember(){
    this.beforSendFormwithTable();
    this.companyAccountService.editGeneralInformationMember(this.generalMember)
    .subscribe((r:GeneralMemberResponse)=>{
        this.onAdd3Files(r.refGeneralMember,()=>{
          Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
          this.generalMemberArray = this.generalMemberArray.filter((e)=>e.refGeneralMember!=r.refGeneralMember);
          this.generalMemberArray.push(r);
        });
    },
    error=>{this.onError(error,()=>{})}
    );
  }
  onEditForm3(e){
    e.preventDefault();
    this.isFormSubmitted=true;
    if(this.validationForm3.valid)
      this.EditGeneralInformationMember();
  }
  onAddForm3(e){
    e.preventDefault();
    this.isFormSubmitted=true;
    if(this.validationForm3.valid)
      this.AddGeneralInformationMember();
  }
  setEditForm3(i:any){
    this.clearForm3();
    this.generalMember.setObject(i);
    if(this.Files3.length>0){
      this.sielService.getDocsByRf(i.refGeneralMember)
        .subscribe(
          r=>{
            if(r.length>0)
              for(let i of r){
                let n =i.nature;
                let j = this.Files3.indexOf(n);
                this.inputsStep3Files[j].data.refDocument=i.refDocument;
                this.inputsStep3Files[j].data.name=i.name;
                this.validationForm3.get(n).clearValidators();
                this.validationForm3.get(n).updateValueAndValidity();
              }
              this.generalMember.setObject(i);
              this.initForme3(1);
          },
          error=>{this.generalMember.setObject(i);;this.initForme3(1);})
    }
    else
     {this.generalMember.setObject(i); this.initForme3(1);}
  }
  deleteEForm3(c,i){
    this.isdisableLoadModal=false;
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.companyAccountService.deleteGeneralInformationMember(this.generalMemberArray[i].refGeneralMember)
      .subscribe(e=>{
        this.generalMemberArray = this.generalMemberArray.filter((e,j)=>j!=i);
        this.clearForm3();
        Swal.fire( { position: 'center', title: this.translate.instant("table_delete_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
      },
      error=>{this.onError(error,()=>{})})
    }});
  }
  clearForm3(){
    this.generalMember = new GeneralMemberResponse();
    this.generalMember.refParent = this.companyAcount.generalInformation['refGeneralInformation'];
    this.iseditablePage2=false;
    this.isFormSubmitted=false;
    this.isdisableLoadModal=true;
    this.isDisabled=false;
    this.isInError=false;
    for(let i of this.Files3){
        this.validationForm3.controls[i].setValidators([Validators.required]);
        this.validationForm3.controls[i].updateValueAndValidity();
    }
    this.initForme3(-1);
  }
  onAdd3Files = (r,f:any)=>{
    let dtoupdate = this.inputsStep3Files.filter(d=>d.data.refDocument!="");
    let dtostore = this.inputsStep3Files.filter(d=>d.data.refDocument=="");
    var httpRequests = [];
    var dataKey  = [];
      if(dtoupdate.length>0){
      for(let d of dtoupdate){
        this.validationForm3.controls[d.key].clearValidators();
        this.validationForm3.controls[d.key].updateValueAndValidity();
        if(d.file!=null){
          httpRequests.push(this.sielService.updateDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:r,file:d.file}));
          dataKey.push(d.documentType);
        }
      }
    }
    if(dtostore.length>0){
      for(let d of dtostore){
          this.validationForm3.controls[d.key].setValidators([Validators.required]);
          this.validationForm3.controls[d.key].updateValueAndValidity();
        if(d.file!=null){
          dataKey.push(d.documentType);
          httpRequests.push(this.sielService.storeDoc({refDocument:d.data.refDocument,documentType:d.documentType,refObject:r,file:d.file}));
        }
      }
    }
    
      if(httpRequests.length>0)
        forkJoin(httpRequests).subscribe(r=>{
          r.forEach((e:any,j) => {
            let t = typeof e;
            let i = this.Files3.indexOf(dataKey[j]);
            if( t=="string")
              this.inputsStep3Files[i].data.name=e;
            else
              this.inputsStep3Files[i].data=e;

          });
          {this.clearForm3();if(f!=null)f();}
        },
        error=>{this.onError(error,()=>{});}
        );
      else {this.clearForm3();if(f!=null)f();}
  }
  beforSendFormwithTable(){
    this.isDisabled=true;
    this.isdisableLoadModal=false;
    this.isFormSubmitted=true;
  }
  onInitPage1(){
    this.page=1;
    this.initForme1();
  }
  onInitPage3(){
    this.page=3;
    this.initForme3(-1);
    this.initFormValidator();
    this.generalMember = new GeneralMemberResponse();
    this.generalMember.refParent = this.companyAcount.generalInformation['refGeneralInformation'];
  }
  onStepOneDone = ()=>{
    this.isModification=true;
    this.isdisableLoadModal=true;
    this.isFormSubmitted=false;
    this.isDisabled=false;
    this.isInError=false;
    this.wizardForm.goToNextStep();
  }
  previousPage(){
    this.onStepOneDone()
    this.wizardForm.goToPreviousStep();
  }
  nextPage(){
    this.onStepOneDone()
    this.wizardForm.goToNextStep();
    this.onInitAllData();
  }
  onChangevalue = (value,firstkey,key:string)=>{
    let keys = key.split(".");
    var d = this[firstkey];
    for(var i =0;i<keys.length-1;i++)
        d=d[keys[i]];
    d[keys[i]]=value;
  }
  onChangeRegion = (value)=>{
    if(value==null || value=="") return;
    this.villes=VILLES.filter(ville=>ville.region==value);
    this.companyAcount.address.region=value;
    let city=this.companyAcount.address.city;
    if(city!=null)
      if((this.villes.filter(v=>v.id==city)).length==0)
        this.companyAcount.address.city=null;
  }
  onChangeVille = (value)=>{
    if(value==null || value=="") return;
    this.companyAcount.address.city=value;
    this.onChangeRegion((VILLES.filter(ville=>ville.id==value))[0].region);
  }
  onChangeFile = (event,index,i)=>{
    if (event.target.files.length) {
      let file = event.target.files[0];
      let elementFile:any;
      if(i==1)
        elementFile = this.inputsStep2[index];
      if(i==2)
        elementFile = this.inputsStep3Files[index];
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
    this.companyAccountService.getDocByDocRef(refDoc).subscribe((response)=>{
      let objectUrl = URL.createObjectURL(response);
      let link = document.createElement('a');
      link.href = objectUrl;
      link.setAttribute("download", "file");
      link.click();
      icon.style.display="inline";
      loader.style.display="none";
      },
      err=>{
        error=>{this.onError(error,()=>{});}
        icon.style.display="inline";
        loader.style.display="none";
      });
    }
  }
  openFileBrowser(id) {
    let element: HTMLElement = document.querySelector("#"+id) as HTMLElement;
    element.click();
  }
  getErrorInputs(key:string):string{
    if(!this.isInError){
      this.isInError=true;
      document.getElementById(key).scrollIntoView(true);
    }
    let errors = this.getFormGroup.get(key).errors;
    let s =  (Object.keys(errors)[0]+"Field");
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  getArtisticProfession(ar,lang){
    if(lang=="ar") return ar["nameAr"];
      return (ar["name"]);
  }
  getOption(option){
    if(option == "gender"){
      return this.genderOption;
    }
    if(option == "artisticProfession"){
      return this.artisticProfession;
    }
    if(option == "regions")
      return this.regions;  
    return this.villes;  
  }
  getModelValue(key){
    let keys = key.split(".");
    var d = this;
    for(var i =0;i<keys.length;i++)
        d=d[keys[i]];
    return d;
  }
  setDataWithObject(ob,data){
    for(let i of Object.keys(data))
      this[ob][i]=data[i];
  }
  valideDemande(event){
    this.isDisabled=true;
    this.companyAccountService.validateCompanyAccount(this.companyAcount.refCompanyAccount).subscribe(data=>{
      Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } )
    .then(()=>{
      this.page = 0;
      this.wizardForm.goToStep(0)
      this.router.navigate(['proposal-project/company-account-demande']);
    })}
    ,error=>{this.onError(error,null)}
    )
  }
  onDone(){
    if(this.page==1){
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
    
  }
  onError(error:any,flag:any){
    if(error.error.code=="AMC_EDITION_FOUND")
      this.noEdition=true;
    if(typeof flag == "function") flag();
  }
  AfterCheckLastPage(){
    if(!this.isLodedAllPage ){
      this.isLodedAllPage=true;
      this.isDisabled=false;
      this.isFormSubmitted=false;
    }
  }
}
