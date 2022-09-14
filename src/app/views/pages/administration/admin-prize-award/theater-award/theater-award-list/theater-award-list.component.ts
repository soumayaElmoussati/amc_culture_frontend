import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TheaterAwardService } from 'src/app/services/prize-award/theater-award/theater-award.service';
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';

@Component({
  selector: 'app-theater-award-list',
  templateUrl: './theater-award-list.component.html',
  styleUrls: ['./theater-award-list.component.scss']
})
export class TheaterAwardListComponent implements OnInit {

  dtOptions: any = {};
  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private theaterAwardService: TheaterAwardService) { }
  ngOnInit(): void {


    this.theaterAwardService.getAllDemands()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        console.log(this.data);
        this.dtTrigger.next();
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
