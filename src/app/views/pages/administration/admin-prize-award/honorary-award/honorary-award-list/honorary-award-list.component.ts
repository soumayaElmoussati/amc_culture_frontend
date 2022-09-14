import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HonoraryAwardService } from 'src/app/services/prize-award/honorary-award/honorary-award.service';

@Component({
  selector: 'app-honorary-award-list',
  templateUrl: './honorary-award-list.component.html',
  styleUrls: ['./honorary-award-list.component.scss']
})
export class HonoraryAwardListComponent implements OnInit {

  dtOptions: any = {};
  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private honoraryAwardService: HonoraryAwardService) { }
  ngOnInit(): void {


    this.honoraryAwardService.getAllDemands()
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
