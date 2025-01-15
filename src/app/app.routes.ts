import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ClassroomComponent } from './components/ManageClassrooms/classroom/classroom.component';
import { BodyComponent } from './common/body/body.component';
import { AuthGuard } from './services/auth-gard.service';
import { ClubComponent } from './components/ManageClub/club/club.component';
import { ClubProfileComponent } from './components/ManageClub/club-profile/club-profile.component';
import { ProfileComponent } from './components/ManageClub/profile/profile.component';
import { StudentComponent } from './components/ManageStudents/student/student.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RequestEventComponent } from './components/request-event/request-event.component';
import { DashboardClubComponent } from './components/dashboard-club/dashboard-club.component';
import { RequestClassroomComponent } from './components/request-classroom/request-classroom.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'classroom', component: ClassroomComponent },
      { path: 'student', component: StudentComponent },
      { path: 'RequestEvent', component: RequestEventComponent },
      { path: 'RequestClassroom', component: RequestClassroomComponent },
      { path: 'club/:clubId', component: ClubProfileComponent },
    ],
  },

  // Routes pour les clubs
  {
    path: 'club',
    component: BodyComponent,
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'club' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'dashboardClub', component: DashboardClubComponent },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'RequestEvent', component: RequestEventComponent },
      { path: 'RequestClassroom', component: RequestClassroomComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },

  // Routes pour les étudiants
  {
    path: 'student',
    component: BodyComponent,
    canActivate: [AuthGuard], // Vérifie que l'utilisateur est authentifié
    data: { role: 'student' }, // Rôle attendu pour accéder à ces routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'club/:clubId', component: ClubProfileComponent },
    ],
  },

  // Route pour les chemins inconnus
  {
    path: '**',
    component: NotFoundComponent,
  },
];
