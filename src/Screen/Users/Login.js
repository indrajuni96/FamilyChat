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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from "firebase"

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }

  handleLogin() {

    this.setState({
      isLoading: true
    })

    const { email, password } = this.state

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (result) => {
        // Navigate to the Friend page
        this.props.navigation.replace('Friend')
        ToastAndroid.show('Logged in!', ToastAndroid.SHORT)
      })
      .catch((error) => {
        // alert('Email or Password Invalid')
        ToastAndroid.show('Email or Password Invalid', ToastAndroid.SHORT)
        console.log(error)
        this.setState({
          isLoading: false
        })
      })
  }

  __renderBtnLogin() {
    if (this.state.isLoading) {
      return (
        <>
          <Spinner color='#00c300' />
        </>
      )
    } else {
      return (
        <TouchableOpacity style={styles.btnRegister} onPress={() => this.handleLogin()}>
          <Text style={{ fontSize: 20, paddingVertical: 8, textAlign: 'center', color: '#ffff', fontWeight: 'bold' }}>LOGIN</Text>
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
            <Text style={styles.textLogin}>LOGIN</Text>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Email</Label>
              <Input
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
            </Item>
            <Item floatingLabel style={{ marginVertical: 7 }}>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password} />
            </Item>

            {this.__renderBtnLogin()}

            <View>
              <Text style={{ textAlign: 'center' }}>OR</Text>
            </View>
            <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={{ fontSize: 20, paddingVertical: 8, textAlign: 'center', color: '#00c300', fontWeight: 'bold' }}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Log in Facebook')}>
              <Text style={{ marginVertical: 15 }}>
                <FontAwesome style={[{ color: '#3b5998' }]} size={25} name={'facebook-square'} /> Log in with Facebook
            </Text>
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
  textLogin: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 35,
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

export default Login