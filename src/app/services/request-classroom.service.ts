import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateRequestClassroomDto,
  UpdateRequestClassroomDto,
} from '../models/classroom.type';

@Injectable({
  providedIn: 'root',
})
export class RequestClassroomService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/request-classroom/';

  // Create a new request classroom
  createRequestClassroom(
    createRequestClassroomDto: CreateRequestClassroomDto
  ): Observable<any> {
    console.log(createRequestClassroomDto);
    return this.http.post(this.baseUrl, createRequestClassroomDto);
  }

  // Get all request classrooms
  getAllRequestClassrooms(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getMyRequestClassrooms(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}requestedBy/${userId}`);
  }
  // Get a single request classroom by ID
  getRequestClassroomById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  // Update a request classroom by ID
  updateRequestClassroom(
    id: string,
    updateRequestClassroomDto: UpdateRequestClassroomDto
  ): Observable<any> {
    return this.http.patch(`${this.baseUrl}${id}`, updateRequestClassroomDto);
  }

  // Delete a request classroom by ID
  deleteRequestClassroom(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
