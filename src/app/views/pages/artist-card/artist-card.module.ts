import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { ArchwizardModule } from 'angular-archwizard';
import {DataTablesModule} from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { DropzoneConfigInterface, DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';

import { NewArtistCardComponent } from './new-artist-card/new-artist-card.component';
import { ArtistCardListComponent } from './artist-card-list/artist-card-list.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  maxFiles : 1
};


const routes: Routes = [
  {
    path: '',
    component: ArtistCardComponent,
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: NewArtistCardComponent
      },
      {
        path: 'list',
        component: ArtistCardListComponent
      }
    ]
  }
]

@NgModule({
  declarations: [ArtistCardComponent, NewArtistCardComponent, ArtistCardListComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot({ validation: true}),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ArchwizardModule,
    NgSelectModule,
    MatStepperModule,
    CdkStepperModule,
    MatInputModule,
    TranslateModule,
    DataTablesModule
  ],
  providers : [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class ArtistCardModule { }
