import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import { SielService } from 'src/app/services/siel/administration/siel.service';
import {LanguageService} from "../../../../services/language/language.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material/snack-bar';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import Swal from 'sweetalert2';
import { PageDetails } from 'src/app/entities/sielView/PageDetails';
import { COUNTRIES } from 'src/app/lists/countries';
import { STAND_TYPES } from 'src/app/lists/StandTypes';

@Component({
  selector: 'app-admin-booking-stand',
  templateUrl: './admin-booking-stand.component.html',
  styleUrls: ['./admin-booking-stand.component.scss']
})
export class AdminBookingStandComponent implements OnInit {

  bookingStandPagination : PageDetails = new PageDetails();

  bookingStand = [];

  


  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
     private modalService: NgbModal, private snackBar:MatSnackBar,
     public languageService: LanguageService, private sielService: SielService) {

  }

  ngOnInit(): void {
    this.sielService.getBookingStand('',0,10).subscribe((response)=>{
      this.bookingStandPagination = response["pageDetails"];
      this.bookingStand =response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les réservation du stand", "fermer");
    });
  }

  bookingStandPaginationChange(e){
     this.sielService.getBookingSchool("", e-1, this.bookingStandPagination.size)
  .subscribe((response)=>{
      this.bookingStand = response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les réservations du stand", "fermer");
    });
  }

  openAcceptedDemande(content, refExhibitors, refBooking,volume) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      if(result == "accepter"){
        let stand = {
            "volumeInCubicMeter" : volume,
            "category": null,
            "paymentMethod": null,
            "branchActivity": null
        }
      this.sielService.updateBookingStand(refExhibitors,refBooking, stand).subscribe((response)=>{
  
        this.updateStatusBookingStand(refBooking,"ACCEPTED");
          Swal.fire(
            {
              position: 'center',
              title: 'Demande approuvée avec succès',
              text: '',
              showConfirmButton: false,
              timer: 2000,
              icon: 'success'
            }
          ).then(()=>{
          });
        }, (error)=>{
          this.snackBar.open("Une erreur s'est produit", "fermer");
        });
      }else{
        this.updateStatusBookingStand(refBooking,"REJECTED");
      }
    }).catch((res) => {
    });
  }

 updateStatusBookingStand(refBooking,status){
  this.sielService.changeDemandeStatusBookingStand(refBooking, status).subscribe((response)=>{
  }, (error)=>{
    this.snackBar.open("Une erreur s'est produit", "fermer");
  });
 }

 sendEmail(refBooking){
  this.sielService.sendMail('BOOKING_STAND',refBooking).subscribe((date)=>{
  },(error)=>{
    this.snackBar.open("Une erreur s'est produit", "fermer");
  });
 }

 getCountry(codeCountry):string{
   let data = COUNTRIES.find(ele=>ele.alpha2Code==codeCountry);
    return data.name;
  }

  getStandLibelle(codeStand){
    let data = STAND_TYPES.find(ele=> ele.id==codeStand);
    return data.name;
  }
}
