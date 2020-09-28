import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePasswordSuccessComponent } from './admin-change-password-success.component';

describe('AdminChangePasswordSuccessComponent', () => {
  let component: AdminChangePasswordSuccessComponent;
  let fixture: ComponentFixture<AdminChangePasswordSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangePasswordSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangePasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
