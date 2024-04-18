import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap  } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookingDetailsComponent } from './booking-details.component';
import { of } from 'rxjs'; // Import 'of' from 'rxjs' for mock data
describe('BookingDetailsComponent', () => {
  let component: BookingDetailsComponent;
  let fixture: ComponentFixture<BookingDetailsComponent>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = {
      queryParams: of({ booking: JSON.stringify({  
        "id": "1",
        "pickupReturnStationId": "1",
        "customerName": "Keara Adams",
        "startDate": "2021-03-13T22:04:19.032Z",
        "endDate": "2021-07-17T08:51:27.402Z" 
      }) })
    } as unknown as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [BookingDetailsComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});