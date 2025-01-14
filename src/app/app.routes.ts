import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ClassroomComponent } from './components/ManageClassrooms/classroom/classroom.component';
import { BodyComponent } from './common/body/body.component';
import { AuthGuard } from './services/auth-gard.service';

export const routes: Routes = [
  // Route par défaut : redirige vers la page de connexion
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Route de connexion
  {
    path: 'login',
    component: LoginComponent,
  },

  // Routes pour les admins
  {
    path: 'admin',
    component: BodyComponent, // Contient les routes enfants pour l'admin
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'admin' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'classroom', component: ClassroomComponent },
    ],
  },

  // Routes pour les clubs
  {
    path: 'club',
    component: BodyComponent,
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'club' }, // Rôle attendu pour accéder à ces routes
    children: [{ path: '', redirectTo: 'home', pathMatch: 'full' }],
  },

  // Routes pour les étudiants
  {
    path: 'student',
    component: BodyComponent,
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'student' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
    ],
  },
  // Routes pour les membres
  {
    path: 'membre',
    component: BodyComponent,
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'membre' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
];
