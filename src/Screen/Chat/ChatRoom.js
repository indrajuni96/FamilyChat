import React, { Component, Children } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import {
  Container,
  Header,
  Grid,
  Col,
  Row,
  Text
} from 'native-base'
import firebase from "firebase";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GiftedChat } from 'react-native-gifted-chat'

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

class ChatRoom extends Component {
  state = {
    Messages: [],
    name: '',
    displayName: ''

  }

  async componentWillMount() {
    await this.setState({
      messages: [],
      name: firebase.auth().currentUser.displayName,
      displayName: this.props.navigation.getParam('username')
    })
    this.getMessage()
  }

  userData = () => {
    return {
      name: firebase.auth().currentUser.displayName,
      email: firebase.auth().currentUser.email,
      avatar: firebase.auth().currentUser.photoURL,
      id: firebase.auth().currentUser.uid,
      _id: firebase.auth().currentUser.uid,
    }
  }

  onSend = async messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i]
      const message = {
        text,
        user,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      }
      await firebase
        .database()
        .ref(`Messages/${this.state.name}/${this.state.displayName}`)
        .push(message)
      await firebase
        .database()
        .ref(`Messages/${this.state.displayName}/${this.state.name}`)
        .push(message)
    }
  }

  getMessage() {
    firebase
      .database()
      .ref(
        'Messages/' +
        firebase.auth().currentUser.displayName +
        '/' +
        this.props.navigation.getParam('username') +
        '/'
      )
      .on('value', snapshot => {
        let data = []
        snapshot.forEach(child => {
          data = [
            {
              _id: child.key,
              text: child.val().text,
              createdAt: child.val().createdAt,
              user: {
                _id: child.val().user._id,
                name: child.val().user.name
              },
            },
            ...data,
          ]
        })
        this.setState({ Messages: data })
      })
  }

  // getMessage() {
  //   firebase
  //     .database()
  //     .ref(`Messages/${this.state.name}/${this.state.displayName}`)
  //     .on('value', data => {
  //       var message = []
  //       data.forEach(child => {
  //         message.push(child)
  //       })
  //       this.setState({ Messages: message })

  //       // console.log(this.state.Messages)
  //       this.state.Messages.forEach(val => {
  //         let data = JSON.parse(JSON.stringify(val))
  //         console.log(data.rio)
  //       })

  //     })
  // }

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
                  <Text style={{ color: '#ffff', fontSize: 20 }}>{this.state.displayName}</Text>
                </Col>
                <Col>
                  <Row>
                    <Col style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => alert('Phone!')}>
                        <FontAwesome style={[{ color: '#ffff' }]} size={25} name={'phone'} />
                      </TouchableOpacity>
                    </Col>
                    <Col style={{ width: '30%', alignItems: 'flex-end', marginRight: 5 }}>
                      <TouchableOpacity onPress={() => alert('Down!')}>
                        <FontAwesome style={[{ color: '#ffff' }]} size={25} name={'angle-down'} />
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </View>
        </Header>
        {/* <Text>{this.props.navigation.getParam('name')}</Text> */}
        <GiftedChat
          messages={this.state.Messages}
          onSend={Messages => this.onSend(Messages)}
          user={this.userData()}
        />
      </Container >
    )
  }
}

const styles = StyleSheet.create({
  contentChatRoom: {
    flex: 1,
    backgroundColor: '#eff3f6',
    paddingVertical: 15,
    paddingHorizontal: 10
  }
})

export default ChatRoom