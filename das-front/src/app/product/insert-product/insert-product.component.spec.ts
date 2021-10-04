import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';


import { InsertProductComponent } from './insert-product.component';


describe('InsertProductComponent', () => {
  let component: InsertProductComponent;
  let fixture: ComponentFixture<InsertProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      {
      declarations: [ InsertProductComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
