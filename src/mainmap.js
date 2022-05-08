import React, { Component } from "react";
import Map from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOSM from "ol/source/OSM";
import {fromLonLat} from 'ol/proj';

class PublicMap extends Component {
  constructor(props) {
    super(props);
    const portage = [261.727295, 49.970656];
    const portageLocated = fromLonLat(portage);
    this.state = { center: portageLocated, zoom: 10 };

    this.olmap = new Map({
      target: null,
      layers: [
        new OlLayerTile({
          source: new OlSourceOSM()
        })
      ],
      view: new OlView({

        center: this.state.center,
        zoom: this.state.zoom
      })
    });
  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.olmap.setTarget("map");

    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  userAction() {
    const portage = [261.718295, 49.971520];
    const portageZoomed = fromLonLat(portage);
    this.setState({ center: portageZoomed, zoom: 16});
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map" style={{ width: "100%", height: "360px" }}>
        <button onClick={e => this.userAction()}>Red River College</button><br />
      </div>
    );
  }
}

export default PublicMap;
