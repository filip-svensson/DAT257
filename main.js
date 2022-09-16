import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import 'bootstrap/dist/css/bootstrap.min.css';
const express = require("express")
const path = require('path')

const app = express();

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});



app.use('/css', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(_dirname, 'node_modules/jquery/dist')))
