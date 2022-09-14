import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import AccountResponse from 'src/app/entities/AuthenticatedAccount';
import { ArtistCardService } from 'src/app/services/artist-card/artist-card.service';

@Component({
  selector: 'app-artist-card-list',
  templateUrl: './artist-card-list.component.html',
  styleUrls: ['./artist-card-list.component.scss']
})
export class ArtistCardListComponent implements OnInit {

  //dtOptions: DataTables.Settings = {};
  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private artistService: ArtistCardService) { }
  dtOptions: any = {};
  connectedUser = new AccountResponse();
  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    this.artistService.getAuthenticatedUser(userInfo.user).subscribe(
      (res) => {
        this.connectedUser.setObject(res);
        console.log("connected", this.connectedUser)
        this.artistService.getDemandsByref(this.connectedUser.refArtistAccount).subscribe((res) => {
          this.data = res;
          console.log(this.data);
          this.dtTrigger.next();
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.dtOptions = {
      responsive: true,
      pagingType: "full_numbers",
      pageLength: 3,
      processing: true,
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "print"],
    };

  }

  /*getDemands() {
     this.artistService.getDemandsByref(this.connectedUser.refArtistAccount).subscribe((res) => {
       this.data = res;
       this.dtTrigger.next();
     });
   
   }*/


}
