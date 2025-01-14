import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SidebarComponent implements OnInit {
  userRole: string = '';

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'membre';
  }
}
