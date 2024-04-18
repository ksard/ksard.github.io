import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { StationServiceService } from '../station-service.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent {
  stations: any[] = [];
  selectedStation!: number; // Selected station ID
  weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentWeekStartDate!: Date; // Variable to store the start date of the current week
  currentWeekEndDate!: Date;
  bookingsByDay: any;

  // Constructor to inject dependencies
  constructor(private stationService: StationServiceService, private router: Router) { }

  // Lifecycle hook
  ngOnInit(): void {
    this.fetchStations(); // Fetch stations when the component initializes
    this.setCurrentWeekStartDate(); // Set the current week start date
  }

  // Fetch list of stations
  fetchStations() {
    this.stationService.getStations().subscribe(
      (data:any) => {
        this.stations = data; // Assign fetched stations to the component property
        this.selectedStation = 1; // Select the first station by default
        this.fetchBookings(); // Fetch bookings for the selected station
      },
      (error: any) => {
        console.error('Error fetching stations:', error); // Log error if stations fetching fails
      }
    );
  }

  // Set selected station ID
  setStationId(event: any) {
    this.selectedStation = event.target.value; // Set the selected station ID from the dropdown
  }

  // Fetch bookings for the selected station
  fetchBookings() {
    let bookings: any = [];
    this.fetchBookingsForStation(this.selectedStation).subscribe((res)=> {
        bookings = res; // Assigned fetched bookings to the local variable

        // Initialize bookingsByDay array
        this.bookingsByDay = Array(7).fill([]).map(() => []);

        // Group bookings by day of the week
        bookings.forEach((booking:any) => {
          const startDate = new Date(booking.startDate);
          const dayOfWeek = startDate.getDay();
            // Calculate the difference in days between the booking start date and the current week start date
            const diffDays = Math.floor((startDate.getTime() - this.currentWeekStartDate.getTime()) / (1000 * 60 * 60 * 24));
            
            // Ensuring that the booking falls within the current week
            if (diffDays >= 0 && diffDays < 7) {
                // Push the booking into the respective day array
                this.bookingsByDay[dayOfWeek].push(booking);
            }
        });
    });
  }

  // Fetch bookings for a specific station
  fetchBookingsForStation(stationId: any) {
      return this.stationService.getBookingsForStation(stationId); // Return observable to fetch bookings
  }

  // Function to navigate to the previous week
  previousWeek() {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() - 7); // Adjust current week start date to previous week
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to navigate to the next week
  nextWeek() {
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() + 7); // Adjust current week start date to next week
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to navigate to the previous month
  previousMonth() {
    this.currentWeekStartDate.setMonth(this.currentWeekStartDate.getMonth() - 1); // Adjust current week start date to previous month
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to navigate to the next month
  nextMonth() {
    this.currentWeekStartDate.setMonth(this.currentWeekStartDate.getMonth() + 1); // Adjust current week start date to next month
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to navigate to the previous year
  previousYear() {
    this.currentWeekStartDate.setFullYear(this.currentWeekStartDate.getFullYear() - 1); // Adjust current week start date to previous year
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to navigate to the next year
  nextYear() {
    this.currentWeekStartDate.setFullYear(this.currentWeekStartDate.getFullYear() + 1); // Adjust current week start date to next year
    this.fetchBookings(); // Fetch bookings for the updated week
  }

  // Function to set the current week start date as the most recent Sunday
  setCurrentWeekStartDate() {
    const today = new Date(); // Get the current date
    const dayOfWeek = today.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    this.currentWeekStartDate = new Date(today); // Set the current week start date as today's date
    this.currentWeekStartDate.setDate(today.getDate() - dayOfWeek); // Adjust the date to the most recent Sunday
  }

  // Function to set the current week end date by adding 6 days to the start date
  setCurrentWeekEndDate() {
    this.currentWeekEndDate = new Date(this.currentWeekStartDate); // Set the current week end date as the current week start date
    this.currentWeekEndDate.setDate(this.currentWeekStartDate.getDate() + 6); // Add 6 days to get the end of the week
  }

  // Function to get the formatted date for a specific day
  getFormattedDateForDay(day: string): string {
    const dayIndex = this.weekDays.indexOf(day); // Get the index of the day in the weekDays array
    const date = new Date(this.currentWeekStartDate); // Create a new date object for the current week start date
    date.setDate(this.currentWeekStartDate.getDate() + dayIndex); // Add the day index to get the date for the specific day
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' }); // Return the formatted date
  }

  // Function to handle when a booking is clicked
  bookingClicked(booking: any) {
    // Find the index of the selected station in the stations array
    let index = this.stations.findIndex((res) => {
      return res.id == this.selectedStation;
    })

    // Get the name of the selected station
    let selectedStationName = this.stations[index].name;

    // Add the selected station name to the booking object
    booking.selectedStationName = selectedStationName;

    // Navigate to the booking-details component and pass the booking object as a query parameter
    this.router.navigate(['/booking-details'], { queryParams: { booking: JSON.stringify(booking) } });
  }

}
