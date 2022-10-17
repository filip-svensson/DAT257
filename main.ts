import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from 'ol/style';
import {getCountryData} from "./airApi/openaq";
import {Point} from "ol/geom";
import Overlay from 'ol/Overlay';
import {weatherStation} from "./airApi/weatherStation";
import {ZoomToExtent, defaults as defaultControls} from 'ol/control';


useGeographic();

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
let done;

//changes map to another style
const osmTile = new TileLayer({
    source: new OSM()
});

//anchor is by percentage
const iconStyle = new Style({
    image: new Icon({
        anchor: [0.5, 1],
        src: 'marker.png',
        scale: 0.03,
    }),
});

const pointsById = {}
const features = []

// @ts-ignore
let allstations:weatherStation = await getCountryData('SE', 1);

let i = 0;

while(allstations[i] != undefined){
    i++
}


for(let j = 0; j < i; j++) {
    if (allstations[j].lon != undefined && allstations[j].lat != undefined) {
        const feature = new Feature({
            geometry: new Point([allstations[j].lon, allstations[j].lat]),
            name: allstations[j].location,
        })

        feature.setId(allstations[j].location);
        pointsById[feature.getId()] = allstations[j];
        features.push(feature);
    }
}


/*
points.forEach((point) => {
    const feature = new Feature({
        geometry: new Point([point.coordinates[1], point.coordinates[0]]),
        name: point.name,
    })
    feature.setId(point.name);
    pointsById[feature.getId()] = point;
    features.push(feature);
});
*/


//adds our points to the point layer
const pointLayer = new VectorLayer({
    source: new VectorSource({
        features: features,
    }),
    style: iconStyle
});

const overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        },
    },
});

const map = new Map({
    controls: defaultControls().extend([
        new ZoomToExtent({
            extent: [
                1113079.7791264898, 6329220.284081122, 1848966.9639063801,
                12036863.986909639,
            ],
            label: "SE"
        }),
    ]),
    target: 'map',
    layers: [osmTile, pointLayer],
    overlays: [overlay],
    view: new View({
        center: [15.64638, 58.395035],
        zoom: 5
    })
});


const closePopup = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
closer.onclick = closePopup;

//display popup on click
map.on('click', function (evt) {
    const feature: Feature<Point> = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return <Feature<Point>> feature;
    });
    if (!feature) {
        closePopup();
        return;
    }
    console.log(map.getView().getZoom());

    map.on('pointermove', function(e){
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getViewport().style.cursor = hit ? 'pointer' : '';
    });

    const station:weatherStation = pointsById[feature.getId()]
    let country : string = " ";
    let city : string = " ";
    let gas1 : any = 0;
    let gas2 : any = 0;
    let gas3 : any = 0;
    let gas4 : any = 0;
    let gas5 : any = 0;
    let gas6 : any = 0;
    let gas7 : any = 0;
    let gas8 : any = 0;

    if(station.country != undefined){
        if(station.country == 'SE'){
            country = 'Sweden';
        } else {
        country = station.country;}}
    if(station.city != undefined){
        city = station.city;}
    if(station.pm25 != undefined){
        gas1 = station.pm25;}
    if(station.pm10 != undefined){
        gas2 = station.pm10;}
    if(station.no2 != undefined){
        gas3 = station.no2;}
    if(station.bc != undefined){
        gas4 = station.bc;}
    if(station.co != undefined){
        gas5 = station.co;}
    if(station.so2 != undefined){
        gas6 = station.so2;}
    if(station.o3 != undefined){
        gas7 = station.o3;}
    if(station.ch4 != undefined){
        gas8 = station.ch4;}


    content.innerHTML = country + ": " + city + "<br />" + 'Partiklar < 2.5 mikrometer: ' + gas1 + " µg/m³<br />" + 'Partiklar < 10 mikrometer: '
        + gas2 + " µg/m³<br />" + 'Kvävedioxid: ' + gas3 + " ppm<br />" + 'Svartkol: ' +
        gas4 + " ppm<br />" + 'Koloxid: ' + gas5 + " ppm<br />" + 'Svaveloxid: ' +
        gas6 + " ppm<br />" + 'Ozon: ' + gas7 + " ppm<br />" + 'Metangas: ' + gas8 + " ppm<br />";
    const coordinates: Array<number> = feature.getGeometry().getCoordinates();
    overlay.setPosition([coordinates[0], coordinates[1]]);
    console.log(coordinates);


    flyToCounty(coordinates, 12, false, done);

});

let select = (document.getElementById('dropDown')) as HTMLSelectElement;
select.addEventListener('change', (event) => {
    changeZoom(select.options[select.selectedIndex].value);
})

function changeZoom(s : string) {
    let coords: Array<number> = [];
    let zoom : number;
    switch (s) {
        case 'blekinge':
            coords[0] = 15.2371803;
            coords[1] = 56.3035189;
            zoom = 9.5;
            break;
        case 'dalarna':
            coords[0] = 14.3147523;
            coords[1] = 60.9491405;
            zoom = 8;
            break;
        case 'gotland':
            coords[0] = 18.5067293;
            coords[1] = 57.4992209;
            zoom = 8;
            break;
        case 'gavleborg':
            coords[0] = 16.7952903
            coords[1] = 61.3333765;
            zoom = 8;
            break;
        case 'halland':
            coords[0] = 12.8002923;
            coords[1] = 57.0036649;
            zoom = 8.5;
            break;
        case 'jamtland':
            coords[0] = 14.3631933;
            coords[1] = 63.3577254;
            zoom = 7.5;
            break;
        case 'jonkoping':
            coords[0] = 14.4369543;
            coords[1] = 57.5084059;
            zoom = 8.4;
            break;
        case 'kalmar':
            coords[0] = 16.6648443;
            coords[1] = 57.0753599;
            zoom = 8;
            break;
        case 'kronoberg':
            coords[0] = 14.5908893;
            coords[1] = 56.7803589;
            zoom = 9;
            break;
        case 'norrbotten':
            coords[0] = 20.2058573;
            coords[1] = 66.9277701;
            zoom = 7;
            break;
        case 'skane':
            coords[0] = 13.6333113;
            coords[1] = 55.9220279;
            zoom = 8.5;
            break;
        case 'stockholm':
            coords[0] = 18.1878323;
            coords[1] = 59.4074477;
            zoom = 8.7;
            break;
        case 'sodermanland':
            coords[0] = 16.7230303;
            coords[1] = 59.0817487;
            zoom = 9;
            break;
        case 'uppsala':
            coords[0] = 17.6297363;
            coords[1] = 60.0638267;
            zoom = 9;
            break;
        case 'varmland':
            coords[0] = 13.2303153;
            coords[1] = 59.8394357;
            zoom = 8.5;
            break;
        case 'vasterbotten':
            coords[0] = 17.6748463;
            coords[1] = 64.8722133;
            zoom = 7;
            break;
        case 'vasternorrland':
            coords[0] = 17.3381613;
            coords[1] = 63.0641004;
            zoom = 8;
            break;
        case 'vastmanland':
            coords[0] = 16.1464353;
            coords[1] = 59.7188907;
            zoom = 8.8;
            break;
        case 'vastragotaland':
            coords[0] = 12.8921153;
            coords[1] = 58.2424388;
            zoom = 8;
            break;
        case 'orebro':
            coords[0] = 14.9627763;
            coords[1] = 59.3642077;
            zoom = 9;
            break;
        case 'ostergotland':
            coords[0] = 15.8282963;
            coords[1] = 58.3504528;
            zoom = 9;
            break;
    }
    flyToCounty(coords, zoom, true, done)
}

function flyToCounty(location : Array<number>, zoom : number, zoomType : boolean, done) {
    const duration = 2000;
    let parts = 2;
    let called = false;
    function callback(complete) {
        --parts;
        if (called) {
            return;
        }
        if (parts === 0 || !complete) {
            called = true;
            done(complete);
        }
    } if(zoomType){
        map.getView().animate(
            {
                center: location,
                duration: duration,
            },
            callback
        );
        map.getView().animate(
            {
                zoom: zoom - 2,
                duration: duration / 2,
            },
            {
                zoom: zoom,
                duration: duration / 2,
            },
            callback
        );
    } else {
        map.getView().animate(
            {
                center: location,
                duration: duration,
            },
            callback
        ), map.getView().animate(
            {
                zoom: zoom,
                duration: duration,
            },
            callback
        );
    }
}

