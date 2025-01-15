import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Classroom } from '../../models/classroom.type';
import { EventService } from '../../services/event.service';
import { ClassroomService } from '../../services/classroom.service';
import { EventReq } from '../../models/requestEvent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-event.component.html',
  styleUrls: ['./request-event.component.css'],
})
export class RequestEventComponent implements OnInit {
  eventForm: FormGroup; // Formulaire réactif
  showForm: boolean = false; // Contrôle l'affichage du formulaire
  userRole: any = localStorage.getItem('userRole'); // Rôle de l'utilisateur (à définir dynamiquement)
  events: EventReq[] = []; // Liste des événements
  userEvents: EventReq[] = []; // Liste des événements
  classrooms: Classroom[] = []; // Liste des salles de classe

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private classroomService: ClassroomService // Injecter le service ClassroomService
  ) {
    // Initialisation du formulaire
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
      classroomId: ['', Validators.required], // Ajouter un contrôle pour la salle de classe
      imageUrl: [''], // Optionnel
    });
  }

  ngOnInit(): void {
    this.loadEvents(); // Charger les événements
    this.loadClassrooms(); // Charger les salles de classe
    this.loadUserEvents();
  }

  // Charger les événements
  loadEvents(): void {
    this.eventService.findAllRequest().subscribe({
      next: (data: any) => {
        this.events = data;
      },
      error: (err: Error) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  loadUserEvents(): void {
    const userId = localStorage.getItem('id');
    this.eventService.findAllUserRequest(userId || '').subscribe({
      next: (data: any) => {
        this.userEvents = data;
      },
      error: (err: Error) => {
        console.error('Error fetching events:', err);
      },
    });
  }

  // Charger les salles de classe
  loadClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe({
      next: (data: any) => {
        this.classrooms = data; // Mettre à jour la liste des salles de classe
      },
      error: (err: Error) => {
        console.error('Error fetching classrooms:', err);
      },
    });
  }

  // Afficher ou masquer le formulaire
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Fermer le formulaire en cliquant à l'extérieur
  closeFormOnOutsideClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showForm = false;
    }
  }

  // Gérer la soumission du formulaire
  onSubmitEvent(): void {
    if (this.eventForm.invalid) {
      console.log('Please fill in all required fields!');
      return;
    }

    // Combiner la date et l'heure de début et de fin
    const startDateTime = new Date(
      `${this.eventForm.value.startDate}T${this.eventForm.value.startTime}`
    );
    const endDateTime = new Date(
      `${this.eventForm.value.endDate}T${this.eventForm.value.endTime}`
    );

    // Créer un nouvel événement
    const newEvent: EventReq = {
      ...this.eventForm.value,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      roomId: this.eventForm.value.classroomId, // Utiliser l'ID de la salle de classe sélectionnée
      organizerId: localStorage.getItem('id') || '', // ID de l'organisateur
      requestStatus: 'pending', // Statut par défaut
      private: false, // Par défaut, l'événement n'est pas privé
    };

    // Appeler le service pour créer l'événement
    this.eventService.createRequestEvent(newEvent).subscribe({
      next: (response: any) => {
        console.log('Event created successfully:', response);
        this.loadUserEvents(); // Recharger la liste des événements
        this.showForm = false; // Masquer le formulaire
        this.eventForm.reset(); // Réinitialiser le formulaire
      },
      error: (err: Error) => {
        console.error('Error creating event:', err);
      },
    });
  }

  // Gérer le changement de fichier (image)
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Vous pouvez traiter le fichier ici (par exemple, l'uploader et récupérer l'URL)
    }
  }

  // Accepter une demande d'événement
  changeRequestStatus(event: EventReq, status: 'confirmed' | 'refused'): void {
    if (status === 'confirmed') {
      this.eventService.acceptEvent(event._id!).subscribe({
        next: (updatedEvent: EventReq) => {
          console.log('Event accepted:', updatedEvent);
          this.loadEvents(); // Recharger la liste des événements
        },
        error: (err: Error) => {
          console.error('Error accepting event:', err);
        },
      });
    } else if (status === 'refused') {
      this.eventService.rejectEvent(event._id!).subscribe({
        next: (updatedEvent: EventReq) => {
          console.log('Event rejected:', updatedEvent);
          this.loadEvents(); // Recharger la liste des événements
        },
        error: (err: Error) => {
          console.error('Error rejecting event:', err);
        },
      });
    }
  }
}
