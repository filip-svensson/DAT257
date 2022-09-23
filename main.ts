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

useGeographic();

//changes map to another style
const osmTile = new TileLayer({
    source: new OSM()
});


const iconStyle = new Style({
    image: new Icon({
        anchor: [0.5, 1],
        src: 'marker.png',
        scale: 0.03,
    }),
});

const pointLayer = new VectorLayer({
    source: new VectorSource({
        features: points.map((point) =>
            new Feature({
                geometry: new Point([point.coordinates[1], point.coordinates[0]]),
                name: point.name,
            })
        ),
    }),
    style: iconStyle
});

new Map({
    target: 'map',
    layers: [osmTile, pointLayer],
    view: new View({
        center: [11.97050571, 57.70875572],
        zoom: 12
    })
});