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
  selector: 'app-admin-profession-artistic',
  templateUrl: './admin-profession-artistic.component.html',
  styleUrls: ['./admin-profession-artistic.component.scss']
})
export class AdminProfessionArtisticComponent implements OnInit {



  noData:Boolean=false;
  isLoad:Boolean=true;
  showTableLoader:Boolean=false;
  isLodedBtnEdit:Boolean=false;
  isLodedBtnDelete=null;
  isSubmitted:Boolean=false;
  artsitics:Array<any>=[];
  artsiticsname:Array<any>=[];
  permissions:Array<any>=[];
  totalLength:any;
  itemId:any;
  newData:any={name:"",nameAr:"",refArtisticProfessionDomain:null};
  
  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, private modalService: NgbModal, private snackBar:MatSnackBar, public languageService: LanguageService, private router: Router,private artsiticProfessionService:ArtisticProfessionService,private translate : TranslateService) {
  }
 
  ngOnInit(): void {
    this.initData();
  }
  initData(){
    forkJoin([this.artsiticProfessionService.getAllArtisticProfession(),this.artsiticProfessionService.getAllArtisticProfessionDomain()])
    .subscribe(
      (r:any)=>{
        this.artsitics=r[0];
        this.permissions=r[1];
        if(this.permissions.length==0) this.noData=true;
      })
      .add(()=>{this.isLoad=false;});
  }
  setartsitics(i){
    this.itemId=i;
    this.newData={...this.artsitics[i]};
  }
  editorAddartsitics(){
    if(!this.error){
      this.isLodedBtnEdit=true;
        //on Add
        if(this.itemId==-1){
          this.artsiticProfessionService.createArtisticProfession(this.newData)
          .subscribe(r=>{
            this.artsitics.push(r);
          Swal.fire( { position: 'center', title: this.translate.instant("table_add_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
            this.clearform();
          })
          .add(()=>{this.isLoad=false;});
        }
        //on Edit
        else{
          this.artsiticProfessionService.editArtisticProfession(this.newData.refArtisticProfession,this.newData)
          .subscribe(r=>{
            let i = this.itemId;
            Swal.fire( { position: 'center', title: this.translate.instant("table_edit_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
            this.artsiticsname[i]=(this.newData.name);
            this.artsitics[i]={...this.newData};
            this.clearform();
          })
          .add(()=>{this.isLoad=false;});
        }
    }
    else this.isSubmitted=true;
  }
  clearform(){
    this.itemId=null;
    this.newData={name:"",nameAr:"",refArtisticProfessionDomain:null};
    this.isLodedBtnEdit=false;
    this.isSubmitted=false
    this.isLodedBtnDelete=null;
  }
  Addartsitic(){
    this.itemId=-1;
  }
  errors(key){
    let i = this.itemId;
    if(this.newData[key]==null || this.newData[key].length==0)
      return "RequiredFiled";
    return false;
  }
  get error(){
    return((this.errors('name') || this.errors('nameAr') || this.errors('refArtisticProfessionDomain')))
  }
  deleteartsitics(c,i){
    this.modalService.open(c, {centered: true}).result.then((result) => {
      if(result == "save"){
      this.isLodedBtnDelete = i;
      this.itemId=-100;
      this.artsiticProfessionService.deleteArtisticProfession(this.artsitics[i].refArtisticProfession)
      .subscribe(e=>{
        this.artsitics = this.artsitics.filter((e,j)=>j!=i);
        this.clearform();
        Swal.fire( { position: 'center', title: this.translate.instant("table_delete_done"), text: '', showConfirmButton: false, timer: 2000, icon: 'success' } );
      },
      error=>{ this.clearform();})
    }});
  }
  getNameByRef(e){
    if(this.noData) return;
    let a = this.permissions.filter(p=>p.refArtisticProfessionDomain==e);
    if(a.length>0) return a[0].name;
    return;
  }
}