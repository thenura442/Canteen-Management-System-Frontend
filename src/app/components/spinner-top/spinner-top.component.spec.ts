import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerTopComponent } from './spinner-top.component';

describe('SpinnerTopComponent', () => {
  let component: SpinnerTopComponent;
  let fixture: ComponentFixture<SpinnerTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
