import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClubComponent } from './dashboard-club.component';

describe('DashboardClubComponent', () => {
  let component: DashboardClubComponent;
  let fixture: ComponentFixture<DashboardClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardClubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
