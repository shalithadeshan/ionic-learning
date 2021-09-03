import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/pages/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      if (!param.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(param.get('placeId'));
    });
  }

  async onBookPlace() {
    // this.router.navigate(['/places/tabs/discover']); // angular navigate
    // this.navCtrl.navigateBack(['places/tabs/discover']); // use angular navigate but instead open navigation it will add back navigation
    // this.navCtrl.pop(); // this will pop the last page but if there was no page it will do nothing
    // const modal = *****
    // await this.modalCtrl
    //   .create({
    //     component: CreateBookingComponent,
    //     animated: true,
    //     swipeToClose: true,
    //     componentProps: {
    //       selectedPlace: this.place,
    //     },
    //   })
    //   .then((modals) => {
    //     modals.present();
    //     return modals.onDidDismiss();
    //   })
    //   .then((resultData) => {
    //     console.log(resultData.data, resultData.role);
    //     if (resultData.role === 'confirm') {
    //       console.log('Booked');
    //     }
    //   });
    // return modal.present(); *****
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date', // no role just regular button
            handler: () => {
              this.openBookingModal('random');
            }, // run some code when click
          },
          {
            text: 'Cancel',
            role: 'destructive', // turn color red
            // role: 'cancel', // show end of the list(bottom most button)
          },
        ],
      })
      .then((actionEl) => {
        actionEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    // const modal =
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        animated: true,
        swipeToClose: true,
        componentProps: {
          selectedPlace: this.place,
        },
      })
      .then((modals) => {
        modals.present();
        return modals.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('Booked');
        }
      });
    // return modal.present();
  }
}
