
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditClientComponent } from './edit-client.component';

describe('EditClientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    await TestBed.configureTestingModule({
      declarations: [ EditClientComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule, HttpClientTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
