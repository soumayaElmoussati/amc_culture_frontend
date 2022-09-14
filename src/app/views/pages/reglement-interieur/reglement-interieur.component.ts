import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/services/language/language.service';
import { SielService } from 'src/app/services/siel/exposant/siel.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from 'src/app/services/siel/exposant/Backend/BackendService.service';

@Component({
  selector: 'app-reglement-interieur',
  templateUrl: './reglement-interieur.component.html',
  styleUrls: ['./reglement-interieur.component.scss']
})
export class ReglementInterieurComponent implements OnInit {

  
  srcfr ="/assets/pdf/REGLEMENT_fr.pdf";
  srcar = "/assets/pdf/REGLEMENT_ar.pdf";
  constructor(  public  languageService: LanguageService, private router:Router,private translate: TranslateService) {
  }
  ngOnInit(): void {
  }
  
  download(event,url){
    event.preventDefault();
      let link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "procuration");
      link.click();
  }
  downloadar(event){
    this.download(event,this.srcar);
  }
  downloadfr(event){
    this.download(event,this.srcfr);
  }
}

