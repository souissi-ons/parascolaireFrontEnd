import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth/';
  constructor(private router: Router) {}

  // Méthode pour se connecter
  login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', {
      email: user.email,
      password: user.password,
    });
  }

  // Méthode pour récupérer l'utilisateur actuel
  getCurrentUser() {
    const token = localStorage.getItem('access_token'); // Récupérez le token

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Décodez le token

        // Vérifiez si le token est expiré
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token has expired');
          this.logout(); // Déconnectez l'utilisateur si le token est expiré
          return null;
        }

        return decodedToken; // Retournez les informations de l'utilisateur
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.warn('No access token found in localStorage');
      return null;
    }
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('access_token'); // Supprimez le token
    localStorage.removeItem('userName'); // Supprimez le nom d'utilisateur
    localStorage.removeItem('userRole'); // Supprimez le rôle
    this.router.navigate(['/login']); // Redirigez l'utilisateur vers la page de connexion
  }
}
