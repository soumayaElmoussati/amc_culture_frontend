import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Role } from 'src/app/entities/sharedView/role';
import { RoleAccount } from 'src/app/entities/sharedView/roles-account';
import { LanguageService } from 'src/app/services/language/language.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import { RoleService } from 'src/app/services/shared/role.service';
import { UsersService } from 'src/app/services/shared/users.service';

@Component({
  selector: 'app-admin-role-assign',
  templateUrl: './admin-role-assign.component.html',
  styleUrls: ['./admin-role-assign.component.scss']
})
export class AdminRoleAssignComponent implements OnInit {
  refName:string="refAccount";
  data:string[]=[];
  update:number=null;
  @Input("ref")
  refAccount:string;
  @Output("finishing")
  callback: EventEmitter<any> = new EventEmitter();


  model:RoleAccount=new RoleAccount();
  fieldsForModel:string[]=["roles"];
  validationForm:FormGroup;
  isFormSubmitted:boolean=false;
  isInError:Boolean=false;
  dataSent:boolean=false;
  isLoad:boolean=false;
  rolesOption:any[];

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
  get getIcon()
  {
    if(this.update!=null)
      return "save";
    return "add_circle_outline";
  }
  inputs:any[]=[];
  setInputs()
  {
    this.inputs = [
      {type:"selectInput",data:{formControlName:"roles",label:"roles",placeHolder:"",ngModel:'model.roles',onChange:(v)=>{this.onChangevalue(v,'model','roles')},required:true,options:'roles',value:'id',labelS:'label',getLabel:(r)=>{return r.label;},multiple:true}},
    ];
  }
  getOption(option){
    if(option=="roles")
    {
      return this.rolesOption;
    }
  }
  getModelValue(key){
    let keys = key.split(".");
    var d = this;
    for(var i =0;i<keys.length;i++)
        d=d[keys[i]];
    return d;
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
      this.onFinish();
    }
  }
  cancelAll()
  {
    console.log(this.callback);
    this.callback.emit();
  }
  onFinish()
  {
    this.dataSent=true;
    this.model.refAccount=this.refAccount;
    let whatToSend=this.usersService.assignRolesToUser(this.model);
    whatToSend.subscribe(response=>{
        this.handleRequestService.successMessage("attached");
        this.callback.emit();
    },err=>{
      this.handleRequestService.handleError(err);
    }).add(()=>{
      this.isFormSubmitted=false;
      this.dataSent=false;
    });
  }
  clearForm()
  {
    this.isFormSubmitted=false;
    this.model=RoleAccount.clear();
    this.updateForm();
    this.update=null;
  }
  updateForm()
  {
    this.validationForm.patchValue(this.model);
  }

  getOld()
  {
    this.usersService.getRoles(this.refAccount).subscribe(response=>{
        this.model.roles=response;
    },err=>{
      this.handleRequestService.handleError(err);
      this.callback.emit();
    })
  }

  setEditForm(item,index)
  {
      this.model={...item};
      this.updateForm();
      this.update=index;
      document.getElementById("top").scrollIntoView(true);
  }

  deleteForm(componant,index){
    this.modalService.open(componant, {centered: true}).result.then((result) => {
      if(result == "save"){
        this.data=this.data.filter((value,ind,arr)=>{return ind!=index});
    }});
  }

  constructor(
    private snackBar:MatSnackBar,
    private modalService:NgbModal,
    public formBuilder: FormBuilder,
    private translate:TranslateService,
    private handleRequestService:HandleRequestService,
    private usersService:UsersService,
    public languageService: LanguageService,
    public roleService : RoleService,
    private router:Router) 
  { 
    this.setInputs();
    this.initFormValidation();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getOld();
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(response=>{
      this.rolesOption=response.map(e=>{return {id:e?.codeRole,label:e?.labelRole}});
    },
      err=>{this.handleRequestService.handleError(err);this.callback.emit();});
  }

}
