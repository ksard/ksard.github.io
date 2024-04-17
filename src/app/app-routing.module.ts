import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekViewComponent } from './week-view/week-view.component'; // Import the WeekViewComponent
import { BookingDetailsComponent } from './booking-details/booking-details.component'; // Import the BookingDetailsComponent

const routes: Routes = [
  { path: 'week-view', component: WeekViewComponent }, // Route to WeekViewComponent when '/week-view' is accessed
  { path: 'booking-details', component: BookingDetailsComponent }, // Route to BookingDetailsComponent when '/booking-details' is accessed
  { path: '', redirectTo: '/week-view', pathMatch: 'full' } // Redirect to '/week-view' by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initialize the RouterModule with the defined routes
  exports: [RouterModule] // Export the configured RouterModule
})
export class AppRoutingModule { } // Export the AppRoutingModule module
