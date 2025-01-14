import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom.type';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  constructor() {}
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/classroom/';

  // Récupérer toutes les salles de classe
  getAllClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.baseUrl);
  }

  // Récupérer une salle de classe par son ID
  getClassroomById(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.baseUrl}${id}`);
  }

  // Créer une nouvelle salle de classe
  createClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.baseUrl, classroom);
  }

  // Mettre à jour une salle de classe existante
  updateClassroom(id: number, classroom: Classroom): Observable<Classroom> {
    return this.http.patch<Classroom>(`${this.baseUrl}${id}`, classroom);
  }

  // Supprimer une salle de classe
  deleteClassroom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
