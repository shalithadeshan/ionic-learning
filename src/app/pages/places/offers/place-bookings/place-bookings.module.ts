import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceBookingsPageRoutingModule } from './place-bookings-routing.module';

import { PlaceBookingsPage } from './place-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceBookingsPageRoutingModule
  ],
  declarations: [PlaceBookingsPage]
})
export class PlaceBookingsPageModule {}
