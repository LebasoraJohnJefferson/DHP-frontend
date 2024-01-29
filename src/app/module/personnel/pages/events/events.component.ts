import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {

  events:any=[]
  
  constructor(
    private _eventService:EventService
  ){
  }

  ngOnInit(): void {
    this.getEvents();
  }


  getEvents() {
    this._eventService.getEvents().subscribe(
      (response: any) => {
        this.events = response.data;
        console.log(this.events)
      },
      (error: any) => {}
    );
  }
}
