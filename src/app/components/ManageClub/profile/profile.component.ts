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
import { UserService } from '../../../services/user.service';

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

// Définir une interface pour les étudiants
interface Student {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  selected: boolean; // Ajouter cette propriété
}

@Component({
  selector: 'app-club-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  clubId: any = localStorage.getItem('id');
  isModalOpen: boolean = false; // Contrôle l'état de la modale

  // Données de l'utilisateur (club) récupérées dynamiquement
  user: any = {};

  // Liste dynamique des étudiants non membres
  nonMembers: Student[] = [];

  // Liste dynamique des étudiants ajoutés au club
  addedStudents: Student[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUser(); // Charger les données de l'utilisateur (club)
    this.loadMembers(); // Charger les membres du club
    this.loadNonMembers(); // Charger les étudiants non membres
  }

  // Charger les données de l'utilisateur (club) depuis le backend
  loadUser() {
    this.userService.findOneUser(this.clubId).subscribe(
      (user: any) => {
        this.user = user; // Remplir les données de l'utilisateur
      },
      (error) => {
        console.error('Error loading user:', error);
      }
    );
  }

  // Charger les membres du club depuis le backend
  loadMembers() {
    this.userService.getMembers(this.clubId).subscribe(
      (members: any[]) => {
        this.addedStudents = members.map((member) => ({
          _id: member._id,
          fullName: member.fullName,
          phone: member.phone,
          email: member.email,
          role: member.role,
          selected: false, // Ajouter cette propriété
        }));
      },
      (error) => {
        console.error('Error loading members:', error);
      }
    );
  }

  // Charger les étudiants non membres depuis le backend
  loadNonMembers() {
    this.userService.getNonMembers(this.clubId).subscribe(
      (nonMembers: any[]) => {
        this.nonMembers = nonMembers.map((student) => ({
          _id: student._id,
          fullName: student.fullName,
          phone: student.phone,
          email: student.email,
          role: student.role,
          selected: false, // Ajouter cette propriété
        }));
      },
      (error) => {
        console.error('Error loading non-members:', error);
      }
    );
  }

  // Retourner à la page précédente
  onReturnClick(): void {
    this.router.navigate(['club']);
  }

  // Sauvegarder les modifications du profil
  onSaveChanges() {
    this.userService.updateUser(this.clubId, this.user).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.activateTab('profile-overview');
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  // Gérer le changement de fichier (image de profil)
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

  // Activer un onglet (non implémenté)
  activateTab(tabId: string) {}

  // Changer le rôle d'un membre
  changeRole(student: Student, newRole: string) {
    this.userService
      .updateMemberRole(this.clubId, student._id, newRole)
      .subscribe(
        (response) => {
          console.log('Role updated successfully:', response);
          student.role = newRole; // Mettre à jour le rôle localement
        },
        (error) => {
          console.error('Error updating role:', error);
        }
      );
  }

  // Ouvrir la modale pour ajouter des membres
  openModal() {
    this.isModalOpen = true;
  }

  // Fermer la modale
  closeModal() {
    this.isModalOpen = false;
  }

  // Gérer la sélection d'un étudiant
  toggleSelection(student: Student) {
    student.selected = !student.selected;
  }

  // Ajouter les étudiants sélectionnés au club
  addSelectedStudents() {
    const selectedStudents = this.nonMembers.filter((s) => s.selected);

    selectedStudents.forEach((student) => {
      this.userService.addMember(this.clubId, student._id, 'member').subscribe(
        (response) => {
          console.log('Member added successfully:', response);
          this.loadMembers(); // Recharger la liste des membres
          this.loadNonMembers(); // Recharger la liste des non-membres
        },
        (error) => {
          console.error('Error adding member:', error);
        }
      );
    });

    this.nonMembers.forEach((s) => (s.selected = false)); // Réinitialiser les sélections
    this.closeModal();
  }

  // Supprimer un membre du club
  removeMember(studentId: string) {
    this.userService.removeMember(this.clubId, studentId).subscribe(
      (response) => {
        console.log('Member removed successfully:', response);
        this.loadMembers(); // Recharger la liste des membres
        this.loadNonMembers(); // Recharger la liste des non-membres
      },
      (error) => {
        console.error('Error removing member:', error);
      }
    );
  }
}
