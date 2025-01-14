import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PopupComponent } from '../../../common/popup/popup.component';
import { AddClassroomComponent } from '../add-classroom/add-classroom.component';
import { ClassroomService } from '../../../services/classroom.service';
import { Classroom } from '../../../models/classroom.type';
import { EditClassroomComponent } from '../edit-classroom/edit-classroom.component';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    PopupComponent,
    AddClassroomComponent,
    EditClassroomComponent,
  ],
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['num', 'capacity', 'available'];
  dataSource = new MatTableDataSource<Classroom>([]);
  listClassroom: Classroom[] = [];
  showPopup: boolean = false;
  selectedClassroom: Classroom | null = null;
  showEditPopup: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private classroomService: ClassroomService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms(): void {
    this.spinner.show(); // Afficher le spinner pendant le chargement
    this.classroomService.getAllClassrooms().subscribe({
      next: (classrooms) => {
        this.listClassroom = classrooms;
        this.dataSource.data = this.listClassroom;
        this.spinner.hide(); // Cacher le spinner une fois les données chargées
      },
      error: (error) => {
        console.error('Erreur lors du chargement des salles de classe:', error);
        this.spinner.hide(); // Cacher le spinner en cas d'erreur
      },
    });
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  addClassroom(newClassroom: Classroom): void {
    this.classroomService.createClassroom(newClassroom).subscribe({
      next: (classroom) => {
        this.listClassroom.push(classroom);
        this.dataSource.data = this.listClassroom;
        this.closePopup();
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de la salle de classe:", error);
      },
    });
  }

  openEditPopup(classroom: Classroom): void {
    this.selectedClassroom = classroom;
    this.showEditPopup = true;
  }

  closeEditPopup(): void {
    this.showEditPopup = false;
    this.selectedClassroom = null;
  }

  updateClassroom(updatedClassroom: Classroom): void {
    this.classroomService
      .updateClassroom(updatedClassroom._id || '', updatedClassroom)
      .subscribe({
        next: (classroom) => {
          const index = this.listClassroom.findIndex(
            (c) => c.num === classroom.num
          );
          if (index !== -1) {
            this.listClassroom[index] = classroom;
            this.dataSource.data = this.listClassroom;
          }
          this.closeEditPopup();
        },
        error: (error) => {
          console.error(
            'Erreur lors de la mise à jour de la salle de classe:',
            error
          );
        },
      });
  }
}
