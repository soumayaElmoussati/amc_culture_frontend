import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposalProjectComponent } from './proposal-project.component';
import { ArtistAccountComponent } from './artist-account/artist-account.component';

const routes: Routes = [
  {
    path: '',
    component: ProposalProjectComponent,
    children: [
      {
        path: '',
        redirectTo: 'nouvelle',
        pathMatch: 'full'
      },
      {
        path: 'nouvelle',
        component: ArtistAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalProjectRoutingModule { }
