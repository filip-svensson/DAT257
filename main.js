import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';

useGeographic();

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    //Peon work too slow, api gang takeover
    // Recommend: https://openlayers.org/en/latest/examples/geographic.html
    center: [11.97050571,57.70875572],
    zoom: 12
  })
});
