import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { User } from '../../../models/user.type';
import { UserService } from '../../../services/user.service'; // Utilisez UserService
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AddStudentComponent } from '../add-student/add-student.component';
import { PopupComponent } from '../../../common/popup/popup.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    NgxSpinnerModule,
    MatSortModule,
    AddStudentComponent,
    PopupComponent,
    MatSortModule,
  ],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userRole: any = localStorage.getItem('userRole');
  showPopup = false;
  students: User[] = [];
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['fullName', 'email', 'phone']; // Ajoutez cette ligne

  constructor(
    private router: Router,
    private userService: UserService, // Utilisez UserService
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadStudents(); // Charger les students au démarrage
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Charger tous les students
  loadStudents(): void {
    this.spinner.show(); // Afficher un spinner pendant le chargement
    this.userService.findStudents().subscribe(
      (data) => {
        this.students = data;
        this.dataSource.data = this.students;
        this.spinner.hide(); // Masquer le spinner
      },
      (error) => {
        console.error('Erreur lors du chargement des students', error);
        this.spinner.hide(); // Masquer le spinner en cas d'erreur
      }
    );
  }

  // Afficher ou masquer le popup
  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  openPopup() {
    this.showPopup = true;
  }

  // Fermer le popup
  closePopup() {
    this.showPopup = false;
  }

  // Ajouter un nouveau student
  addStudent(newStudent: User): void {
    this.userService.createUser(newStudent).subscribe({
      next: (student) => {
        this.students.push(student);
        this.dataSource.data = this.students;
        this.closePopup();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du student:", error);
      },
    });
  }
}
