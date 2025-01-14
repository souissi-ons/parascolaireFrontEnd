import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // URL de l'API MongoDB

  constructor(private http: HttpClient) {}

  // Créer un nouvel utilisateur (club)
  createUser(newUser: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, newUser);
  }

  // Récupérer tous les utilisateurs
  findAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Récupérer tous les clubs
  findClubs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clubs`);
  }

  // Récupérer tous les étudiants
  findStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  // Récupérer un utilisateur par son ID
  findOneUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un utilisateur
  updateUser(id: string, updatedUser: User): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updatedUser);
  }

  // Supprimer un utilisateur
  removeUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Récupérer l'image d'un club par son ID
  getClubImage(clubId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${clubId}/image`, {
      responseType: 'blob',
    });
  }

  // Uploader l'image d'un club
  uploadClubImage(clubId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clubId}/upload-image`, formData);
  }
}
