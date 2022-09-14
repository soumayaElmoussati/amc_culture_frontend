import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/services/language/language.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { DomainsService } from 'src/app/services/proposal-project/domains-general/domains.service';
import { Domains } from 'src/app/entities/proposalProjectView/domains';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})

export class FirstPageComponent implements OnInit {
  prefix:string="/proposal-project/";
  subdomains:any[]=[];
  subdomain:string;
  domain:string;
  domainsData:Domains[]=[];
  domains:any = [];
  action:string;
  actions:any[]=[
    {value:"NEW",label:"Nouvelle element",labelAr:"عنصر جديد"},
    {value:"OLD",label:"Mes demandes",labelAr:"طلباتي"}
  ];
  routing:string[]=[];

  getLabelDomain(data)
   {
     if(this.languageService.userLanguage == 'ar')
        return data.labelAr;
     return data.label;
   }

  constructor(  
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder, 
    private translate: TranslateService,
    private router:Router,
    private modalService: NgbModal, 
    public  languageService: LanguageService,
    private snackBar:MatSnackBar,
    private handleRequestService:HandleRequestService,
    private domainService:DomainsService) {
      this.routing["PERSON,CULTURE"]="artist-account";
      this.routing["COMPANY,CULTURE"]="company-account";
      this.routing["COOPERTIVE,CULTURE"]="cooperative-account";
      this.routing["COOPERTIVE,BOOK"]="cooperative-account-book";
  }
  @ViewChild('wizardForm') wizardForm: BaseWizardComponent;

  onChangeDomain(event)
   {
      if(event==null)
      {
        this.subdomains=[];
        this.domain=event;
        return;
      }
      this.domain=event;
      this.getDomain(event);
   }
   onChangeAction(event)
   {
      this.action=event;
   }
   onChangeSubdomain(event)
   {
      this.subdomain=event;
   }
   getDomains()
   {
      this.domainService.getDomains().subscribe(response=>{
        this.domainsData=response;
        this.domains=response.map(elem=>{return {value:elem.refDomain,labelAr:elem.shortNameAr,label:elem.shortName}});
      },err=>{this.handleRequestService.handleError(err);});
   }
   getDomain(ref:string)
   {
      this.subdomains=this.domainsData.find(elm=>elm.refDomain===ref)?.subDomains.map(elem=>{return {value:elem.refSubDomain,labelAr:elem.nameAr,label:elem.name}});
   }

  ngOnInit(): void {
    sessionStorage.removeItem("currSubDomain");
    this.getDomains();
  }
  onDone = ()=>{
    sessionStorage.setItem("currSubDomain",this.subdomain);
    let sendTo=localStorage.getItem("type")+","+this.domainsData.find(elm=>elm.refDomain===this.domain)?.component;
    let out=this.routing[sendTo];
    if(out==undefined)
    {
      this.snackBar.open(this.translate.instant('serviceNotImplementedYet'), this.translate.instant('close'));
      return;
    }
    out=this.prefix+out;
    if(this.action=="OLD")
      out+="-demande";
    this.router.navigate([out]);
  }
}
