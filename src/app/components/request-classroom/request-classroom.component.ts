import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RequestClassroomService } from '../../services/request-classroom.service';
import {
  Classroom,
  CreateRequestClassroomDto,
  UpdateRequestClassroomDto,
} from '../../models/classroom.type';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-request-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './request-classroom.component.html',
  styleUrls: ['./request-classroom.component.css'],
})
export class RequestClassroomComponent implements OnInit {
  // New request object
  newRequest: CreateRequestClassroomDto = {
    startDateTime: new Date(),
    endDateTime: new Date(),
    roomId: '',
    requestedBy: '',
    reason: '',
    status: 'pending',
  };

  // List of available classrooms
  classrooms: Classroom[] = [];

  // List of requests
  requests: any[] = [];
  userRole: string = ''; // User role (admin or club)
  showForm = false; // Controls form visibility
  formContainer: ElementRef | undefined;

  constructor(
    private requestClassroomService: RequestClassroomService,
    private classroomService: ClassroomService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || '';
    if (this.userRole === 'club') {
      this.loadMyRequestClassrooms();
    } else {
      this.loadRequestClassrooms();
    }
    this.loadClassrooms();
  }

  // Load all request classrooms
  loadRequestClassrooms(): void {
    this.requestClassroomService.getAllRequestClassrooms().subscribe(
      (data) => {
        this.requests = data;
      },
      (error) => {
        console.error('Error loading request classrooms', error);
      }
    );
  }
  loadMyRequestClassrooms(): void {
    this.requestClassroomService
      .getMyRequestClassrooms(localStorage.getItem('id') || '')
      .subscribe(
        (data) => {
          this.requests = data;
        },
        (error) => {
          console.error('Error loading request classrooms', error);
        }
      );
  }
  // Toggle form visibility
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Close form when clicking outside
  closeFormOnOutsideClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showForm = false;
    }
  }

  loadClassrooms(): void {
    this.classroomService.getAllClassrooms().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des salles de classe:', error);
      },
    });
  }
  onSubmitRequest(): void {
    if (
      !this.newRequest.roomId ||
      !this.newRequest.reason ||
      !this.newRequest.startDateTime ||
      !this.newRequest.endDateTime
    ) {
      alert('Please fill all required fields!');
      return;
    }
    this.newRequest.requestedBy = localStorage.getItem('id') || '';
    this.requestClassroomService
      .createRequestClassroom(this.newRequest)
      .subscribe(
        (response) => {
          console.log('Request created successfully', response);
          this.loadRequestClassrooms(); // Refresh the list
          this.resetForm(); // Reset the form
        },
        (error) => {
          console.error('Error creating request', error);
        }
      );
  }

  // Reset form after submission
  resetForm(): void {
    this.newRequest = {
      startDateTime: new Date(),
      endDateTime: new Date(),
      roomId: '',
      requestedBy: '',
      reason: '',
      status: 'pending',
    };
    this.showForm = false;
  }

  // Change request status (admin only)
  changeRequestStatus(request: any, newStatus: string): void {
    const updateRequest: UpdateRequestClassroomDto = {
      status: newStatus,
    };

    this.requestClassroomService
      .updateRequestClassroom(request._id, updateRequest)
      .subscribe(
        (response) => {
          console.log('Request status updated successfully', response);
          this.loadRequestClassrooms(); // Refresh the list
        },
        (error) => {
          console.error('Error updating request status', error);
        }
      );
  }

  // Delete a request (admin only)
  deleteRequest(requestId: string): void {
    this.requestClassroomService.deleteRequestClassroom(requestId).subscribe(
      (response) => {
        console.log('Request deleted successfully', response);
        this.loadRequestClassrooms(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting request', error);
      }
    );
  }

  // Handle clicks outside the form
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (
      this.showForm &&
      this.formContainer &&
      this.formContainer.nativeElement &&
      !this.formContainer.nativeElement.contains(event.target)
    ) {
      this.showForm = false;
    }
  }
}
