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
  Icon,
  Text,
  Grid,
  Row,
  Col,
  Item,
  Input,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body
} from 'native-base';
import firebase from "firebase";
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import kimHyunSoo from '../../Assets/Images/kimHyunSoo.jpg'

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

class Friends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      dataContant: [],
      users: [],
      message: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  async getData() {
    this.setState({
      username: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email
    })
    await firebase
      .database()
      .ref('users/')
      .on('value', (snapshot) => {
        const set = snapshot.val()
        this.setState({
          users: set
        })
      })
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#252f4a' }} androidStatusBarColor='#202a43' noShadow={true}>
          <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 7 }}>
            <Grid>
              <Row>
                <Col>
                  <Text style={{ color: '#ffff', fontSize: 20 }}>Friends</Text>
                </Col>
                <Col>
                  <Row>
                    <Col style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => alert('Add user!')}>
                        <Feather style={[{ color: '#ffff' }]} size={25} name={'user-plus'} />
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ width: '25%', alignItems: 'flex-end', marginRight: 5 }}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <AntDesign style={[{ color: '#ffff' }]} size={25} name={'setting'} />
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </View>
        </Header>
        <Content>
          <View style={styles.contentSearch}>
            <Item style={{ backgroundColor: '#323b54', borderRadius: 7, paddingHorizontal: 10, borderColor: 'transparent' }} >
              <Icon active name='search' style={{ color: '#6f7687' }} />
              <Input placeholder='Search' placeholderTextColor="#6f7687" style={{ color: '#6f7687', height: 40 }} />
            </Item>
          </View>
          <View style={styles.contentChats}>
            <View style={styles.contentMyContat}>
              <Text style={{ paddingHorizontal: 10, color: '#252d39', fontWeight: 'bold' }}>
                My Profile
              </Text>
              <List>
                <ListItem avatar
                >
                  <Left>
                    <Thumbnail source={kimHyunSoo} />
                  </Left>
                  <Body style={{ marginTop: 10 }}>
                    <Text>{this.state.username}</Text>
                    <Text note>Sedang Tidur</Text>
                  </Body>
                </ListItem>
              </List>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Text style={{ paddingHorizontal: 10, color: '#252d39', fontWeight: 'bold' }}>
                Friends
              </Text>
              {Object.keys(this.state.users)
                .filter((val) => this.state.users[val].email !== this.state.email)
                .map((key) => {
                  return (
                    <>
                      <List>
                        <ListItem avatar button={true}
                          onPress={() => this.props.navigation.navigate('DetailFriend',
                            {
                              username: this.state.users[key].username,
                              email: this.state.users[key].email,
                              phone: this.state.users[key].phone
                            })}>
                          <Left>
                            <Thumbnail source={{ uri: `${this.state.users[key].avatar}` }} />
                          </Left>
                          <Body style={{ marginTop: 10 }}>
                            <Text>{this.state.users[key].username}</Text>
                            <Text note>{this.state.users[key].email}</Text>
                          </Body>
                        </ListItem>
                      </List>
                    </>
                  )
                })}
            </View>
          </View>
        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  contentSearch: {
    backgroundColor: '#252f4a',
    paddingVertical: 7,
    paddingHorizontal: 15
  },
  contentChats: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  contentMyContat: {
    paddingRight: 10
  }
})

export default Friends