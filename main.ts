import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from 'ol/style';
import {points} from "./points";
import {Point} from "ol/geom";
import Overlay from 'ol/Overlay';


useGeographic();

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

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

points.forEach((point) => {
    const feature = new Feature({
        geometry: new Point([point.coordinates[1], point.coordinates[0]]),
        name: point.name,
    })
    feature.setId(point.name);
    pointsById[feature.getId()] = point;
    features.push(feature);
});

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
    target: 'map',
    layers: [osmTile, pointLayer],
    overlays: [overlay],
    view: new View({
        center: [11.97050571, 57.70875572],
        zoom: 12
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
    const point = pointsById[feature.getId()]

    content.innerHTML = 'Name:' + point.name;
    const coordinates: Array<number> = feature.getGeometry().getCoordinates();
    overlay.setPosition([coordinates[0], coordinates[1]]);
});

