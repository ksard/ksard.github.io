import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationServiceService {

  private apiUrl = 'https://605c94c36d85de00170da8b4.mockapi.io/stations';

  constructor(private http: HttpClient) { }

  getStations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookingsForStation(stationId: string): Observable<any[]> {
    const url = `${this.apiUrl}/${stationId}/bookings`;
    return this.http.get<any[]>(url);
  }
}
