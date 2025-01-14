import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service'; // Utilisation de UserService
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-club-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './club-profile.component.html',
  styleUrl: './club-profile.component.css',
})
export class ClubProfileComponent implements OnInit {
  clubForm: FormGroup;
  userRole: string = '';
  club: any = {};
  clubImage!: SafeUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService, // Utilisation de UserService
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.clubForm = this.fb.group({
      fullName: [''],
      phone: [''],
      email: [''],
      facebook: [''],
      instagram: [''],
      linkedin: [''],
      domaine: [''],
      profileImage: [''],
    });
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || 'membre';

    this.route.params.subscribe((params) => {
      const clubId = params['clubId']; // L'ID est une chaîne dans MongoDB
      this.loadClubProfile(clubId);
    });
  }

  loadClubProfile(clubId: string): void {
    this.userService.findOneUser(clubId).subscribe(
      (club) => {
        this.club = club;
        this.clubForm.patchValue({
          fullName: club.fullName || '',
          phone: club.phone || '',
          email: club.email || '',
          facebook: club.facebook || '',
          instagram: club.instagram || '',
          linkedin: club.linkedin || '',
          domaine: club.domaine || '',
        });
        this.loadClubImage(club._id); // Utilisation de _id au lieu de userId
      },
      (error) => {
        console.error('Erreur lors du chargement du profil du club', error);
      }
    );
  }

  loadClubImage(clubId: string): void {
    this.userService.getClubImage(clubId).subscribe(
      (imageBlob: Blob) => {
        if (imageBlob.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(imageBlob);
          this.clubImage = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
        } else {
          this.clubImage = this.sanitizer.bypassSecurityTrustUrl('/club.avif');
        }
      },
      (error) => {
        console.error("Erreur lors du chargement de l'image du club", error);
        this.clubImage = this.sanitizer.bypassSecurityTrustUrl('/club.avif');
      }
    );
  }

  onReturnClick(): void {
    this.router.navigate([`/${this.userRole}/club`]);
  }

  onSaveChanges(): void {
    if (this.clubForm.valid) {
      const updatedClub = {
        ...this.club,
        fullName: this.clubForm.value.fullName,
        phone: this.clubForm.value.phone,
        email: this.clubForm.value.email,
        facebook: this.clubForm.value.facebook,
        instagram: this.clubForm.value.instagram,
        linkedin: this.clubForm.value.linkedin,
        domaine: this.clubForm.value.domaine,
      };

      this.userService.updateUser(this.club._id, updatedClub).subscribe(
        (response) => {
          console.log('Profil club mis à jour avec succès', response);
          this.activateTab('profile-overview');
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du profil club', error);
        }
      );
    }
  }

  activateTab(tabId: string): void {
    // Implémentez la logique pour activer l'onglet spécifié
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    const clubId = this.route.snapshot.params['clubId'];

    this.userService.uploadClubImage(clubId, formData).subscribe(
      (response) => {
        console.log('Image uploadée avec succès', response);
        this.loadClubImage(this.club._id);
      },
      (error) => {
        console.error("Erreur lors de l'upload de l'image", error);
      }
    );
  }
}
