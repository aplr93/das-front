import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditCustomerComponent } from './edit-customer.component';

describe('EditCustomerComponent', () => {
  let component: EditCustomerComponent;
  let fixture: ComponentFixture<EditCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
