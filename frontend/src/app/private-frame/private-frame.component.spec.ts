import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateFrameComponent } from './private-frame.component';

describe('PrivateFrameComponent', () => {
  let component: PrivateFrameComponent;
  let fixture: ComponentFixture<PrivateFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
