////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a render prop callback that passes
//   the coords and error
// - When you're done, <App> should no longer have anything but
//   a render method
// - Now create a <GeoAddress> component that also uses a render
//   prop callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address. It returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render
// - Make sure <GeoAddress> supports the user moving positions
import "./index.css";
import React from "react";
import LoadingDots from "./LoadingDots";
import Map from "./Map";
//import getAddressFromCoords from './getAddressFromCoords'

class App extends React.Component {
  state = {
    coords: null,
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }

  render() {
    return (
      <div className="app">
        {this.state.error ? (
          <div>Error: {this.state.error.message}</div>
        ) : this.state.coords ? (
          <Map
            lat={this.state.coords.lat}
            lng={this.state.coords.lng}
            info="You are here"
          />
        ) : (
          <LoadingDots />
        )}
      </div>
    );
  }
}

export default App;
