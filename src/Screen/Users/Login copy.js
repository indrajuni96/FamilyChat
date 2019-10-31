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
  Input,
  Item,
  Grid,
  Col,
  Row,
  Label,
  Button
} from 'native-base';
import firebase from "firebase";

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

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      data: []
    };
  }

  handleLogin() {
    const { email, password } = this.state;
    // console.log(email + password)

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("Logged In!")
        var data = firebase.auth().currentUser
        this.setState({
          data
        })

        // Navigate to the Home page
        this.props.navigation.replace('Friend', { data: this.state.data })
      }).catch((error) => {
        alert('Email or Password Invalid')
        console.log(error)
      });
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#2c3e50" style={{ display: 'none' }}>
        </Header>
        <Content>
          <View style={styles.contentHeaderLogin}>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center', marginVertical: 20 }}>
                  <Text>LOGIN</Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Item floatingLabel style={{ marginVertical: 5 }}>
                    <Label>Email</Label>
                    <Input
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                    />
                  </Item>
                  <Item floatingLabel style={{ marginVertical: 5 }}>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({ password })}
                      value={this.state.password}
                    />
                  </Item>
                  <Button
                    success
                    onPress={() => this.handleLogin()}
                    style={{ width: 80, marginVertical: 10 }}>
                    <Text> Login </Text>
                  </Button>
                  <Text onPress={() => this.props.navigation.navigate('Register')}>Register</Text>
                </Col>
              </Row>
            </Grid>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentHeaderLogin: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
})

export default Login