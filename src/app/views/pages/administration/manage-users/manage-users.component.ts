import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { Users } from 'src/app/entities/sharedView/users';
import { LanguageService } from 'src/app/services/language/language.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import { UsersService } from 'src/app/services/shared/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
/*********************** Managing ********************* */
model:Users=new Users();
fieldsForModel:string[]=["firstname","lastname","cin","email","phoneNumber","password","accountType"];
validationForm:FormGroup;
isFormSubmitted:boolean=false;
isInError:Boolean=false;
dataSent:boolean=false;
attaching: string=null;
accountTypeOption:any[]=[{
    id:"PERSON",
    label:"Personne"
  },{
    id:"COMPANY",
    label:"Entreprise"
  }];
initFormValidation()
{
  var ValidationAllElement={};
  for(let el of this.fieldsForModel)
    ValidationAllElement[el]=['', Validators.required];
  ValidationAllElement["email"]=['', [Validators.required,Validators.email]];
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
    {type:"simpleInput",data:{formControlName:"firstname",label:"firstname",placeHolder:"",type:"text",ngModel:this.model.firstname,onChange:(v)=>{this.onChangevalue(v,'model','firstname')},required:true}},
    {type:"simpleInput",data:{formControlName:"lastname",label:"lastname",placeHolder:"",type:"text",ngModel:this.model.lastname,onChange:(v)=>{this.onChangevalue(v,'model','lastname')},required:true}},
    {type:"simpleInput",data:{formControlName:"password",label:"password",placeHolder:"",type:"password",ngModel:this.model.password,onChange:(v)=>{this.onChangevalue(v,'model','password')},required:true}},
    {type:"simpleInput",data:{formControlName:"email",label:"email",placeHolder:"",type:"email",ngModel:this.model.password,onChange:(v)=>{this.onChangevalue(v,'model','email')},required:true}},
    {type:"phoneNumber",data:{formControlName:"phoneNumber",label:"phoneNumber",placeHolder:"",type:"text",ngModel:this.model.phoneNumber,onChange:(v)=>{this.onChangevalue(v,'model','phoneNumber')},required:true}},
    {type:"selectInput",data:{formControlName:"accountType",label:"accountType",placeHolder:"",ngModel:'model.accountType',onChange:(v)=>{this.onChangevalue(v,'model','accountType')},required:true,options:'accountType',value:'id',labelS:'label',getLabel:(r)=>{return r.label;},multiple:false}},
    {type:"simpleInput",data:{formControlName:"cin",label:"cinOrCompanyNumber",placeHolder:"",type:"text",ngModel:this.model.cin,onChange:(v)=>{this.onChangevalue(v,'model','cin')},required:true}},
  ];
}
getModelValue(key){
  let keys = key.split(".");
  var d = this;
  for(var i =0;i<keys.length;i++)
      d=d[keys[i]];
  return d;
}
getOption(option){
  if(option=="accountType")
  {
    return this.accountTypeOption;
  }
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
    let whatToSend=this.usersService.createUser(this.model);
    if(this.model[this.refName])
      whatToSend=this.usersService.updateUser(this.model,refIfExist);
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
  this.model=Users.clear();
  this.updateForm();
}
updateForm()
{
  this.validationForm.patchValue(this.model);
}
linkItem(refToLink,index)
{
  this.attaching=refToLink;
  document.getElementById("top").scrollIntoView(true);
}
finishing()
{
  this.attaching=null;
  this.clearForm();
  this.refreshData();
}
/*********************** End Managing ********************* */


data:GenericPageable=new GenericPageable();
refName="refAccount";
fields:string[]=["firstname","lastname","email","phoneNumber","cin"];
/* Static columns 
TODO translate status exist in StatusEnum [Backend] */
fieldsStatic:string[]=[];
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
  private usersService:UsersService,
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
  this.usersService.getUsersWithPageAndSize(page,this.currentSize).subscribe(response=>{
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
  this.usersService.getUser(refToUpdate).subscribe(response=>{
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
    this.usersService.deleteUser(refToDelete)
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
