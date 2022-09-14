import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";


import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';


// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';


import { Routes, RouterModule } from '@angular/router';

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

import {GroupeScolaire} from "./groupe-scolaire.component";

import {NouvelleDemandePrereservation} from "./nouvelle-demande-prereservation/nouvelle-demande-prereservation.component";

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




const routes: Routes = [
  {
    path: '',
    component: GroupeScolaire,
    children: [
      {
        path: '',
        redirectTo: 'nouvelle-demande',
        pathMatch: 'full'
      },
      {
        path: 'nouvelle-demande',
        component: NouvelleDemandePrereservation
      },
    ]
  }
]

@NgModule({
  declarations: [GroupeScolaire, NouvelleDemandePrereservation],
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
    SweetAlert2Module.forRoot()
  ]
})
export class GroupeScolaireModule { }
