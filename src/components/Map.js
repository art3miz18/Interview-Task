import React from 'react';
import { Map, TileLayer, Polyline } from 'react-leaflet';

class MapData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 12.9716,
      lng: 77.5946,
      zoom: 11,
    };
  }
  getRandomColor = () => {
    console.log('here');
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    var { routePoints } = this.props;
    return (
      <>
      <div className="map-data">
        <p className="head-graph">Travel Point over the map</p>
        <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {routePoints.map(el => {
          let color = this.getRandomColor();
          return <Polyline color={color} positions={el} />;
        })}
      </Map>
    </div>
    </>
      
    );
  }
}

export default MapData;
