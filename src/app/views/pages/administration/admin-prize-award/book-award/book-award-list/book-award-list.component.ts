import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BookAwardService } from 'src/app/services/prize-award/book-award/book-award.service';


@Component({
  selector: 'app-book-award-list',
  templateUrl: './book-award-list.component.html',
  styleUrls: ['./book-award-list.component.scss']
})
export class BookAwardListComponent implements OnInit {

  data: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private bookAwardService: BookAwardService) { }
  dtOptions: any = {};
  ngOnInit(): void {


    this.bookAwardService.getAllDemands()
      .subscribe(res => {
        this.data = res;
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
  }

}
