import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Hassan2AwardService } from 'src/app/services/prize-award/hassan2-award/hassan2-award.service';



@Component({
  selector: 'app-hassan2-award-list',
  templateUrl: './hassan2-award-list.component.html',
  styleUrls: ['./hassan2-award-list.component.scss']
})
export class Hassan2AwardListComponent implements OnInit {

  dtOptions: any = {};
  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private hassan2AwardService: Hassan2AwardService) { }
  ngOnInit(): void {


    this.hassan2AwardService.getAllDemands()
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
