import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);
@Component({
  selector: 'app-club-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  isModalOpen: boolean | undefined;
  constructor(private router: Router, private route: ActivatedRoute) {}
  onReturnClick(): void {
    this.router.navigate(['club']);
  }
  user = {
    name: 'Kevin Anderson',
    role: 'UI Designer',
    about: 'A passionate UI designer.',
    phone: '123456789',
    email: 'kevin@example.com',
    facebook: 'kevin_fb',
    instagram: 'kevin_insta',
    linkedin: 'kevin_linkedin',
    creationDate: '2022/06/01',
    imageUrl: '',
  };

  onSaveChanges() {
    this.activateTab('profile-overview');
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.imageUrl = e.target.result; // Enregistre l'image en base64
      };
      reader.readAsDataURL(file);
    }
  }

  activateTab(tabId: string) {}
 
  changeRole(student: any, newRole: string) {
    student.role = newRole;
  }
  // Liste statique des étudiants
  students = [
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    {
      Firstname: 'Alice ',
      Lastname: 'Smith',
      phone: '123456789',
      email: 'alice@example.com',
     Birthday: '2005/02/11',
    role:'Admin',
      selected: false,
    },
    
  ];

  // Liste dynamique des étudiants ajoutés
  addedStudents: {
    Firstname: string;
    Lastname: string;
    phone: string;
   Birthday: string;  
    email: string;
    role:string
  }[] = [];

  // Ouvrir la modale
  openModal() {
    this.isModalOpen = true;
  }

  // Fermer la modale
  closeModal() {
    this.isModalOpen = false;
  }
  // Gérer la sélection d’un étudiant
  toggleSelection(student: any) {
    student.selected = !student.selected;
  }

  // Ajouter les étudiants sélectionnés
  addSelectedStudents() {
    const selectedStudents = this.students.filter((s) => s.selected);
    this.addedStudents.push(...selectedStudents);
    this.students.forEach((s) => (s.selected = false)); // Réinitialiser les sélections
    this.closeModal();
  }
}
