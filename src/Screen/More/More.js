import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Text,
  Grid,
  Col,
  Row,
  Thumbnail
} from 'native-base';
import firebase from "firebase";
import kimHyunSoo from '../../Assets/Images/kimHyunSoo.jpg'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCDOCwY8Wtr38quw9BdsMBHdu5XgpK457Q",
    authDomain: "familychat-62223.firebaseapp.com",
    databaseURL: "https://familychat-62223.firebaseio.com",
    projectId: "familychat-62223",
    storageBucket: "familychat-62223.appspot.com",
    messagingSenderId: "896574121183",
    appId: "1:896574121183:web:ccd37389b530f6ac98756a",
    measurementId: "G-0KML2JH1L4"
  })
}

class More extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  // onPress = () => this.props.navigation.navigate('ChatRoom', { name: this.state.name })

  async logout() {
    await firebase.auth().signOut()
    this.props.navigation.replace('Login')
    console.log('Logged out!')
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#252f4a' }} androidStatusBarColor='#202a43' noShadow={true}>
          <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 7 }}>
            <Text style={{ color: '#ffff', fontSize: 20 }}>More</Text>
          </View>
        </Header>
        <Content>
          <View style={styles.contentMore}>
            <Grid>
              <Row style={{ paddingVertical: 15 }}>
                <Col style={{ alignItems: 'center' }}>
                  <Thumbnail large source={kimHyunSoo} />
                </Col>
              </Row>
              <Row>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={{ color: '#252d39', fontSize: 21 }}>Kim Hyun Soo</Text>
                  <Text style={{ color: '#63676f', fontSize: 14 }}>KimHyunSoo@gmail.com</Text>
                </Col>
              </Row>
            </Grid>
          </View>
          <View style={styles.contentSetting}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
              <Grid>
                <Row style={{ paddingVertical: 10 }}>
                  <Col style={{ width: '15%' }}>
                    <FontAwesome style={[{ color: '#252f4a' }]} size={25} name={'user'} />
                  </Col>
                  <Col>
                    <Text style={{ color: '#252d39' }}>Edit Profile</Text>
                  </Col>
                </Row>
              </Grid>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.logout()}>
              <Grid>
                <Row style={{ paddingVertical: 10 }}>
                  <Col style={{ width: '15%' }}>
                    <FontAwesome style={[{ color: '#252f4a' }]} size={25} name={'power-off'} />
                  </Col>
                  <Col>
                    <Text style={{ color: '#252d39' }}>Logout</Text>
                  </Col>
                </Row>
              </Grid>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentMore: {
    flex: 1,
    paddingHorizontal: 7,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8'
  },
  contentSetting: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 7
  }
})

export default More