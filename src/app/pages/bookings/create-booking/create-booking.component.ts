import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f', { static: true }) from: NgForm;
  startDate: string;
  endDate: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === 'random') {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    if (!this.datesValid() || !this.from.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.from.value['first-name'],
          lastName: this.from.value['last-name'],
          guestNumber: +this.from.value['guest-number'],
          startDate: new Date(this.from.value['booking-start']),
          endDate: new Date(this.from.value['booking-end']),
        },
      },
      'confirm'
    );
  }
  datesValid() {
    const startDate = new Date(this.from.value['booking-start']);
    const endDate = new Date(this.from.value['booking-end']);
    return endDate > startDate;
  }
}
