import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Imported FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Imported HttpClientModule for HTTP requests
import { AppRoutingModule } from './app-routing.module'; // Imported the AppRoutingModule
import { AppComponent } from './app.component';
import { WeekViewComponent } from './week-view/week-view.component'; // Imported the WeekViewComponent
import { BookingDetailsComponent } from './booking-details/booking-details.component'; // Imported the BookingDetailsComponent

@NgModule({
  declarations: [
    AppComponent,
    WeekViewComponent,
    BookingDetailsComponent
  ],
  imports: [
    BrowserModule, // Imported BrowserModule for browser-specific features
    AppRoutingModule, // Imported the AppRoutingModule to handle routing
    FormsModule, // Imported FormsModule for two-way data binding with ngModel
    HttpClientModule // Imported HttpClientModule for making HTTP requests
  ],
  providers: [], // Providers array to specify services
  bootstrap: [AppComponent] // Defining the root component to bootstrap the application
})
export class AppModule { } // Exporting the AppModule
