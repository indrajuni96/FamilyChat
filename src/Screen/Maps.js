import React, { Component } from "react"
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.620293,
        longitude: 106.818488,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }
    };
  }
  render() {
    return (

      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
      >
        <Marker
          coordinate={{ latitude: -6.620293, longitude: 106.818488 }}
          title={"Arkademy Bogor"}
          description={"Tempat Belajar Koding Asik."}
        />
      </MapView>
    )
  }
}

export default Maps