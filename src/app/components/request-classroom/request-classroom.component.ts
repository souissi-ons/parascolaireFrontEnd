import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-classroom.component.html',
  styleUrls: ['./request-classroom.component.css'],
})
export class RequestClassroomComponent implements OnInit {
  // Nouvelle demande de salle
  newRequest = {
    roomNumber: '',
    purpose: '',
    startDate: '',
    endDate: '',
    requestStatus: 'In Progress', // Statut par défaut
  };

  // Liste des salles disponibles
  classrooms = [
    { roomNumber: '101', capacity: 30 },
    { roomNumber: '102', capacity: 20 },
    { roomNumber: '103', capacity: 50 },
    { roomNumber: '104', capacity: 40 },
  ];

  // Liste des demandes
  requests: any[] = [];
  userRole: string = ''; // Rôle de l'utilisateur (admin ou club)
  showForm = false; // Contrôle la visibilité du formulaire
  formContainer: ElementRef | undefined;

  ngOnInit(): void {
    // Récupérer toutes les demandes du localStorage
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      this.requests = JSON.parse(savedRequests);
    }

    // Vérifier le rôle de l'utilisateur
    this.userRole = localStorage.getItem('userRole') || ''; // admin ou club
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  closeFormOnOutsideClick(event: MouseEvent) {
    // Vérifiez si l'événement vient de l'extérieur
    this.showForm = false;
  }

  onSubmitRequest(): void {
    // Vérifications
    if (
      !this.newRequest.roomNumber ||
      !this.newRequest.purpose ||
      !this.newRequest.startDate ||
      !this.newRequest.endDate
    ) {
      alert('Veuillez remplir tous les champs obligatoires !');
      return;
    }

   
    // Ajouter la demande à la liste
    this.requests.push({ ...this.newRequest, createdBy: 'club' });
    this.saveRequests();
    this.resetForm();
  }

  saveRequests(): void {
    // Sauvegarder les demandes dans le localStorage
    localStorage.setItem('requests', JSON.stringify(this.requests));
  }

  resetForm(): void {
    // Réinitialiser le formulaire après soumission
    this.newRequest = {
      roomNumber: '',
      purpose: '',
      startDate: '',
      endDate: '',
      requestStatus: 'In Progress',
    };
    this.showForm = false;
  }

  changeRequestStatus(request: any, newStatus: string): void {
    // Modifier le statut de la demande
    request.requestStatus = newStatus;
    this.saveRequests();
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.showForm && this.formContainer && this.formContainer.nativeElement && !this.formContainer.nativeElement.contains(event.target)) {
      this.showForm = false;
    }
  }
}
