export class weatherStation {
    public city: string;
    public country: string;
    public location: number;
    public pm10: number;
    public pm25: number;
    public no2: number;
    public bc: number;
    public co: number;
    public so2: number;
    public o3: number;
    public ch4: number;
    public lat: number;
    public lon: number;

    constructor(city: string, country: string, location: number, pm10: number, pm25: number, no2: number, bc : number, co : number, so2: number, o3 : number, ch4 : number, lat: number, lon: number) {
        this.city = city;
        this.country = country;
        this.location = location;
        this.pm10 = pm10;
        this.pm25 = pm25;
        this.no2 = no2;
        this.bc = bc;
        this.co = co;
        this.so2 = so2;
        this.o3 = o3;
        this.ch4 = ch4;
        this.lat = lat;
        this.lon = lon;
    }

}