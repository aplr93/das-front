import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';


import { InsertOrderComponent } from './insert-order.component';


describe('InsertOrderComponent', () => {
  let component: InsertOrderComponent;
  let fixture: ComponentFixture<InsertOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      {
      declarations: [ InsertOrderComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
