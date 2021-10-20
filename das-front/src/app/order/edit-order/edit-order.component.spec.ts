import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Order } from 'src/app/shared/models/order.model';

import { EditOrderComponent } from './edit-order.component';

describe('EditOrderComponent', () => {
  let component: EditOrderComponent;
  let fixture: ComponentFixture<EditOrderComponent>;
  let order = new Order;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrderComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
