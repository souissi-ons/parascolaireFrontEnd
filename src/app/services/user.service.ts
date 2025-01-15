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

  // Créer un nouvel utilisateur (club ou étudiant)
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
  updateUser(id: string, updatedUser: any): Observable<any> {
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

  // Ajouter un membre à un club
  addMember(
    clubId: string,
    studentId: string,
    memberRole: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${clubId}/members`, {
      studentId,
      memberRole,
    });
  }

  // Récupérer les membres d'un club
  getMembers(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clubId}/members`);
  }

  // Récupérer les étudiants qui ne sont pas membres d'un club
  getNonMembers(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clubId}/non-members`);
  }

  // Récupérer les clubs auxquels un étudiant appartient
  getClubsByUserId(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${studentId}/clubs`);
  }

  // Changer le mot de passe d'un utilisateur
  changePassword(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
  }

  // Retirer un membre d'un club
  removeMember(clubId: string, studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${clubId}/members/${studentId}`);
  }

  // Mettre à jour le rôle d'un membre dans un club
  updateMemberRole(
    clubId: string,
    studentId: string,
    newRole: string
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${clubId}/members/${studentId}`, {
      role: newRole,
    });
  }

  // Récupérer les détails d'un club par son ID
  getClubDetails(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clubId}/details`);
  }

  // Récupérer les événements organisés par un club
  getClubEvents(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clubId}/events`);
  }

  // Récupérer les statistiques d'un club (nombre de membres, événements, etc.)
  getClubStatistics(clubId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clubId}/statistics`);
  }

  // Rechercher des utilisateurs par nom ou email
  searchUsers(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}`);
  }
}
