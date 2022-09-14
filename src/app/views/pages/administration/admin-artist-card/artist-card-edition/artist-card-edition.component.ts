import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-artist-card-edition',
  templateUrl: './artist-card-edition.component.html',
  styleUrls: ['./artist-card-edition.component.scss']
})
export class ArtistCardEditionComponent implements OnInit {
  constructor() { }
  validationForm: FormGroup;
  ngOnInit(): void {
  }
  formSubmit() {
    console.log("you are in submit method")
  }
}
