import {weatherStation} from "./weatherStation";

function fetchAQ(countryCode : string) {
    return new Promise<any>(async function (resolve, reject) {
        let url : string = ("https://api.openaq.org/v2/locations?limit=1000&parameter=pm10&parameter=pm25&order_by=location&country=");
        url = url.concat(countryCode);
        const res: any = await fetch(url);
        resolve(res.json());
    })
}

export async function getCountryData(country : string) {

    const actualdata: any = await fetchAQ(country)

    let allStations: {} = {};
    for (let i = 0; i < actualdata.results.length; i++) {
        let location : number;
        let lat : number;
        let lon : number;
        let pm10 : number;
        let pm25 : number;
        location = actualdata.results[i].id;
        lat = actualdata.results[i].coordinates.latitude;
        lon = actualdata.results[i].coordinates.longitude;
        for(let j = 0; j < actualdata.results[i].parameters.length; j++){
            if(actualdata.results[i].parameters[j].parameter == 'pm10'){
                pm10 = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'pm25'){
                pm25 = actualdata.results[i].parameters[j].lastValue;
            }
        }
        allStations[i] = new weatherStation(country, location, pm10, pm25, lat, lon);
    }


    return allStations;

}