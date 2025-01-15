import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from '../../services/event.service';
import { EventReq } from '../../models/requestEvent';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userRole: string = ''; // Le rôle de l'utilisateur (admin, club, student, membre)
  @ViewChild('formContainer') formContainer!: ElementRef;

  // Nouveau événement
  newEvent = {
    nom: '',
    dateDebut: '',
    heureDebut: '',
    dateFin: '',
    heureFin: '',
    imageUrl: '',
    clubOrganisateur: '',
    customOrganisateur: '',
    description: '',
    createdAt: '',
  };

  // Liste des événements
  events: EventReq[] = [];

  // Variables pour contrôler l'état du formulaire
  showForm = false;
  isOtherSelected = false;

  // Favoris
  favorites: { [key: number]: boolean } = {};

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private eventService: EventService // Inject the event service
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'membre';
    const userId = localStorage.getItem('id'); // Assurez-vous que l'ID de l'utilisateur est stocké
    if (userId) {
      this.loadEvents(userId);
    }
  }

  // Charger les événements en fonction de l'utilisateur
  loadEvents(userId: string): void {
    this.spinner.show();
    this.eventService.findEvents(userId).subscribe({
      next: (events: any[]) => {
        this.events = events;
        this.sortEvents();
        this.spinner.hide();
      },
      error: (error: any) => {
        console.error('Error fetching events:', error);
        this.spinner.hide();
      },
    });
  }

  // Trier les événements par date de création
  sortEvents(): void {
    this.events.sort((a, b) => {
      return (
        new Date(b.createdAt || new Date()).getTime() -
        new Date(a.createdAt || new Date()).getTime()
      );
    });
  }

  // Afficher/masquer le formulaire
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Gérer la sélection d'un organisateur
  checkIfOtherSelected(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isOtherSelected = selectedValue === 'Autre';
    if (this.isOtherSelected) {
      this.newEvent.customOrganisateur = '';
    }
  }
}
