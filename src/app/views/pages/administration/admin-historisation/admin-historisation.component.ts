import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from '../../../../services/siel/exposant/siel.service';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';
import { EditionDetail } from 'src/app/entities/sielView/EditionDetails';
import { couldStartTrivia } from 'typescript';




@Component({
  selector: 'app-admin-historisation',
  templateUrl: './admin-historisation.component.html',
  styleUrls: ['./admin-historisation.component.scss']
})
export class HistorisationAdminComponent implements OnInit {



  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver, 
    private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService,
     private router: Router, public languageService:LanguageService) {

  }

  editions:Array<EditionDetail> = [];


  ngOnInit(): void {
    this.getAllEdition()
    console.log(this.editions)
  }

  getAllEdition(){
    this.sielService.getListEditions().subscribe((item)=>{
      console.log(item[0])
      for(var i=0;i<item.length;i++){
        let edition = new EditionDetail();
        edition.isCollapsed = !(i==0);
        console.log(item[i])
        edition.edition=item[i];
        this.sielService.getExhibitorByEdition(edition.edition.refEdition,'MA',0,10).subscribe((ele)=>{
          edition.exhibitor=ele.exhibitors.content;
          edition.page=ele.exhibitors.pageDetails;
          this.editions.push(edition);
        })
      }
    })
  }

  openDetailExhibitor(refExhibitor){
    this.router.navigate(['administration/admin-exposant-detail/', refExhibitor]);
  }
  
}
