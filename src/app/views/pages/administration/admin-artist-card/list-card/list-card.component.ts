import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ArtistCardService } from 'src/app/services/artist-card/artist-card.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private artistService: ArtistCardService) { }
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      pagingType: "full_numbers",
      pageLength: 3,
      processing: true,
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "print"],
    };
    this.getDemands();
  }
  getDemands() {
    this.artistService.getAllDemandsCard().subscribe((res) => {
      this.data = res;
      this.dtTrigger.next();
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
