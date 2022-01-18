import { Place } from './place.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imgUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  // place = new BehaviorSubject<Place[]>([
  //   new Place(
  //     'p1',
  //     'Manhattan Mansion',
  //     'In the heart of new york city',
  //     'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042534/Felix_Warburg_Mansion_007.jpg',
  //     200000,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p2',
  //     'LA Mansion',
  //     'In the heart of Los Angeles city',
  //     eslint-disable-next-line max-len
  //     'https://untappedcities.com/wp-content/uploads/2014/07/2-e-79th-st-Ukrainian-Institute-Harry-F.-Sinclair-House-Fifth-Avenue-NYC-1-1.jpg',
  //     400000,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'abc'
  //   ),
  //   new Place(
  //     'p3',
  //     'LV Mansion',
  //     'In the heart of Las Vegas city',
  //     // eslint-disable-next-line max-len
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQT-LF0uM5ceyAk3EU3fT2QQlsiPr2-0Tc2g&usqp=CAU',
  //     400000,
  //     new Date('2019-01-01'),
  //     new Date('2019-12-31'),
  //     'abc'
  //   ),
  // ]);

  place = new BehaviorSubject<Place[]>([]);

  get places() {
    return this.place.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://ionic-angular-49a4f-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((res) => {
          const places = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  res[key].title,
                  res[key].description,
                  res[key].imgUrl,
                  res[key].price,
                  new Date(res[key].availableFrom),
                  new Date(res[key].availableTo),
                  res[key].userId
                )
              );
            }
          }
          return places;
          // return [];
        }),
        tap((places) => {
          this.place.next(places);
        })
      );
  }
  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => ({ ...places.find((p) => p.id === id) }))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQT-LF0uM5ceyAk3EU3fT2QQlsiPr2-0Tc2g&usqp=CAU',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    return this.http
      .post<{ name: string }>(
        'https://ionic-angular-49a4f-default-rtdb.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((res) => {
          generatedId = res.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this.place.next(places.concat(newPlace));
        })
      );
    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     this.place.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        updatedPlaces = [...places];
        const placeIndex = updatedPlaces.findIndex((p) => p.id === placeId);
        const place = updatedPlaces[placeIndex];
        updatedPlaces[placeIndex] = new Place(
          place.id,
          title,
          description,
          place.imgUrl,
          place.price,
          place.availableFrom,
          place.availableTo,
          place.userId
        );
        return this.http.put(
          `https://ionic-angular-49a4f-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          {
            ...updatedPlaces[placeIndex],
            id: null,
          }
        );
      }),
      tap(() => {
        this.place.next(updatedPlaces);
      })
    );

    // return this.places.pipe(
    //   take(1),
    //   delay(1000),
    //   tap((places) => {
    //     const updatedPlaces = [...places];
    //     const placeIndex = updatedPlaces.findIndex((p) => p.id === placeId);
    //     const place = updatedPlaces[placeIndex];
    //     updatedPlaces[placeIndex] = new Place(
    //       place.id,
    //       title,
    //       description,
    //       place.imgUrl,
    //       place.price,
    //       place.availableFrom,
    //       place.availableTo,
    //       place.userId
    //     );
    //     this.place.next(updatedPlaces);
    //   })
    // );
  }
}
