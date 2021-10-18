import { Place } from './place.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of new york city',
      'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
      200000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p2',
      'LA Mansion',
      'In the heart of Los Angeles city',
      // eslint-disable-next-line max-len
      'https://untappedcities.com/wp-content/uploads/2014/07/2-e-79th-st-Ukrainian-Institute-Harry-F.-Sinclair-House-Fifth-Avenue-NYC-1-1.jpg',
      400000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
    new Place(
      'p3',
      'LV Mansion',
      'In the heart of Las Vegas city',
      // eslint-disable-next-line max-len
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQT-LF0uM5ceyAk3EU3fT2QQlsiPr2-0Tc2g&usqp=CAU',
      400000,
      new Date('2019-01-01'),
      new Date('2019-12-31')
    ),
  ];

  constructor() {}

  getPlaces() {
    return [...this.places];
  }
  getPlace(id: string) {
    return { ...this.places.find((p) => p.id === id) };
  }
}
