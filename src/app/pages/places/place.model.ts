export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imgUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date
  ) // public userId: string,
  // public location: PlaceLocation
  {}
}
