import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css'],
})
export class AddClassroomComponent {
  @Output() classroomAdded = new EventEmitter<any>();
  classroomForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      num: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      available: [true],
    });
  }

  onSubmitClassroom() {
    if (this.classroomForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires correctement.');
      return;
    }
    const formValue = this.classroomForm.value;
    formValue.available = formValue.available === 'true' ? true : false;
    this.classroomAdded.emit(this.classroomForm.value);
    console.log(this.classroomForm.value);
    this.classroomForm.reset();
  }
}
