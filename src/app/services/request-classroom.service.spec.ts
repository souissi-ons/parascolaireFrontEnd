import { TestBed } from '@angular/core/testing';
import { RequestClassroomService } from './request-classroom.service';

describe('RequestClassroomService', () => {
  let service: RequestClassroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestClassroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
