export class weatherStation {
    public country: string;
    public location: number;
    public pm10: number;
    public pm25: number;
    public lat : number;
    public lon : number;

    constructor(country : string, location : number, pm10 : number, pm25 : number, lat: number, lon : number) {
        this.country = country;
        this.location = location;
        this.pm10 = pm10;
        this.pm25 = pm25;
        this.lat = lat;
        this.lon = lon;
    }

}