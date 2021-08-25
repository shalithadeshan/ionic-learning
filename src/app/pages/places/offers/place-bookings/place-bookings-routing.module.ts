import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceBookingsPage } from './place-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceBookingsPageRoutingModule {}
