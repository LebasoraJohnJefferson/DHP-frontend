import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-back-btn',
  templateUrl: './back-btn.component.html',
  styleUrl: './back-btn.component.scss'
})
export class BackBtnComponent {
  
  constructor(
    public location: Location,
  ){

  }


  goBack() {
    this.location.back();
  }
}
