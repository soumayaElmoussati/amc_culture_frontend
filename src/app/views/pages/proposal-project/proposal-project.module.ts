import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';
import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { QuillModule } from 'ngx-quill';
import { ArchwizardModule } from 'angular-archwizard';
import {ProposalProjectComponent} from "./proposal-project.component";
import { Routes, RouterModule } from '@angular/router';
import {MatStepperModule} from "@angular/material/stepper";
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgbNavModule, NgbCollapseModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angular2-qrcode';
import {CreationModificationCompanyAccountComponent} from "./creation-modification-company-account/creation-modification-company-account.component";
import { DemandeCompanyAccountComponent } from './demande-company-account/demande-company-account.component';
import { ArtistAccountComponent } from './artist-account/artist-account.component';
import { DemandsArtistAccountsComponent } from './demands-artist-accounts/demands-artist-accounts.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { CooperativeAccountComponent } from './cooperative-account/cooperative-account.component';
import { DemandeCooperativeAccountComponent } from './demande-cooperative-account/demande-cooperative-account.component';
import { CooperativeAccountBookComponent } from './cooperative-account-book/cooperative-account-book.component';
import { DemandeCooperativeAccountBookComponent } from './demande-cooperative-account-book/demande-cooperative-account-book.component';





const routes: Routes = [
  {
    path: '',
    component: ProposalProjectComponent,
    children: [
       {
         path: '',
         component: FirstPageComponent
       },
      {
        path: 'company-account',
        component: CreationModificationCompanyAccountComponent
      },
      {
        path: 'cooperative-account',//:ref
        component: CooperativeAccountComponent
      },
      {
        path: 'company-account/:ref',
        component: CreationModificationCompanyAccountComponent
      },
      {
        path: 'cooperative-account/:ref',//:ref
        component: CooperativeAccountComponent
      },
      {
        path: 'cooperative-account-book/:ref',//:ref
        component: CooperativeAccountBookComponent
      },
      {
        path: 'cooperative-account-book',//:ref
        component: CooperativeAccountBookComponent
      },
      {
        path: 'company-account-demande',
        component: DemandeCompanyAccountComponent
      },
      {
        path: 'cooperative-account-demande',
        component: DemandeCooperativeAccountComponent
      },
      {
        path: 'cooperative-account-book-demande',
        component: DemandeCooperativeAccountBookComponent
      },
      {
        path: 'artist-account-demande',
        component: DemandsArtistAccountsComponent
      },
      {
        path: 'artist-account/:ref',
        component: ArtistAccountComponent
      },
      {
        path: 'artist-account',
        component: ArtistAccountComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ProposalProjectComponent, CreationModificationCompanyAccountComponent, DemandeCompanyAccountComponent, FirstPageComponent, CooperativeAccountComponent,ArtistAccountComponent, DemandsArtistAccountsComponent, DemandeCooperativeAccountComponent, CooperativeAccountBookComponent, DemandeCooperativeAccountBookComponent],
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
    QRCodeModule]
  })
export class ProposalProjectModule { }
