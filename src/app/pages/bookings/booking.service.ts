import { delay, take, tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private booking = new BehaviorSubject<Booking[]>([]);
  constructor(private authService: AuthService) {}

  get bookings() {
    return this.booking.asObservable();
  }

  // addBooking(booking: Booking) {
  //   // this.booking.next(this.booking.value.concat(booking));
  // }
  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ): any {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      placeTitle,
      this.authService.userId,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
      dateTo
    );
    this.booking.pipe(
      take(1),
      // delay(1000),
      tap((bookings) => {
        this.booking.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking(bookingId: string) {
    this.booking.next(
      this.booking.value.filter((booking) => booking.id !== bookingId)
    );
  }
}
