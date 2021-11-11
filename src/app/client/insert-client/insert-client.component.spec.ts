import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InsertClientComponent } from './insert-client.component';

describe('InsertClientComponent', () => {
  let component: InsertClientComponent;
  let fixture: ComponentFixture<InsertClientComponent>;

  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    await TestBed.configureTestingModule({
      declarations: [ InsertClientComponent ],
      imports: [RouterTestingModule.withRoutes([]), FormsModule, HttpClientTestingModule],
      // providers: [{provide: HttpClient, useValue: spy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
