import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-event.component.html',
  styleUrls: ['./request-event.component.css'],
})
export class RequestEventComponent implements OnInit {
  // New Event
  newEvent = {
    name: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    imageUrl: '',
    description: '',
    requestStatus: 'In Progress', // Default status is 'In Progress'
  };

  // List of Events
  events: any[] = [];
  userRole: string = ''; // Role of the user (admin or club)
  showForm = false; // Control form visibility
  formClicked = false; // Control form visibility
  eventService: any;
  @ViewChild('formContainer') formContainer!: ElementRef;

  ngOnInit(): void {
    // Récupérer tous les événements du localStorage
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      this.events = JSON.parse(savedEvents);
    }

    // Vérifier le rôle de l'utilisateur (admin ou club)
    this.userRole = localStorage.getItem('userRole') || ''; // admin ou club
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  closeFormOnOutsideClick(event: MouseEvent) {
    // Vérifiez si l'événement vient de l'extérieur
    this.showForm = false;
  }

  onSubmitEvent(): void {
    if (
      !this.newEvent.name ||
      !this.newEvent.startDate ||
      !this.newEvent.startTime ||
      !this.newEvent.endDate ||
      !this.newEvent.endTime ||
      !this.newEvent.description
    ) {
      alert('Please fill in all required fields!');
      return;
    }

    // Vérifier si un événement identique existe déjà
    if (
      this.events.some(
        (event) =>
          event.name === this.newEvent.name &&
          event.startDate === this.newEvent.startDate
      )
    ) {
      alert('This event already exists!');
      return;
    }

    // Ajouter l'événement à la liste des événements
    this.events.push({ ...this.newEvent, createdBy: 'club' });
    this.saveEvents();
    this.resetForm();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newEvent.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveEvents(): void {
    // Sauvegarder tous les événements dans le localStorage
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  resetForm(): void {
    // Reset the form values after submission
    this.newEvent = {
      name: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      imageUrl: '',
      description: '',
      requestStatus: 'In Progress',
    };
    this.showForm = false;
  }

  changeRequestStatus(event: any, newStatus: string): void {
    // Modifier le statut de l'événement
    event.requestStatus = newStatus;

    // Sauvegarder les événements après modification
    this.saveEvents();

    // Optionnellement, envoyer la mise à jour au backend (si vous avez une API)
    this.eventService.updateEventStatus(event._id, newStatus).subscribe(
      (response: any) => {
        console.log('Event status updated:', response);
        // Vous pouvez afficher un message de succès ou de confirmation ici
      },
      (error: any) => {
        console.error('Error updating event status:', error);
        // Gérez l'erreur de manière appropriée (par exemple, afficher un message d'erreur)
      }
    );
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.showForm && this.formContainer && this.formContainer.nativeElement && !this.formContainer.nativeElement.contains(event.target)) {
      this.showForm = false;
    }
  }
}
