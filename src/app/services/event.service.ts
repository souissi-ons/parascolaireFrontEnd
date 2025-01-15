import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventReq } from '../models/requestEvent';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/event/';

  // Créer un nouvel utilisateur (club ou étudiant)
  createRequestEvent(newEventReq: EventReq): Observable<any> {
    return this.http.post(`${this.baseUrl}request`, newEventReq);
  }

  // Récupérer tous les utilisateurs
  findAllRequest(): Observable<any> {
    return this.http.get(`${this.baseUrl}requests`);
  }

  // Récupérer tous les utilisateurs
  findAllUserRequest(id: string): Observable<any> {
    console.log('idd', id);
    return this.http.get(`${this.baseUrl}${id}/requests`);
  }
  // Accepter une demande d'événement
  acceptEvent(id: string): Observable<EventReq> {
    return this.http.patch<EventReq>(`${this.baseUrl}${id}/accept`, {});
  }

  // Refuser une demande d'événement
  rejectEvent(id: string): Observable<EventReq> {
    return this.http.patch<EventReq>(`${this.baseUrl}${id}/reject`, {});
  }

  findEvents(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${userId}/all`);
  }
}
