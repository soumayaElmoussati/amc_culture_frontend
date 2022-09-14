import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";


import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';

import {ExposantComponent} from "./exposant.component";

import { Routes, RouterModule } from '@angular/router';
import { NouvelleDemandeExposantComponent } from './nouvelle-demande-exposant/nouvelle-demande-exposant.component';
import { ListeDemandeExposantComponent } from './liste-demande-exposant/liste-demande-exposant.component';

import {MatStepperModule} from "@angular/material/stepper";

import { CdkStepperModule } from '@angular/cdk/stepper';


// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { NgxCsvParserModule } from 'ngx-csv-parser';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatIconModule} from "@angular/material/icon";

import {TranslateModule} from "@ngx-translate/core";

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { NgbNavModule, NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {DetailsDemandeExposantComponent} from "./details-demande-exposant/details-demande-exposant.component";
import { GenererQrCodeComponent } from "./generer-qr-code-exposant/generer-qr-code-exposant.component";

import { QRCodeModule } from 'angular2-qrcode';

import {HistorisationExposantComponent} from "./historisation-exposant/historisation-exposant.component";
import { DemandeExposantComponent } from "./demande-exposant/demande-exposant.component";
import { BonCommandeComponent } from './bon-commande/bon-commande.component';





const routes: Routes = [
  {
    path: '',
    component: ExposantComponent,
    children: [
      {
        path: '',
        redirectTo: 'demande',
        pathMatch: 'full'
      },
      {
        path: 'demande',
        component: DemandeExposantComponent
      },
      {
        path: 'exposant-demande-details/:id',
        component: DetailsDemandeExposantComponent
      },
      {
        path: 'bon-commande',
        component: BonCommandeComponent
      },
      {
        path: 'exposant-demande-details',
        component: DetailsDemandeExposantComponent
      },
      {
        path: 'generer-qr-code',
        component: GenererQrCodeComponent
      },
     
      {
        path: 'liste-demandes',
        component: HistorisationExposantComponent
      },
      
    ]
  }
]

@NgModule({
  declarations: [ExposantComponent, NouvelleDemandeExposantComponent, ListeDemandeExposantComponent, DetailsDemandeExposantComponent, GenererQrCodeComponent, DemandeExposantComponent, BonCommandeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask
    NgSelectModule,
    MatStepperModule,
    CdkStepperModule,
    MatInputModule,
    DropzoneModule,
    NgxCsvParserModule,
    MatSnackBarModule,
    TranslateModule,
    MatIconModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot(),
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbTooltipModule,
    QRCodeModule
  ]
})
export class ExposantModule { }
