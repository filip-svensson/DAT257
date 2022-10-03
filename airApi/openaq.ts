import {weatherStation} from "./weatherStation";

function fetchAQ(countryCode : string, linkFix : string) {
    // @ts-ignore
    return new Promise<any>(async function (resolve, reject) {
        let url : string = ("https://api.openaq.org/v2/locations?limit=1000&" + linkFix + "order_by=location&country=");
        url = url.concat(countryCode);
        const res: any = await fetch(url);
        resolve(res.json());
    })
}

export async function getCountryData(country : string, choice : number) {
    let actualdata: any;
    switch(choice){
        case 1:  actualdata = await fetchAQ(country, 'parameter=pm10&')
            break;
        case 2:  actualdata = await fetchAQ(country, 'parameter=pm10&parameter=pm25&')
            break;
        case 3:  actualdata = await fetchAQ(country, 'parameter=pm10&parameter=pm25&parameter=no2&')
            break;

    }

    console.log(actualdata);

    let allStations: {} = {};

    for (let i = 0; i < actualdata.results.length; i++) {
        let location : number;
        let city : string;
        let lat : number;
        let lon : number;
        let pm10 : number;
        let pm25 : number;
        let no2 : number;
        let bc : number;
        let co : number;
        let so2 : number;
        let o3 : number;
        let ch4 : number;


        city = actualdata.results[i].city;
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
            if(actualdata.results[i].parameters[j].parameter == 'no2'){
                no2 = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'bc'){
                bc = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'co'){
                co = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'so2'){
                co = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'o3'){
                co = actualdata.results[i].parameters[j].lastValue;
            }
            if(actualdata.results[i].parameters[j].parameter == 'ch4'){
                co = actualdata.results[i].parameters[j].lastValue;
            }
        }
        allStations[i] = new weatherStation(city, country, location, pm10, pm25, no2, bc, co, so2, o3, ch4, lat, lon);
    }


    return allStations;

}