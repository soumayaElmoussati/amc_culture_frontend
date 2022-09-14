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


@Component({
  selector: 'app-admin-booking-school',
  templateUrl: './admin-booking-school.component.html',
  styleUrls: ['./admin-booking-school.component.scss']
})
export class AdminBookingSchoolComponent implements OnInit {

  bookingSchool = [];
  tmpRequestsList = [];

  bookingSchoolPagination :PageDetails = new PageDetails();

  constructor( public formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,
     private modalService: NgbModal, private snackBar:MatSnackBar,
     public languageService: LanguageService, private sielService: SielService) {

  }

  ngOnInit(): void {
    this.sielService.getBookingSchool(null,0,10).subscribe((response)=>{
      this.bookingSchoolPagination = response["pageDetails"];
      this.bookingSchool =response["content"];
    }, (err)=>{
      this.snackBar.open("Impossible de récupérer les pré-reservation", "fermer");
    });
  }


  bookingSchoolPaginationChange(e){
    this.sielService.getBookingSchool(null, e-1, this.bookingSchoolPagination.size)
      .subscribe((response)=>{
          this.bookingSchool = response["content"];
        }, (err)=>{
          this.snackBar.open("Impossible de récupérer les pré-reservation", "fermer");
        });
      }


      openRejectedDemande(content, ref) {
        this.modalService.open(content, {centered: true}).result.then((result) => {
          if(result == "save"){
            this.sielService.changeDemandeStatusBookingSchool(ref, "REJECTED").subscribe((response)=>{
              this.tmpRequestsList.map((item)=>{
                if(item.refBookingSchool == ref){
                  item.status = "REJECTED";
                }
              })
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
          }
        }).catch((res) => {
        });
      }
     
      openAcceptedDemande(content, ref) {
        this.modalService.open(content, {centered: true}).result.then((result) => {
          if(result == "save"){
            this.sielService.changeDemandeStatusBookingSchool(ref, "ACCEPTED").subscribe((response)=>{
              this.tmpRequestsList.map((item)=>{
                if(item.refBookingSchool == ref){
                  item.status = "ACCEPTED";
                }
              })
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
          }
        }).catch((res) => {
        });
      }


      sendEmail(refBookingSchool){
        this.sielService.sendMail('BOOKING_SCHOOL',refBookingSchool).subscribe((date)=>{
        },(error)=>{
          this.snackBar.open("Une erreur s'est produit", "fermer");
        });
      }
}
