import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestClassroomComponent } from './request-classroom.component';

describe('RequestClassroomComponent', () => {
  let component: RequestClassroomComponent;
  let fixture: ComponentFixture<RequestClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestClassroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
