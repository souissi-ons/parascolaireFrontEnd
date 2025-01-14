import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner'; // Optionnel : pour le spinner
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-club',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css'],
})
export class AddClubComponent {
  @Output() userAdded = new EventEmitter<any>();

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService, // Injecter le service
    private spinner: NgxSpinnerService // Optionnel : pour le spinner
  ) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['club'], // Valeur par défaut pour le rôle
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires correctement.');
      return;
    }
    this.userAdded.emit(this.userForm.value);
    console.log(this.userForm.value);
    this.userForm.reset();
  }
}
