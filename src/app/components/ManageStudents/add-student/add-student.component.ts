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
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  @Output()
  userAdded = new EventEmitter<any>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['student'], // Valeur par défaut pour le rôle
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
