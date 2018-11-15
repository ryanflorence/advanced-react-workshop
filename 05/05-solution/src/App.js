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
import getAddressFromCoords from "./getAddressFromCoords";

class GeoAddress extends React.Component {
  static propTypes = {
    coords: React.PropTypes.object
  };

  state = {
    address: null,
    error: null
  };

  componentDidMount() {
    if (this.props.coords) this.fetchAddress();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.coords !== this.props.coords) {
      this.fetchAddress();
    }
  }

  fetchAddress() {
    const { lat, lng } = this.props.coords;
    getAddressFromCoords(lat, lng).then(address => {
      this.setState({ address });
    });
  }

  render() {
    return this.props.render(this.state);
  }
}

class GeoPosition extends React.Component {
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
    return this.props.render(this.state);
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <GeoPosition
          render={state =>
            state.error ? (
              <div>Error: {state.error.message}</div>
            ) : state.coords ? (
              <GeoAddress
                coords={state.coords}
                render={({ error, address }) => (
                  <Map
                    lat={state.coords.lat}
                    lng={state.coords.lng}
                    info={error || address || "Loading..."}
                  />
                )}
              />
            ) : (
              <LoadingDots />
            )
          }
        />
      </div>
    );
  }
}

export default App;
