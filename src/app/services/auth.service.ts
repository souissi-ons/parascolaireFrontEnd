import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/auth/';

  login(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', {
      email: user.email,
      password: user.password,
    });
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token'); // Get the token from localStorage

    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        return decodedToken; // Return the decoded token (contains user info)
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.warn('No access token found in localStorage');
      return null;
    }
  }
}
