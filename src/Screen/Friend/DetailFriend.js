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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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

class DetailInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      phone: ''
    }
  }

  componentDidMount() {
    this.setState({
      username: this.props.navigation.getParam('username'),
      email: this.props.navigation.getParam('email'),
      phone: this.props.navigation.getParam('phone')
    })
  }

  // onPress = () => this.props.navigation.navigate('ChatRoom', { name: this.state.name })

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#252f4a' }} androidStatusBarColor='#202a43' noShadow={true}>
          <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 7 }}>
            <Grid>
              <Row>
                <Col style={{ width: '10%' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesome style={[{ color: '#ffff' }]} size={25} name={'angle-left'} />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <Text style={{ color: '#ffff', fontSize: 20 }}>Detail Friend</Text>
                </Col>
              </Row>
            </Grid>
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
                  <Text style={{ color: '#252d39', fontSize: 21 }}>{this.state.username}</Text>
                  <Text style={{ color: '#63676f', fontSize: 14 }}>{this.state.email}</Text>
                  <Text style={{ color: '#63676f', fontSize: 12 }}>{this.state.phone}</Text>
                </Col>
              </Row>
            </Grid>
          </View>
          <View style={styles.contentSetting}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatRoom',
              {
                username: this.state.username
              })}>
              <Grid>
                <Row style={{ paddingVertical: 10 }}>
                  <Col style={{ width: '10%', marginRight: 10, alignItems: 'center' }}>
                    <MaterialCommunityIcons style={[{ color: '#252f4a' }]} size={25} name={'chat-processing'} />
                  </Col>
                  <Col>
                    <Text style={{ color: '#252d39' }}>Chat</Text>
                  </Col>
                </Row>
              </Grid>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Delete')}>
              <Grid>
                <Row style={{ paddingVertical: 10 }}>
                  <Col style={{ width: '10%', marginRight: 10, alignItems: 'center' }}>
                    <MaterialCommunityIcons style={[{ color: '#252f4a' }]} size={25} name={'delete'} />
                  </Col>
                  <Col>
                    <Text style={{ color: '#252d39' }}>Delete</Text>
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

export default DetailInfo