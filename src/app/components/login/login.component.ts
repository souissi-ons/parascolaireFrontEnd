import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import pour ngModel
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  loginForm!: FormGroup;
  loginError: boolean = false;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  authService = inject(AuthService);

  onSubmit() {
    this.spinner.show();
    setTimeout(() => {
      if (this.loginForm.valid) {
        console.log('clicked button', this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe({
          next: (response: any) => {
            this.loginError = false;
            console.log('Login response', response);

            // Vérifier que le token est présent
            if (!response.access_token) {
              console.error('No access token in response');
              return; // Retourne ici pour éviter d'exécuter le reste du code
            }

            // Décoder le token
            try {
              const decodedToken: any = jwtDecode(response.access_token);
              console.log('Decoded Token:', decodedToken);

              // Vérifier que le rôle est présent
              if (!decodedToken.role) {
                console.error('No role in decoded token');
                return; // Retourne ici pour éviter d'exécuter le reste du code
              }
              localStorage.setItem('access-token', response.access_token);
              // Stocker le rôle dans le localStorage
              const userRole = decodedToken.role;
              console.log('User role to store:', userRole);
              localStorage.setItem('userRole', userRole);

              const userName = decodedToken.username;
              console.log('User role to store:', userName);
              localStorage.setItem('userName', userName);

              console.log(
                'User role stored in localStorage:',
                localStorage.getItem('userRole')
              );

              // Rediriger vers la page d'accueil (sans return)
              this.router.navigate(['/home']);
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          },
          error: (error: any) => {
            this.loginError = true;
            console.log('Login error', error);
          },
          complete: () => {
            console.log('Login request completed');
          },
        });
      } else {
        this.loginError = true;
      }
      this.spinner.hide();
    }, 300); // Simuler un délai pour la démonstration
  }
}
