import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';

class Step1AwardData {
  refArtistAccount: any;
  cin: String;
  firstName: String;
  lastName: String;
  firstNameAr: String;
  lastNameAr: String;
  gender: String;
  email: String;
  phoneNumber: String;
  ribNumber: String;
  otherPhoneNumber: String;
  maritalStatus: String;
  dependentChildren: Number;

  constructor() {
    const user_d = JSON.parse(localStorage.getItem("userData"));
    this.email = user_d?.user ? user_d.user : "";
  }

  setObject(arr: any) {
    for (let i of Object.keys(arr))
      this[i] = arr[i];
  }
}

@Component({
  selector: 'app-hassan2-award-list',
  templateUrl: './hassan2-award-list.component.html',
  styleUrls: ['./hassan2-award-list.component.scss']
})
export class Hassan2AwardListComponent implements OnInit {

  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dataStep1A = new Step1AwardData();

  constructor(private hassan2AwardService: Hassan2AwardService) { }

  dtOptions: any = {};
  ngOnInit(): void {


    this.hassan2AwardService.getArtistInformation(this.dataStep1A.email).subscribe((response) => {
      this.dataStep1A = response;
      console.log(response);
      this.hassan2AwardService.getDemandsByref(this.dataStep1A.refArtistAccount)
        .subscribe(res => {
          this.data = res;
          console.log(this.data);
          this.dtTrigger.next();
        });
    }, (err) => {
      console.log(err);
    });

    this.dtOptions = {
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'print'
      ]
    };
    //this.getDemands();
  }

  /*getDemands() {
    this.hassan2AwardService.getDemandsByref(this.dataStep1A.refArtistAccount)
      .subscribe(res => {
        this.data = res;
        this.dtTrigger.next();
      });
  }*/

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
