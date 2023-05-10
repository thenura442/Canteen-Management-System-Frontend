import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrdersComponent } from './no-orders.component';

describe('NoOrdersComponent', () => {
  let component: NoOrdersComponent;
  let fixture: ComponentFixture<NoOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
