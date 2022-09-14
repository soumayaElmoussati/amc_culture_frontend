import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";


import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';


// ngx-quill
import { QuillModule } from 'ngx-quill';

// angular-archwizard
import { ArchwizardModule } from 'angular-archwizard';

import { AdministrationComponent } from "./administration.component";

import { Routes, RouterModule } from '@angular/router';
import { AdminExposantComponent } from './admin-exposant/admin-exposant.component';

import { MatStepperModule } from "@angular/material/stepper";

import { CdkStepperModule } from '@angular/cdk/stepper';


import { NgxCsvParserModule } from 'ngx-csv-parser';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TranslateModule } from "@ngx-translate/core";

import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { MatIconModule } from '@angular/material/icon';

import { NgbNavModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDetailsDemandeExposantComponent } from './admin-details-demande-exposant/admin-details-demande-exposant.component';
import { NouvelleEditionComponent } from './admin-edition/nouvelle-edition/nouvelle-edition.component';
import { AdminCommissionComponent } from './admin-commission/admin-commission.component';
import { ListeEditionComponent } from './admin-edition/liste-edition/liste-edition.component';
import { AdminPlanningComponent } from './admin-planning/admin-planning.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AdminMembreCommissionComponent } from './admin-membre-commission/admin-membre-commission.component';
import { AdminAddPublicationPlanningComponent } from './admin-add-publications-planning/admin-add-publications-planning.component';
import { AdminVoteCommissionComponent } from './admin-vote-commission/admin-vote-commission.component';
import { AdminListeCommissionComponent } from './admin-liste-commission/admin-liste-commission.component';
import { AdminBookingSchoolComponent } from './admin-booking-school/admin-booking-school.component';
import { AdminBookingStandComponent } from './admin-booking-stand/admin-booking-stand.component';

import { HistorisationAdminComponent } from "./admin-historisation/admin-historisation.component";
import { ExposantRecapComponent } from './exposant-recap/exposant-recap.component';
import { VotePublicationComponent } from './vote-publication/vote-publication.component';
import { AdminForeignExhibitorsComponent } from './admin-foreign-exhibitors/admin-foreign-exhibitors.component';
import { AdminProfessionArtisticComponent } from './admin-profession-artistic/admin-profession-artistic.component';
import { AdminProfessionArtisticDomainComponent } from './admin-profession-artistic-domain/admin-profession-artistic-domain.component';
import { AdminProfessionArtisticCategoryComponent } from './admin-profession-artistic-category/admin-profession-artistic-category.component';
import { AdminArtistCardComponent } from './admin-artist-card/admin-artist-card.component';
import { AdminDomainComponent } from './admin-domains/admin-domain/admin-domain.component';
import { AdminSubdomainComponent } from './admin-domains/admin-subdomain/admin-subdomain.component';
import { AdminProjectManagementComponent } from './admin-project/admin-project-management/admin-project-management.component';
import { NewWriterComponent } from './admin-directory/writers/new-writer/new-writer.component';
import { WritersListComponent } from './admin-directory/writers/writers-list/writers-list.component';
import { NewPublisherComponent } from './admin-directory/publishers/new-publisher/new-publisher.component';
import { PublishersListComponent } from './admin-directory/publishers/publishers-list/publishers-list.component';
import { NewDistributorComponent } from './admin-directory/distributors/new-distributor/new-distributor.component';
import { NewPrintingComponent } from './admin-directory/printings/new-printing/new-printing.component';
import { DistributorsListComponent } from './admin-directory/distributors/distributors-list/distributors-list.component';
import { PrintingsListComponent } from './admin-directory/printings/printings-list/printings-list.component';
import { NewPublicLibraryComponent } from './admin-directory/public-libraries/new-public-library/new-public-library.component';
import { PublicLibrariesListComponent } from './admin-directory/public-libraries/public-libraries-list/public-libraries-list.component';
import { NewLibraryComponent } from './admin-directory/libraries/new-library/new-library.component';
import { LibrariesListComponent } from './admin-directory/libraries/libraries-list/libraries-list.component';
import { AdminPrizeAwardComponent } from './admin-prize-award/admin-prize-award.component';
import { Hassan2AwardListComponent } from './admin-prize-award/hassan2-award/hassan2-award-list/hassan2-award-list.component';
import { HonoraryAwardListComponent } from './admin-prize-award/honorary-award/honorary-award-list/honorary-award-list.component';
import { ListCardComponent } from './admin-artist-card/list-card/list-card.component';
import { ArtistCardEditionComponent } from './admin-artist-card/artist-card-edition/artist-card-edition.component';
import { DataTablesModule } from 'angular-datatables';
import { BookAwardListComponent } from './admin-prize-award/book-award/book-award-list/book-award-list.component';
import { TheaterAwardListComponent } from './admin-prize-award/theater-award/theater-award-list/theater-award-list.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AdminRoleAssignComponent } from './admin-role-assign/admin-role-assign.component';




const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'exposant-admin',
        pathMatch: 'full'
      },
      {
        path: 'exposant-admin',
        component: AdminExposantComponent
      },
      {
        path: 'exposant-demande-details-admin/:id',
        component: AdminDetailsDemandeExposantComponent
      },
      {
        path: 'admin-commission',
        component: AdminCommissionComponent
      },
      {
        path: 'admin-nouvelle-edition',
        component: NouvelleEditionComponent
      },
      {
        path: 'liste-edition',
        component: ListeEditionComponent
      },
      {
        path: 'ajout-membre-commission',
        component: AdminMembreCommissionComponent
      },
      {
        path: 'ajout-publications-planning',
        component: AdminAddPublicationPlanningComponent
      },
      {
        path: 'vote-seance-commission/:refCommission',
        component: AdminVoteCommissionComponent
      },
      {
        path: 'seances-commission',
        component: AdminListeCommissionComponent
      },
      {
        path: 'admin-booking-school',
        component: AdminBookingSchoolComponent
      },
      {
        path: 'admin-booking-stand',
        component: AdminBookingStandComponent
      },
      {
        path: 'admin-liste-demandes',
        component: HistorisationAdminComponent
      },
      {
        path: 'admin-exposant-detail/:refExposant',
        component: ExposantRecapComponent
      },
      {
        path: 'vote-seance-commission/:refCommision/planning/:refPlanning/decision/:refExhibitor',
        component: VotePublicationComponent
      },
      {
        path: 'admin-profession-artistic/categories',
        component: AdminProfessionArtisticCategoryComponent
      },
      {
        path: 'admin-profession-artistic/domains',
        component: AdminProfessionArtisticDomainComponent
      },
      {
        path: 'admin-profession-artistic',
        component: AdminProfessionArtisticComponent
      },
      {
        path: 'admin-project-domains',
        component: AdminDomainComponent
      },
      {
        path: 'admin-project',
        component: AdminProjectManagementComponent
      },
      {
        path: 'admin-new-writer',
        component: NewWriterComponent
      },
      {
        path: 'admin-writers-list',
        component: WritersListComponent
      },
      {
        path: 'admin-new-distributor',
        component: NewDistributorComponent
      },
      {
        path: 'admin-distributor-list',
        component: WritersListComponent
      },
      {
        path: 'admin-new-publisher',
        component: NewPublisherComponent
      },
      {
        path: 'admin-publishers-list',
        component: PublishersListComponent
      },
      {
        path: 'admin-new-printing',
        component: NewPrintingComponent
      },
      {
        path: 'admin-printings-list',
        component: PrintingsListComponent
      },
      {
        path: 'admin-new-public-library',
        component: NewPublicLibraryComponent
      },
      {
        path: 'admin-public-libraries-list',
        component: PublicLibrariesListComponent
      },
      {
        path: 'admin-new-library',
        component: NewLibraryComponent
      },
      {
        path: 'admin-libraries-list',
        component: LibrariesListComponent
      },
      {
        path: 'admin-cards-list',
        component: ListCardComponent
      },
      {
        path: 'admin-new-edition',
        component: ArtistCardEditionComponent
      },
      {
        path: 'admin-hassan2-list',
        component: Hassan2AwardListComponent
      },
      {
        path: 'admin-honorary-list',
        component: HonoraryAwardListComponent
      },
      {
        path: 'admin-book-list',
        component: BookAwardListComponent
      },
      {
        path: 'admin-theater-list',
        component: TheaterAwardListComponent
      },
      {
        path: 'manage-roles',
        component: ManageRolesComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdministrationComponent,
    AdminExposantComponent,
    AdminDetailsDemandeExposantComponent,
    AdminCommissionComponent,
    NouvelleEditionComponent,
    ListeEditionComponent,
    AdminPlanningComponent,
    AdminMembreCommissionComponent,
    AdminAddPublicationPlanningComponent,
    AdminListeCommissionComponent,
    AdminVoteCommissionComponent,
    AdminBookingSchoolComponent,
    AdminBookingStandComponent,
    HistorisationAdminComponent,
    ExposantRecapComponent,
    VotePublicationComponent,
    AdminForeignExhibitorsComponent,
    AdminProfessionArtisticComponent,
    AdminProfessionArtisticDomainComponent,
    AdminProfessionArtisticCategoryComponent,
    AdminArtistCardComponent,
    AdminDomainComponent,
    AdminSubdomainComponent,
    AdminProjectManagementComponent,
    NewWriterComponent,
    WritersListComponent,
    NewPublisherComponent,
    NewLibraryComponent,
    PublishersListComponent,
    NewDistributorComponent,
    DistributorsListComponent,
    NewPrintingComponent,
    PrintingsListComponent,
    NewPublicLibraryComponent,
    AdminPrizeAwardComponent,
    Hassan2AwardListComponent,
    HonoraryAwardListComponent,
    ListCardComponent,
    ArtistCardEditionComponent,
    BookAwardListComponent,
    TheaterAwardListComponent,
    ManageRolesComponent,
    ManageUsersComponent,
    AdminRoleAssignComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeahterIconModule,
    QuillModule.forRoot(), // ngx-quill
    ArchwizardModule, // angular-archwizard
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
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
    NgbTooltipModule,
    NgbPaginationModule,
    NgbCollapseModule,
    DataTablesModule
  ]
})
export class AdministrationModule { }
