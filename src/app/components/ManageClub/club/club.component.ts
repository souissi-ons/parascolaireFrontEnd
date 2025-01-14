import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { PopupComponent } from '../../../common/popup/popup.component';
import { AddClubComponent } from '../add-club/add-club.component';
import { User } from '../../../models/user.type';
import { UserService } from '../../../services/user.service'; // Utilisez UserService
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [NgxSpinnerModule, CommonModule, PopupComponent, AddClubComponent],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  userRole: any = localStorage.getItem('userRole');
  showPopup = false;
  clubs: User[] = [];
  clubImages: { [key: string]: SafeUrl } = {}; // Utilisez une clé de type string pour l'ID MongoDB

  constructor(
    private router: Router,
    private userService: UserService, // Utilisez UserService
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadClubs(); // Charger les clubs au démarrage
  }

  // Charger tous les clubs
  loadClubs(): void {
    this.spinner.show(); // Afficher un spinner pendant le chargement
    this.userService.findClubs().subscribe(
      (data) => {
        this.clubs = data;
        this.clubs.forEach((club) => {
          this.loadClubImage(club._id); // Utilisez _id au lieu de id
        });
        this.spinner.hide(); // Masquer le spinner
      },
      (error) => {
        console.error('Erreur lors du chargement des clubs', error);
        this.spinner.hide(); // Masquer le spinner en cas d'erreur
      }
    );
  }

  // Charger l'image d'un club
  loadClubImage(clubId: string): void {
    this.userService.getClubImage(clubId).subscribe(
      (imageBlob: Blob) => {
        if (imageBlob.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(imageBlob);
          this.clubImages[clubId] =
            this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        } else {
          console.warn("Le Blob reçu n'est pas une image :", imageBlob);
          this.clubImages[clubId] =
            this.sanitizer.bypassSecurityTrustUrl('/club.avif');
        }
      },
      (error) => {
        console.error("Erreur lors du chargement de l'image du club", error);
        this.clubImages[clubId] =
          this.sanitizer.bypassSecurityTrustUrl('/club.avif');
      }
    );
  }

  // Afficher ou masquer le popup
  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  // Fermer le popup
  closePopup() {
    this.showPopup = false;
  }

  // Ajouter un nouveau club
  addClub(newClub: User): void {
    this.userService.createUser(newClub).subscribe({
      next: (club) => {
        this.closePopup();
        this.clubs.push(club);
        this.loadClubImage(club._id); // Charger l'image du nouveau club
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du club:", error);
      },
    });
  }

  // Naviguer vers le profil d'un club
  navigateToClubProfile(clubId: string) {
    this.router.navigate([`/${this.userRole}/club/${clubId}`]);
  }
}
