import { Component, Inject, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { PublicationView } from 'src/app/entities/sielView/PublicationView';
import { ExhibitorView } from 'src/app/entities/sielView/ExhibitorView';
import { VotePublicationView } from 'src/app/entities/sielView/VotePublicationView';
import { PageDetails } from 'src/app/entities/sielView/PageDetails';


@Component({
  selector: 'app-vote-publication',
  templateUrl: './vote-publication.component.html',
  styleUrls: ['./vote-publication.component.scss']
})
export class VotePublicationComponent implements OnInit {

  constructor(private modalService: NgbModal, private snackBar:MatSnackBar, private sielService: SielService,
    public languageService: LanguageService,  private activatedRoute: ActivatedRoute, public location: Location, private router: Router) {

  }

  next =0;
  index =0;
  publications: Array<PublicationView> = []
  publication : PublicationView = new PublicationView();
  exhibitor :ExhibitorView = new ExhibitorView();
  pageDetail: PageDetails = new PageDetails();
  refExhibitor;
  refCommission;
  deniedReason=false;
  isRefused = false;
  isValid = false;
  isSending = false;
  canSubmit=false;
  refPlanning;
  votePublication: VotePublicationView = new VotePublicationView();
  ngOnInit(): void {
    this.refExhibitor=this.activatedRoute.snapshot.params.refExhibitor;
    this.refCommission=this.activatedRoute.snapshot.params.refCommission
    this.refPlanning=this.activatedRoute.snapshot.params.refPlanning;
    console.log(this.activatedRoute.snapshot.params)
    this.sielService.getInfoDemandePublication(this.refExhibitor).subscribe((data)=>{
      this.exhibitor=data;
      this.getExhibitorPublication();
    });
  }

  voteAndGetNextOne(){
    console.log(this.votePublication)
    if(this.checkObligatoryData()){
      ++this.next;
      console.log(this.next+"---"+this.publications.length);
      if(this.next< this.publications.length){
      /// this.sielService.votePublication(this.refCommission, this.refPlanning, this.votePublication).subscribe((response)=>{
          this.publication = this.publications[this.next];
          this.votePublication.refPublication = this.publication.refPublication;
          this.isSending =true;
      // });
      }else{
        if(this.index < this.pageDetail.totalPages){
          this.getExhibitorPublication();
        }
        else{
          this.location.back();
        }
      }
      this.initiVariable();
    }
  }

  checkObligatoryData(){
    if(this.votePublication.nbrAccepted==0 && this.votePublication.nbrDenied ==0){
      return false;
    }
    if(this.isRefused){
      return this.votePublication.deniedReason.trim()!="";
    }else{
      return this.votePublication.deniedReason.trim()==""
    }
  }

  refuser(){
    this.votePublication.status="REFUSER";
    this.deniedReason = true;
    this.isRefused=!(this.isValid=false);
  }
  accepter(){
    this.votePublication.status="ACCEPTED";
    this.deniedReason = false;
    this.isValid=!(this.isRefused=false);
  }

  checkSubmitData(){
    this.canSubmit=this.checkObligatoryData();
  }

  getExhibitorPublication(){
    this.sielService.getExposantPublications(this.refExhibitor,'PENDING',this.index,10).subscribe((dataresponse)=>{
      this.publications=dataresponse["content"];
      this.pageDetail=dataresponse["pageDetails"];
      this.next=0;
      this.publication=this.publications[this.next];
      this.votePublication.refPublication = this.publication.refPublication;
      this.index++;
  });
  }

  initiVariable(){
    this.deniedReason=false;
    this.isRefused = false;
    this.isValid = false;
    this.isSending = false;
    this.canSubmit=false;
  }
}
