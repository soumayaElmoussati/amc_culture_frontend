import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subdomains } from 'src/app/entities/proposalProjectView/subdomains';
import { LanguageService } from 'src/app/services/language/language.service';
import { DomainsService } from 'src/app/services/proposal-project/domains-general/domains.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';

@Component({
  selector: 'app-admin-subdomain',
  templateUrl: './admin-subdomain.component.html',
  styleUrls: ['./admin-subdomain.component.scss']
})
export class AdminSubdomainComponent implements OnInit,OnChanges {
  refName:string="refSubDomain";
  data:Subdomains[]=[];
  update:number=null;
  @Input("ref")
  refDomain:string;
  @Output("finishing")
  callback: EventEmitter<any> = new EventEmitter();


  model:Subdomains=new Subdomains();
  fieldsForModel:string[]=["name","nameAr"];
  validationForm:FormGroup;
  isFormSubmitted:boolean=false;
  isInError:Boolean=false;
  dataSent:boolean=false;
  isLoad:boolean=false;

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
      {type:"simpleInput",data:{formControlName:"name",label:"name",placeHolder:"",type:"text",ngModel:this.model.name,onChange:(v)=>{this.onChangevalue(v,'model','name')},required:true}},
      {type:"simpleInput",data:{formControlName:"nameAr",label:"nameAr",placeHolder:"",type:"text",ngModel:this.model.nameAr,onChange:(v)=>{this.onChangevalue(v,'model','nameAr')},required:true}},
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
      if(this.update!=null)
        this.data=this.data.map((element,index,arr)=>
          index===this.update?{...this.model}:element);
      else
        this.data.push({...this.model});
      this.clearForm();
      this.isFormSubmitted=false;
    }
  }
  cancelAll()
  {
    console.log(this.callback);
    this.callback.emit();
  }
  onFinish()
  {
    if(this.data.length==0)
    {
      this.snackBar.open(this.translate.instant('emptydata'), this.translate.instant('close'));
      return;
    }
    this.dataSent=true;
    let whatToSend=this.domainsService.attachSubomains(this.data,this.refDomain);
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
    this.model=Subdomains.clear();
    this.updateForm();
    this.update=null;
  }
  updateForm()
  {
    this.validationForm.patchValue(this.model);
  }

  getOld()
  {
    this.domainsService.getDomain(this.refDomain).subscribe(response=>{
        this.data=response.subDomains;
        this.isLoad=true;
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

  constructor(private snackBar:MatSnackBar,private modalService:NgbModal,public formBuilder: FormBuilder,private translate:TranslateService,private handleRequestService:HandleRequestService,private domainsService:DomainsService,public languageService: LanguageService,private router:Router) 
  { 
    this.setInputs();
    this.initFormValidation();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.getOld();
  }

  ngOnInit(): void {
  }

}
