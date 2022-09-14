import { Component, OnInit } from '@angular/core';
import {STAND_TYPES} from "../../../../lists/StandTypes";
import {SUPERFICIES} from "../../../../lists/superficies";
import {MODES_PAIEMENT} from "../../../../lists/modePaiement";
import { ActivatedRoute } from '@angular/router';
import {SielService} from "../../../../services/siel/administration/siel.service";

@Component({
  selector: 'app-admin-details-demande-exposant',
  templateUrl: './admin-details-demande-exposant.component.html',
  styleUrls: ['./admin-details-demande-exposant.component.scss']
})
export class AdminDetailsDemandeExposantComponent implements OnInit {


  active = 1;
  typesStand = [];
  superficies = [];
  modesPaiement = [];
  editeursRepresentes = [];
  publicationsList = [];
  activitesProposees = [];

  requestDetails;

  constructor(private route:ActivatedRoute, private sielService: SielService) {
    this.route.queryParams.subscribe((res)=>{
      this.requestDetails = res;
      this.sielService.getEditeursRepresentes(res.refExhibitor).subscribe((editeurs)=>{
        this.editeursRepresentes = editeurs;
      },(err)=>{
        console.log(err);
      });
      this.sielService.getPublications(res.refExhibitor).subscribe((publications)=>{
        this.publicationsList = publications;
      },(err)=>{
        console.log(err);
      });
      this.sielService.getProposedActivities(res.refExhibitor).subscribe((activities)=>{
        this.activitesProposees = activities;
      },(err)=>{
        console.log(err);
      });
    });
   }

  ngOnInit(): void {
    this.typesStand = STAND_TYPES;
    this.superficies = SUPERFICIES;
    this.modesPaiement = MODES_PAIEMENT;
  }

}
