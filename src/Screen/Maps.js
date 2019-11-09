import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { Container, Icon } from 'native-base'
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: -6.225648,
      longitude: 106.858290,
      region: 0,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }

  watchID: ?number = null;

  componentDidMount() {
    this.getLocation()
  }

  async getLocation() {
    await Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      error => { },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        lastPosition
      });
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    let myMap;
    return (
      <Container>
        <MapView
          ref={ref => (myMap = ref)}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >
          <Marker
            coordinate={{
              latitude: this.props.navigation.getParam('latitude'),
              longitude: this.props.navigation.getParam('longitude')
            }}
            title={this.props.navigation.getParam('username')}
            description={this.props.navigation.getParam('username') + ' Location'}
            onPress={() => {
              myMap.fitToCoordinates(
                [
                  {
                    latitude: this.props.navigation.getParam('latitude'),
                    longitude: this.props.navigation.getParam('longitude')
                  },
                ],
                {
                  animated: true, // optional
                },
              );
            }}
          />
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            title="My"
            description="My Location"
            onPress={() => {
              myMap.fitToCoordinates(
                [
                  {
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  },
                ],
                {
                  animated: true, // optional
                },
              );
            }}
          />
        </MapView >
        <View style={{ margin: 15 }}>
          <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
            <Icon
              type="Ionicons"
              name="md-arrow-round-back"
              style={{ color: '#fff' }}
            />
          </TouchableOpacity>
          {/* <Text>
            <Text style={{ fontWeight: '500', color: 'green' }}>Latitude : </Text>
            {this.state.latitude}
          </Text>
          <Text>
            <Text style={{ fontWeight: '500', color: 'red' }}>Longtitude: </Text>
            {this.state.longitude}
          </Text> */}
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  btnBack: {
    position: 'absolute',
    backgroundColor: '#252f4a',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25
  }
})

export default Maps