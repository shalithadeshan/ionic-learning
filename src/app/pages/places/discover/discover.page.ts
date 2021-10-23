import { AuthService } from './../../auth/auth.service';
import { Place } from './../place.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  placesList: Place[];
  loadedPlaces: Place[];
  relevantPlaces: Place[];
  placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.placesList = places;
      this.relevantPlaces = this.placesList;
      this.loadedPlaces = this.relevantPlaces.slice(1);
    });
  }

  // onOpenMenu() {
  //   this.menuCtrl.open();
  // }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.placesList;
      this.loadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.placesList.filter(
        (place) => place.userId !== this.authService.userId
      );
      this.loadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
