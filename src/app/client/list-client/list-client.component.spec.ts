import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientComponent } from './list-client.component';

describe('ListClientComponent', () => {
  let component: ListClientComponent;
  let fixture: ComponentFixture<ListClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
