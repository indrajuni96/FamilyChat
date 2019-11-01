import React, { Component } from "react"
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region2: []
      ,
      // region: [
      //   { latitude: -6.620293 },
      //   { longitude: 106.818488 },
      //   { latitudeDelta: 0.015 },
      //   { longitudeDelta: 0.0121 },
      // ],
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(info =>
      this.setState({ region2: { ...info.coords } })
    );
  }

  render() {

    Geolocation.getCurrentPosition(info => alert("Latitude :" + info.coords.latitude + "\n longtitude : " + info.coords.longitude));
    //console.log(this.state.region2)
    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: this.state.region2.latitude,
          longitude: this.state.region2.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        <Marker
          coordinate={{ latitude: this.state.region2.latitude, longitude: this.state.region2.longitude }}
          title={"Arkademy Bogor"}
          description={"Tempat Belajar Koding Asik."}
        />
      </MapView >
    )
  }
}

export default Maps