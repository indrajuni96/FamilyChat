import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import {
  Container,
  Header,
  Content,
  Text,
  Input,
  Item,
  Label,
  Spinner
} from 'native-base';
import * as firebase from "firebase"

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      phoneNumber: 0,
      password: '',
      confirm_password: '',
      isLoading: false
    };
  }

  async handleRegister() {
    const { email, username, phoneNumber, password } = this.state;
    const userCollection = 'users/' + this.state.username

    // check username is already in use
    firebase.database().ref(userCollection).once('value', (snapshot) => {
      if (snapshot.val()) {
        return alert('Username already exists')
      }
    })

    if (this.state.password !== this.state.confirm_password) {
      return alert("Password doesn't match")
    }

    this.setState({
      isLoading: true
    })

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: this.state.username
        })

        const avatar = 'https://ui-avatars.com/api/?size=256&name=' + this.state.username.replace(' ', '+')

        firebase.database().ref(userCollection).set({
          username,
          email,
          phoneNumber,
          avatar: avatar
        }).then((data) => {
          console.log('Data : ', data)
        }).catch((error) => {
          console.log('error', error)
        })

        console.log("Account created Success")
        // alert("Account created Success")
        this.setState({
          email: '',
          username: '',
          phoneNumber: '',
          password: '',
          confirm_password: ''
        })

        ToastAndroid.show('Account created Success', ToastAndroid.SHORT)
      }).catch((error) => {
        console.log(error)
        this.setState({
          isLoading: false
        })
      });
    this.setState({
      isLoading: false
    })
  }

  __renderBtnRegister() {
    if (this.state.isLoading) {
      return (
        <>
          <Spinner color='#00c300' />
        </>
      )
    } else {
      return (
        <TouchableOpacity style={styles.btnRegister} onPress={() => this.handleRegister()}>
          <Text style={{ fontSize: 20, paddingVertical: 8, textAlign: 'center', color: '#ffff', fontWeight: 'bold' }}>REGISTER</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#0f2434" style={{ display: 'none' }}>
        </Header>
        <Content>
          <View style={styles.contentLogin}>
            <Text style={styles.textRegister}>REGISTER</Text>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Username</Label>
              <Input
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username} />
            </Item>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Email</Label>
              <Input
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
            </Item>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Phone</Label>
              <Input
                onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                value={this.state.phoneNumber} />
            </Item>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password} />
            </Item>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Confirm Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(confirm_password) => this.setState({ confirm_password })}
                value={this.state.confirm_password} />
            </Item>
            {this.__renderBtnRegister()}
            <View>
              <Text style={{ textAlign: 'center' }}>OR</Text>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{ fontSize: 20, paddingVertical: 8, textAlign: 'center', color: '#00c300', fontWeight: 'bold' }}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentLogin: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  textRegister: {
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#00c300'
  },
  btnRegister: {
    backgroundColor: '#00c300',
    marginTop: 25,
    marginBottom: 7,
    borderRadius: 3,
    elevation: 2
  },
  btnLogin: {
    backgroundColor: '#eaeaea',
    marginTop: 7,
    marginBottom: 25,
    borderRadius: 3,
    elevation: 2
  }
})

export default Register