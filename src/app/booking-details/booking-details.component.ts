import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  booking: any; // Variable to store the booking details

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // When the component initializes, subscribe to query parameter changes
    // to retrieve the booking details passed from the previous component
    this.route.queryParams.subscribe(params => {
      const bookingParam = params['booking']; // Retrieve the booking parameter
  
      // If the booking parameter is defined and not empty
      if (bookingParam) {
        this.booking = JSON.parse(bookingParam); // Parse the JSON string to an object
      } else {
        // Handle the case where the booking parameter is not provided
        console.error('Booking details not provided.');
      }
    });
  }

  // Function to calculate the duration between the start and end dates in days
  calculateDuration(startDate: string, endDate: string): number {
    const start = new Date(startDate); // Convert the start date string to a Date object
    const end = new Date(endDate); // Convert the end date string to a Date object
    const duration = Math.abs(end.getTime() - start.getTime()); // Calculate the duration in milliseconds
    const days = Math.ceil(duration / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round up
    return days; // Return the duration in days
  }

  // Function to navigate back to the week view when the back button is clicked
  goBack(): void {
    this.router.navigate(['/week-view']); // Navigate to the week view component
  }
}
