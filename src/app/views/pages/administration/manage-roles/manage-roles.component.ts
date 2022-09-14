import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Role } from 'src/app/entities/sharedView/role';
import { LanguageService } from 'src/app/services/language/language.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import { RoleService } from 'src/app/services/shared/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss']
})
export class ManageRolesComponent implements OnInit {
/*********************** Managing ********************* */
model:Role=new Role();
fieldsForModel:string[]=["codeRole","labelRole"];
validationForm:FormGroup;
isFormSubmitted:boolean=false;
isInError:Boolean=false;
dataSent:boolean=false;
initFormValidation()
{
  var ValidationAllElement={};
  for(let el of this.fieldsForModel)
    ValidationAllElement[el]=['', Validators.required];
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
    {type:"simpleInput",data:{formControlName:"codeRole",label:"codeRole",placeHolder:"",type:"text",ngModel:this.model.codeRole,onChange:(v)=>{this.onChangevalue(v,'model','codeRole')},required:true}},
    {type:"simpleInput",data:{formControlName:"labelRole",label:"labelRole",placeHolder:"",type:"text",ngModel:this.model.labelRole,onChange:(v)=>{this.onChangevalue(v,'model','labelRole')},required:true}}
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
  this.isFormSubmitted=true;
  this.isInError=false;
  if(this.getFormGroup.valid)
  {
    this.dataSent=true;
    let refIfExist = this.model[this.refName];
    let whatToSend=this.roleService.createRole(this.model);
    if(this.model[this.refName])
      whatToSend=this.roleService.updateRole(this.model,refIfExist);
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
  this.model=Role.clear();
  this.updateForm();
}
updateForm()
{
  this.validationForm.patchValue(this.model);
}
/*********************** End Managing ********************* */


data:GenericPageable=new GenericPageable();
refName="refRole";
fields:string[]=["codeRole","labelRole"];
/* Static columns 
TODO translate status exist in StatusEnum [Backend] */
fieldsStatic:string[]=["editable","removable","status"];
fieldsDates:string[]=[];
fieldsList:any[]=[];
sizes:number[]=[5,10,20,50,100];
isLoad:boolean=true;
doingAction:boolean=false;
doingActionTo:number=null;
currentPage:number=0;
currentSize:number=10;

setFieldsListForNeed()
{
  
}

constructor(
        public formBuilder: FormBuilder,
        private modalService:NgbModal,
        private translate:TranslateService,
        private handleRequestService:HandleRequestService,
        private roleService:RoleService,
        public languageService: LanguageService,
        private router:Router) 
{ 
  this.setInputs();
  this.initFormValidation();
}

ngOnInit(): void {
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
  this.roleService.getRolesWithPageAndSize(page,this.currentSize).subscribe(response=>{
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
  this.roleService.getRole(refToUpdate).subscribe(response=>{
    this.model=response;
    this.updateForm();
    document.getElementById("top").scrollIntoView(true);
  },err=>{this.handleRequestService.handleError(err);})
  .add(()=>{this.doingAction=false;this.doingActionTo=null;});
}

deleteItem(componant,refToDelete,index){
  this.modalService.open(componant, {centered: true}).result.then((result) => {
    if(result == "save"){
    this.doingAction=true;
    this.doingActionTo=index;
    this.roleService.deleteRole(refToDelete)
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
}}
