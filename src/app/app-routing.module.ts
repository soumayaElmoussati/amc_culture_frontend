import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { GeneralComponent } from './views/pages/general/general.component';
import { AdministrationComponent } from './views/pages/administration/administration.component';
import {NoLinkPageComponent} from "./views/pages/no-link-pages/no-link-page.component";
import { ReglementInterieurComponent } from './views/pages/reglement-interieur/reglement-interieur.component';
import { ExportAuthorizationComponent } from './views/pages/export-authorization/export-authorization.component';
import { NewExportAuthorizationComponent } from './views/pages/export-authorization/new-export-authorization/new-export-authorization.component';


const routes: Routes = [
  { path:'', loadChildren: () => import('./views/pages/public-pages/public-pages.module').then(m => m.PublicPagesModule) },
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component : DashboardComponent,
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data : {
          role : ["admin","user"]
        }
      },
      {
        path: 'reglement-interieur',
        component : ReglementInterieurComponent,
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        data : {
          role : ["admin","user"]
        }
      },
      {
        path: 'exposant',
        loadChildren: () => import('./views/pages/exposant/exposant.module').then(m => m.ExposantModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'artist-card',
        loadChildren: () => import('./views/pages/artist-card/artist-card.module').then(m => m.ArtistCardModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'export-authorization',
        loadChildren: () => import('./views/pages/export-authorization/export-authorization.module').then(m => m.ExportAuthorizationModule),
        component : ExportAuthorizationComponent,
        data : {
          role : ["user"]
        }
      },
      {
        path: 'proposal-project',
        loadChildren: () => import('./views/pages/proposal-project/proposal-project.module').then(m => m.ProposalProjectModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'groupe-scolaire',
        loadChildren: () => import('./views/pages/groupe-scolaire/groupe-scolaire.module').then(m => m.GroupeScolaireModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'proposal-project',
        loadChildren: () => import('./views/pages/proposal-project/proposal-project.module').then(m => m.ProposalProjectModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'prize-award',
        loadChildren: () => import('./views/pages/prize-award/prize-award.module').then(m => m.PrizeAwardModule),
        data : {
          role : ["user"]
        }
      },
      {
        path: 'administration',
        loadChildren: () => import('./views/pages/administration/administration.module').then(m => m.AdministrationModule),
        component : AdministrationComponent,
        data : {
          role : ["admin"]
        }
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule),
        component : GeneralComponent,
        data : {
          role : ["user"]
        }
      },

      {
        path: 'action-page',
        loadChildren: () => import('./views/pages/no-link-pages/no-link-page.module').then(m => m.NoLinkPageModule),
        component : NoLinkPageComponent,
        data : {
          role : ["user"]
        }
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': "Erreur",
      'title': 'Page inéxistante',
      'desc': 'La page que vous cherchez n\'éxiste pas'
    }
  },
  {
    path: 'edition-expiré',
    component: ErrorPageComponent,
    data: {
      'type': "Délai dépassé",
      'title': ' ',
      'desc': 'La période d\'édition est expirée'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
