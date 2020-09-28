import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicFrameComponent } from './public-frame.component';

describe('PublicFrameComponent', () => {
  let component: PublicFrameComponent;
  let fixture: ComponentFixture<PublicFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
