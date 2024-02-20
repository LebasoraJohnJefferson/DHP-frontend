import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events: any = [];
  previewImg: any;

  isShowConfirmation:boolean = false
  createEventModal: boolean = false;
  submitLoading: boolean = false;
  isCommitting:boolean = false
  createForm!: FormGroup;

  constructor(
    private router: Router,
    private toast: HotToastService,
    private _eventService:EventService
  ) {}

  ngOnInit(): void {
    this.getEvents();

    this.createForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      venue: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
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

  loadInputImgToSrc(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.previewImg = reader.result;

      this.createForm.patchValue({
        image: reader.result,
      });
    };
  }

  onSubmit() {
    if (!this.createForm.valid) {
      this.toast.warning('Please fill out the fields with valid data.');
      return;
    }

    this.isCommitting = true

    this._eventService.createEvent(this.createForm.value).subscribe(
      (response: any) => {
        this.toast.success(response?.message || 'Successfully created');

        this.isCommitting = false
        this.createEventModal = false;
        this.submitLoading = false;
        this.isShowConfirmation = false;
        this.createForm.reset()
        this.getEvents();
        this.previewImg = null;
      },
      (error: any) => {
        this.toast.error(error?.error?.message || 'An error occurred');

        this.isCommitting = false
        this.submitLoading = false;
      }
    );
  }

  approval(){
    this.isShowConfirmation = true
    this.submitLoading = true;
  }

  cancelApproval(){
    this.isShowConfirmation  = false
    this.submitLoading = false;
  }



  dateFormat(date: any) {
    return moment(date).fromNow();
  }
}
