import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/services/language/language.service';
import { Router } from '@angular/router';
import { ArtisticProfessionService } from 'src/app/services/siel/administration/artistic-porfession/artistic-profession.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-profession-artistic-category',
  templateUrl: './admin-profession-artistic-category.component.html',
  styleUrls: ['./admin-profession-artistic-category.component.scss']
})
export class AdminProfessionArtisticCategoryComponent implements OnInit {


isLoad:Boolean=true;
  showTableLoader:Boolean=false;
  isLodedBtnEdit:Boolean=false;
  isLodedBtnDelete=null;
  isSubmitted:Boolean=false;
  artsiticCategorys:Array<any>=[];
  artsiticCategorysname:Array<any>=[];
  permissions:Array<any>=[];
  totalLength:any;
  itemId:any;
  newData:any={name:"",nameAr:""};
  
  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private router: Router,private artsiticProfessionService:ArtisticProfessionService,private translate : TranslateService) {
  }
 
  ngOnInit(): void {
    this.initData();
  }
  initData(){
    // forkJoin([this.artsiticProfessionService.getPermession(),this.artsiticProfessionService.getartsiticCategorys()])
    this.artsiticProfessionService.getAllArtisticProfessionCategory()
    .subscribe(
      (r:any)=>{
        this.artsiticCategorys=r;
      })
      .add(()=>{this.isLoad=false;});
  }
  setartsiticCategorys(i){
    this.itemId=i;
    this.newData={...this.artsiticCategorys[i]};
  }
  editorAddartsiticCategorys(){
    if(!this.error){
      this.isLodedBtnEdit=true;
        //on Add
        if(this.itemId==-1){
          this.artsiticProfessionService.createArtisticProfessionCategory(this.newData)
          .subscribe(r=>{
            this.artsiticCategorys.push(r);
          Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
            this.clearform();
          })
          .add(()=>{this.isLoad=false;});
        }
        //on Edit
        else{
          this.artsiticProfessionService.editArtisticProfessionCategory(this.newData.refArtisticProfessionCategory,this.newData)
          .subscribe(r=>{
            let i = this.itemId;
            Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
            this.artsiticCategorysname[i]=(this.newData.name);
            this.artsiticCategorys[i]={...this.newData};
            this.clearform();
          })
          .add(()=>{this.isLoad=false;});
        }
    }
    else this.isSubmitted=true;
  }
  clearform(){
    this.itemId=null;
    this.newData={name:"",nameAr:"",};
    this.isLodedBtnEdit=false;
    this.isSubmitted=false
    this.isLodedBtnDelete=null;
  }
  AddartsiticCategory(){
    this.itemId=-1;
  }
  errors(key){
    let i = this.itemId;
    if(this.newData[key]==null || this.newData[key].length==0)
      return "RequiredFiled";
    return false;
  }
  get error(){
    return((this.errors('name') || this.errors('nameAr') ))
  }
  deleteartsiticCategorys(c,i){
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.isLodedBtnDelete = i;
      this.itemId=-100;
      this.artsiticProfessionService.deleteArtisticProfessionCategory(this.artsiticCategorys[i].refArtisticProfessionCategory)
      .subscribe(e=>{
        this.artsiticCategorys = this.artsiticCategorys.filter((e,j)=>j!=i);
        this.clearform();
        Swal.fire( { position: 'center', title: this.translate.instant("table_delete_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
      },
      error=>{ this.clearform();})
    }});
  }
}