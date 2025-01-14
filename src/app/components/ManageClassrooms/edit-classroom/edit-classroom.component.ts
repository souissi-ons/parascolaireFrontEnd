import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Classroom } from '../../../models/classroom.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.css'],
})
export class EditClassroomComponent implements OnInit {
  @Input() classroom!: Classroom;
  @Output() classroomUpdated = new EventEmitter<Classroom>();
  @Output() close = new EventEmitter<void>();

  classroomForm!: FormGroup;
  initialFormValue: any; // Stocke la valeur initiale du formulaire pour vérifier les changements

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.classroomForm = this.fb.group({
      num: [this.classroom.num, Validators.required],
      capacity: [
        this.classroom.capacity,
        [Validators.required, Validators.min(1)],
      ],
      available: [this.classroom.available, Validators.required],
    });
    this.initialFormValue = this.classroomForm.value;
  }

  isFormChanged(): boolean {
    return (
      JSON.stringify(this.classroomForm.value) !==
      JSON.stringify(this.initialFormValue)
    );
  }

  onSubmit(): void {
    if (this.classroomForm.valid) {
      const updatedClassroom: Classroom = {
        ...this.classroom,
        ...this.classroomForm.value,
      };
      this.classroomUpdated.emit(updatedClassroom);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
