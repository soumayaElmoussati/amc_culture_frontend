import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Domains } from 'src/app/entities/proposalProjectView/domains';
import { ProjectRequest } from 'src/app/entities/proposalProjectView/project-request';
import { ProjectResponse } from 'src/app/entities/proposalProjectView/project-response';
import { LanguageService } from 'src/app/services/language/language.service';
import { DomainsService } from 'src/app/services/proposal-project/domains-general/domains.service';
import { ProjectService } from 'src/app/services/proposal-project/project/project.service';
import { NomenclatureService } from 'src/app/services/setting/monclature/nomenclature.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-management',
  templateUrl: './admin-project-management.component.html',
  styleUrls: ['./admin-project-management.component.scss']
})
export class AdminProjectManagementComponent implements OnInit {

   /*********************** Managing ********************* */
   refDomainInput:string=null;
   domains:any[]=[];
   subdomains:any[]=[];
   domainsData:Domains[]=[];
   docs:any[];
   subdomainsModel:any=[];
   model:ProjectRequest=new ProjectRequest();
   fieldsForModel:string[]=["startDate","endDate","amount"];
   validationForm:FormGroup;
   isFormSubmitted:boolean=false;
   isInError:Boolean=false;
   dataSent:boolean=false;
   attaching: string=null;
   isUpdating:boolean=false;
   multiple:boolean=true;
   initFormValidation()
   {
     var ValidationAllElement={};
     for(let el of this.fieldsForModel)
       ValidationAllElement[el]=['', Validators.required];
     ValidationAllElement["domain"]=['', Validators.required];
     ValidationAllElement["subdomain"]=['', Validators.required];
     ValidationAllElement["doc"]=['', Validators.required];
     this.validationForm = this.formBuilder.group({...ValidationAllElement});
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
   getLabelDomain(data)
   {
     if(this.languageService.userLanguage == 'ar')
        return data.labelAr;
     return data.label;
   }
   get getFormGroup(){
     return this.validationForm;
   }
   get form(){
     return this.getFormGroup.controls;
   }
   inputs:any[]=[];
   setInputs()
   {
     this.inputs = [
       {type:"simpleInput",data:{formControlName:"startDate",label:"startDate",placeHolder:"",type:"date",ngModel:this.model.startDate,onChange:(v)=>{this.onChangevalue(v,'model','startDate')},required:true}},
       {type:"simpleInput",data:{formControlName:"endDate",label:"endDate",placeHolder:"",type:"date",ngModel:this.model.endDate,onChange:(v)=>{this.onChangevalue(v,'model','endDate')},required:true}},
       {type:"simpleInput",data:{formControlName:"amount",label:"amount",placeHolder:"",type:"number",ngModel:this.model.amount,onChange:(v)=>{this.onChangevalue(v,'model','amount')},required:true}}
     ];
   }
   onChangevalue = (value,firstkey,key:string)=>{
     let keys = key.split(".");
     var d = this[firstkey];
     for(var i =0;i<keys.length-1;i++)
         d=d[keys[i]];
     d[keys[i]]=value;
   }
   onFormSubmit()
   {
     let refIfExist = this.model[this.refName];
     this.isFormSubmitted=true;
     this.isInError=false;
     let toSend:any[]=[];
     if(this.getFormGroup.valid)
     {
       this.dataSent=true;
       if(!refIfExist)
          toSend = this.subdomainsModel?.map(element=>{
              return {...this.model,refSubDomain:element}
          });
       let whatToSend=this.projectService.createProjects(toSend);
       if(refIfExist)
         whatToSend=this.projectService.updateProject(this.model,refIfExist);
       whatToSend.subscribe(response=>{
           this.handleRequestService.successMessage(refIfExist?"updated":"added");
           this.refreshData();
           this.clearForm();
       },err=>{
         this.handleRequestService.handleError(err);
       }).add(()=>{
         this.isFormSubmitted=false;
         this.dataSent=false;
       });
     }
   }
   clearForm()
   {
     this.multiple=true;
     this.refDomainInput=null;
     this.model=ProjectRequest.clear();
     this.updateForm();
   }
   updateForm()
   {
     this.validationForm.patchValue(this.model);
   }
   onChangeDomain(event)
   {
      if(event==null)
      {
        this.subdomainsModel=[];
        this.subdomains=[];
        return;
      }
      this.getDomain(event);
   }
   onChangeSubdomain(event)
   {
      this.subdomainsModel=event;
   }
   getDomains()
   {
      this.isUpdating=true;
      this.dataSent=true;
      this.domainService.getDomains().subscribe(response=>{
        this.domainsData=response;
        this.domains=response.map(elem=>{return {value:elem.refDomain,labelAr:elem.shortNameAr,label:elem.shortName}});
      },err=>{this.handleRequestService.handleError(err);})
      .add(()=>{this.dataSent=false;this.isUpdating=false;});
   }
   getDomain(ref:string)
   {
      this.dataSent=true;
      if(!this.isUpdating)
        this.subdomainsModel=null;
      this.subdomains=this.domainsData.find(elm=>elm.refDomain===ref)?.subDomains.map(elem=>{return {value:elem.refSubDomain,labelAr:elem.nameAr,label:elem.name}});
      this.dataSent=false;
   }
   getDocs()
   {
    this.dataSent=true;
     this.nomenclatureService.getNomenclatureDocuments().subscribe(response=>{
      this.docs=response.values.map(elem=>{return {value:elem.id,labelAr:elem.nameAr,label:elem.nameFr}});
    },err=>this.handleRequestService.handleError(err))
    .add(()=>{this.dataSent=false;});
   }
   /*********************** End Managing ********************* */
 
 
   data:GenericPageable=new GenericPageable();
   refName="refProject";
   fields:string[]=["refProject","startDate","endDate","status","amount"];
   /* Static columns 
   TODO translate status exist in StatusEnum [Backend] */
   fieldsStatic:string[]=[];
   fieldsDates:string[]=[];
   fieldsList:string[][]=[];
   sizes:number[]=[5,10,20,50,100];
   isLoad:boolean=true;
   doingAction:boolean=false;
   doingActionTo:number=null;
   currentPage:number=0;
   currentSize:number=10;
 
   setFieldsListForNeed()
   {
     this.fieldsList["subProjects"]=["refSubProject","name","nameAr"];
   }
 
   constructor(private nomenclatureService:NomenclatureService,private domainService:DomainsService,public formBuilder: FormBuilder,private modalService:NgbModal,private translate:TranslateService,private handleRequestService:HandleRequestService,private projectService:ProjectService,public languageService: LanguageService,private router:Router) 
   { 
     this.setInputs();
     this.initFormValidation();
     this.setFieldsListForNeed();
   }
 
   ngOnInit(): void {
      this.getDocs();
      this.getDomains();
      this.initData();
   }
 
   private initData()
   {
     this.getData(0);
   }
 
   refreshData()
   {
     this.getData(this.currentPage);
   }
 
   private getData(page:number)
   {
     this.isLoad=true;
     this.projectService.getProjectsWithPageAndSize(page,this.currentSize).subscribe(response=>{
         this.data=response;
     },err=>{
         this.handleRequestService.handleErrorWithCallBack(err,()=>{
           this.router.navigate(["/error"]);
         });
     }).add(()=>{
       this.currentPage=page;
       this.isLoad=false;
     });
   }
 
   onChangePage(page)
   {
     this.getData(page-1);
   }
 
   updateItem(refToUpdate,index)
   {
     this.doingAction=true;
     this.doingActionTo=index;
     this.attaching=null;
     this.isUpdating=true;
     this.projectService.getProject(refToUpdate).subscribe(response=>{
       /* added for this component only*/
       this.refDomainInput=response.domain;
       /* end adding */
       this.model=ProjectResponse.toProjectRequest(response);
       this.subdomainsModel=this.model.refSubDomain;
       this.multiple=false;
       this.updateForm();
       document.getElementById("top").scrollIntoView(true);
     },err=>{this.handleRequestService.handleError(err);})
     .add(()=>{this.doingAction=false;this.doingActionTo=null;setTimeout(()=>{this.isUpdating=false;},400);});
   }
 
   deleteItem(componant,refToDelete,index){
     this.modalService.open(componant, {centered: true}).result.then((result) => {
       if(result == "save"){
       this.doingAction=true;
       this.doingActionTo=index;
       this.projectService.deleteProject(refToDelete)
       .subscribe(e=>{
         if(this.data.pageDetails.numberOfElements<=1&&this.currentPage!=0)
           this.currentPage=this.currentPage-1;
         this.getData(this.currentPage);
         if(this.data.content.length==0&&this.currentPage!=0) 
         {
           this.getData(0);
         }
         Swal.fire( { position: 'center', title: this.translate.instant("table_delete_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
       },
       error=>{ this.handleRequestService.handleError(error)})
       .add(()=>{this.doingAction=false;this.doingActionTo=null;})
     }});
   }
 
   onChangeSize(data)
   {
     this.currentSize=data.target.value;
     this.getData(0);
   }

}
