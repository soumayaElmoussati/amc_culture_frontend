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


import { NgxCsvParserModule } from 'ngx-csv-parser';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import {TranslateModule} from "@ngx-translate/core";

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {MatIconModule} from '@angular/material/icon';

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';



import {BonCommandeComponent} from "./bon-commande/bon-commande.component";
import {NoLinkPageComponent} from "./no-link-page.component";



const routes: Routes = [
  {
    path: '',
    component: NoLinkPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'bon-commande',
        pathMatch: 'full'
      },
      {
        path: 'bon-commande',
        component: BonCommandeComponent
      }
    ]
  }
]

@NgModule({
  declarations: [NoLinkPageComponent, BonCommandeComponent],
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
    NgxCsvParserModule,
    MatSnackBarModule,
    TranslateModule,
    NgxPaginationModule,
    MatIconModule,
    NgbNavModule,
    NgbTooltipModule
  ]
})
export class NoLinkPageModule { }
