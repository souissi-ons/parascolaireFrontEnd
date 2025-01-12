import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    console.log(user);
  }
  authService = inject(AuthService);
}
