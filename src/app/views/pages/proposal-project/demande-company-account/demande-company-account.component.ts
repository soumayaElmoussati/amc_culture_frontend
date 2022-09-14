import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { GenericPageable } from 'src/app/entities/generic-pageable';
import { LanguageService } from 'src/app/services/language/language.service';
import { HandleRequestService } from 'src/app/services/shared/handle-request.service';
import Swal from 'sweetalert2';
import { CompanyAccountService } from 'src/app/services/proposal-project/company-account/company-account.service';

@Component({
  selector: 'app-demande-company-account',
  templateUrl: './demande-company-account.component.html',
  styleUrls: ['./demande-company-account.component.scss']
})
export class DemandeCompanyAccountComponent implements OnInit {
  data:GenericPageable=new GenericPageable();
  refName="refCompanyAccount";
  fields:string[]=["refCompanyAccount","companyName"]
  /* Static columns 
  TODO translate status exist in StatusEnum [Backend] */
  fieldsStatic:string[]=["status"];
  fieldsDates:string[]=["dateCreation"];
  sizes:number[]=[5,10,20,50,100];
  isLoad:boolean=true;
  doingAction:boolean=false;
  doingActionTo:number=null;
  currentPage:number=0;
  currentSize:number=10;

  constructor(private modalService:NgbModal,private translate:TranslateService,private handleRequestService:HandleRequestService,private companyAccountService:CompanyAccountService,public languageService: LanguageService,private router:Router) { }

  ngOnInit(): void {
    this.initData();
  }

  private initData()
  {
    this.getData(0);
  }

  private getData(page:number)
  {
    this.isLoad=true;
    this.companyAccountService.getCompanyAccountsForUserWithPageAndSize(page,this.currentSize).subscribe(response=>{
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
    this.doingActionTo=index;
    this.doingAction=true;
    this.router.navigate([`/proposal-project/company-account/${refToUpdate}`]);
  }

  deleteItem(componant,refToDelete,index){
    this.modalService.open(componant, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.doingAction=true;
      this.doingActionTo=index;
      this.companyAccountService.deleteCompanyicAccount(refToDelete)
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

