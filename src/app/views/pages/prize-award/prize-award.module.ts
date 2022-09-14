
import { NewHassan2AwardComponent } from './hassan2-award/new-hassan2-award/new-hassan2-award.component';
import { Hassan2AwardDetailComponent } from './hassan2-award/hassan2-award-detail/hassan2-award-detail.component';
import { Hassan2AwardListComponent } from './hassan2-award/hassan2-award-list/hassan2-award-list.component';
import { NewHonoraryAwardComponent } from './honorary-award/new-honorary-award/new-honorary-award.component';
import { HonoraryAwardDetailComponent } from './honorary-award/honorary-award-detail/honorary-award-detail.component';
import { HonoraryAwardListComponent } from './honorary-award/honorary-award-list/honorary-award-list.component';
import { NewTheaterAwardComponent } from './theater-award/new-theater-award/new-theater-award.component';
import { TheaterAwardDetailComponent } from './theater-award/theater-award-detail/theater-award-detail.component';
import { TheaterAwardListComponent } from './theater-award/theater-award-list/theater-award-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PrizeAwardComponent } from './prize-award.component';
import { NewBookAwardComponent } from './book-award/new-book-award/new-book-award.component';
import { BookAwardDetailComponent } from './book-award/book-award-detail/book-award-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { BookAwardListComponent } from './book-award/book-award-list/book-award-list.component';
import { DataTableModule } from 'simple-datatables';

const routes: Routes = [
  {
    path: '',
    component: PrizeAwardComponent,
    children: [
      {
        path: '',
        redirectTo: 'prize-award',
        pathMatch: 'full'
      },
      {
        path: 'new-book-award',
        component: NewBookAwardComponent
      },
      {
        path: 'book-award-detail/:refBook',
        component: BookAwardDetailComponent
      },
      {
        path: 'book-award-list',
        component: BookAwardListComponent
      },
      {
        path: 'new-hassan2-award',
        component: NewHassan2AwardComponent
      },
      {
        path: 'hassan2-award-detail/:refHassan2Award',
        component: Hassan2AwardDetailComponent
      },
      {
        path: 'hassan2-award-list',
        component: Hassan2AwardListComponent
      },
      {
        path: 'new-honorary-award',
        component: NewHonoraryAwardComponent
      },
      {
        path: 'honorary-award-detail/:refHonoraryAward',
        component: HonoraryAwardDetailComponent
      },
      {
        path: 'honorary-award-list',
        component: HonoraryAwardListComponent
      },
      {
        path: 'new-theater-award',
        component: NewTheaterAwardComponent
      },
      {
        path: 'theater-award-detail/:refTheaterAward',
        component: TheaterAwardDetailComponent
      },
      {
        path: 'theater-award-list',
        component: TheaterAwardListComponent
      }

    ]
  }
]
@NgModule({
  declarations: [PrizeAwardComponent, NewHassan2AwardComponent, NewBookAwardComponent, NewTheaterAwardComponent, NewHonoraryAwardComponent, BookAwardListComponent, Hassan2AwardListComponent, TheaterAwardListComponent, HonoraryAwardListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ArchwizardModule,
    NgSelectModule,
    MatStepperModule,
    CdkStepperModule,
    MatInputModule,
    TranslateModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class PrizeAwardModule { }
