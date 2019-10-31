import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Icon,
  Text,
  Grid,
  Col,
  Row,
  Input,
  Item,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right
} from 'native-base';
import firebase from "firebase";
import Ionicons from 'react-native-vector-icons/Ionicons'
import sarahViloid from '../../Assets/Images/sarahViloid.jpg'
import angel from '../../Assets/Images/angel.jpg'
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

class ListChats extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // message: [
      //   {
      //     image: sarahViloid,
      //     name: 'Sarah Viloid',
      //     messageInbox: 'Hallo, indra..',
      //     date: '14:43 pm'
      //   },
      //   {
      //     image: angel,
      //     name: 'Angel',
      //     messageInbox: 'Doing what you like will always keep you happy . .',
      //     date: '12:50 pm'
      //   },
      //   {
      //     image: kimHyunSoo,
      //     name: '^-^',
      //     messageInbox: 'Doing what you like will always keep you happy . .',
      //     date: '8:43 am'
      //   },
      // ],
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
                  <Text style={{ color: '#ffff', fontSize: 20 }}>Chats</Text>
                </Col>
                <Col>
                  <Row>
                    <Col style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => alert('Add Chat!')}>
                        <Ionicons style={[{ color: '#ffff' }]} size={25} name={'ios-chatbubbles'} />
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ width: '20%', alignItems: 'flex-end', marginRight: 5 }}>
                      <TouchableOpacity onPress={() => alert('More!')}>
                        <Ionicons style={[{ color: '#ffff' }]} size={25} name={'md-more'} />
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
            {Object.keys(this.state.users)
              .filter((val) => this.state.users[val].email !== this.state.email)
              .map((key) => {
                return (
                  <>
                    <List>
                      <ListItem avatar noBorder button={true}
                        onPress={() => this.props.navigation.navigate('ChatRoom',
                          {
                            username: this.state.users[key].username,
                            image: this.state.users[key].email
                          }
                        )}>
                        <Left>
                          <Thumbnail source={kimHyunSoo} />
                        </Left>
                        <Body>
                          <Text>{this.state.users[key].username}</Text>
                          <Text note>{this.state.users[key].email}</Text>
                        </Body>
                        <Right style={{ justifyContent: 'center' }}>
                          {/* <Text note>{item.date}</Text> */}
                        </Right>
                      </ListItem>
                    </List>
                  </>
                )
              })}
            {/* <FlatList
              data={this.state.message}
              keyExtractor={(item) => item.id}
              renderItem={({ item, key }) => (
                <List>
                  <ListItem avatar noBorder button={true}
                    onPress={() => this.props.navigation.navigate('ChatRoom',
                      {
                        username: item.name,
                        image: item.image,
                        message: item.messageInbox
                      }
                    )}>
                    <Left>
                      <Thumbnail source={item.image} />
                    </Left>
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note>{item.messageInbox}</Text>
                    </Body>
                    <Right style={{ justifyContent: 'center' }}>
                      <Text note>{item.date}</Text>
                    </Right>
                  </ListItem>
                </List>
              )}
            /> */}
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
  }
})

export default ListChats