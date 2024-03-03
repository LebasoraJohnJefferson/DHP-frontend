import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
const BASEURL = environment.baseURL;
const HELPER = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient, private router: Router) {}

  createEvent(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/admin/event`, data);
  }

  postComment(data: any, eventId: number): Observable<any> {
    return this.http.post(`${BASEURL}/admin/event/comment/${eventId}`, data);
  }

  getAllProvincesNotYetInvited(eventId: any): Observable<any> {
    return this.http.get(`${BASEURL}/admin/event_invitation/${eventId}`);
  }

  inviteProvince(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/admin/event_invitation`, data);
  }

  deleteInvitation(inviteId: any): Observable<any> {
    return this.http.delete(`${BASEURL}/admin/event_invitation/${inviteId}`);
  }

  getEvents(): any {
    return this.http.get(`${BASEURL}/admin/event`);
  }

  getAllInvitedProvince(eventId: any): Observable<any> {
    return this.http.get(
      `${BASEURL}/admin/get_all_invited_province/${eventId}`
    );
  }

  getEvent(eventId: any): Observable<any> {
    return this.http.get(`${BASEURL}/admin/event/${eventId}`);
  }

  deleteEvent(eventId: any) {
    return this.http.delete(`${BASEURL}/admin/event/${eventId}`);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${BASEURL}/admin/event/comment/${commentId}`);
  }

  editComment(commentId: number, data: any): Observable<any> {
    return this.http.put(`${BASEURL}/admin/event/comment/${commentId}`, data);
  }
}
