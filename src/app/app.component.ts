import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './components/ManageClassrooms/classroom/classroom.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { BodyComponent } from './common/body/body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    ClassroomComponent,
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    BodyComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'parascolaire';
}
