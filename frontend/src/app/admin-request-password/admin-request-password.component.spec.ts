import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestPasswordComponent } from './admin-request-password.component';

describe('AdminRequestPasswordComponent', () => {
  let component: AdminRequestPasswordComponent;
  let fixture: ComponentFixture<AdminRequestPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRequestPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
