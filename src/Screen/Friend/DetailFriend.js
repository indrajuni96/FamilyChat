import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking
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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as firebase from "firebase"

class DetailInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      avatar: '',
      phoneNumber: ''
    }
  }

  async componentDidMount() {
    await this.getUserData()
    this.getPhoneNumber()
  }

  async getUserData() {
    await this.setState({
      username: this.props.navigation.getParam('username'),
      email: this.props.navigation.getParam('email'),
      avatar: this.props.navigation.getParam('avatar')
    })
  }

  async getPhoneNumber() {
    const userCollection = 'users/' + this.state.username
    await firebase.database().ref(userCollection).once('value', (data) => {
      this.setState({
        phoneNumber: data.val().phoneNumber
      })
    })
    console.log(this.state.phoneNumber)
  }

  callPhone() {
    let phoneNumber = `tel:${this.state.phoneNumber}`;
    Linking.openURL(phoneNumber);
  }

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
                  <Thumbnail source={{ uri: `${this.state.avatar}` }} />
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
            <TouchableOpacity onPress={() => this.callPhone()}>
              <Grid>
                <Row style={{ paddingVertical: 10 }}>
                  <Col style={{ width: '10%', marginRight: 10, alignItems: 'center' }}>
                    <FontAwesome style={[{ color: '#252f4a' }]} size={25} name={'phone'} />
                  </Col>
                  <Col>
                    <Text style={{ color: '#252d39' }}>Call Phone</Text>
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