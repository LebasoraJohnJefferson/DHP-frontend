import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { HotToastService } from '@ngneat/hot-toast';
import moment from 'moment';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  seletedRoute:string | undefined = 'info';
  defaultImage:string ='../../../../../assets/images/error-404.png'
  eventId:any;
  isDeleting:boolean = false
  event:any;
  constructor(
    public route: ActivatedRoute,
    private _eventService:EventService,
    public toast:HotToastService,
    public router:Router
  ) {
    this.route.queryParams.subscribe((value) => {
      this.eventId = value['id'];
    });
    this.getEvent()
  }

  ngOnInit(): void {
  }

  changeRoute(route:string){
    this.seletedRoute = route
  }

  getEvent(){
    this._eventService.getEvent(this.eventId).subscribe({
      next:(res)=>{
        this.event = res.data
        console.log(this.event)
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred!')
        this.redirectToEvent()
      }
    })
  }

  dateFormat(date: any) {
    return moment(date).fromNow();
  }
  
  ngOnChanges(){
  }

  redirectToEvent(){
    this.router.navigate(['/admin/events/'])
  }


  deleteEvent(){
    const confirmation = confirm("Are you sure, you want to delete this event?")
    if(!confirmation) return
    this.isDeleting = true
    this._eventService.deleteEvent(this.eventId).subscribe({
      next:()=>{
        this.toast.success("Succssfully Deleted!")
        this.redirectToEvent()
        this.isDeleting = false
      },
      error:(err)=>{
        this.toast.error(err?.error?.message || 'An error occurred!')
        this.isDeleting = false
      }
    })
  }

}
