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
  Grid,
  Col,
  Row,
  Item,
  Label,
  Input,
  Spinner
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from "firebase"

class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phoneNumber: '',
      status: '',
      isLoading: false
    }
  }

  async componentDidMount() {
    await this.getUserData()
  }

  async getUserData() {
    const userCollection = 'users/' + firebase.auth().currentUser.displayName
    await firebase.database().ref(userCollection).once('value', (data) => {
      this.setState({
        username: data.val().username,
        phoneNumber: data.val().phoneNumber,
        status: data.val().status
      })
    })
  }

  async updateProfile() {
    this.setState({
      isLoading: true
    })

    const userCollection = 'users/' + firebase.auth().currentUser.displayName
    await firebase.database().ref(userCollection).update({
      status: this.state.status,
      phoneNumber: this.state.phoneNumber,
      username: this.state.username
    })
    this.setState({
      isLoading: false
    })
    ToastAndroid.show('Profile Successfully Updated!', ToastAndroid.SHORT)
  }

  __renderButtonEditProfile() {
    if (this.state.isLoading) {
      return (
        <>
          <Spinner color='#00c300' />
        </>
      )
    } else {
      return (
        <TouchableOpacity style={styles.btnEditProfile} onPress={() => this.updateProfile()}>
          <Text style={{ color: '#ffff', fontSize: 18 }}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <Container>
        {console.log(this.state.phoneNumber)}
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
                  <Text style={{ color: '#ffff', fontSize: 20 }}>Edit Profile</Text>
                </Col>
              </Row>
            </Grid>
          </View>
        </Header>
        <Content>
          <View style={styles.contentEditProfile}>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input
                style={{ color: '#252d39' }}
                placeholder={'Username'}
                value={this.state.username}
                onChangeText={(val) => this.setState({ username: val })} />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input
                style={{ color: '#252d39' }}
                placeholder={'Phone'}
                value={this.state.phoneNumber}
                onChangeText={(val) => this.setState({ phoneNumber: val })} />
            </Item>
            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label>Status</Label>
              <Input
                style={{ color: '#252d39' }}
                placeholder={'Status'}
                value={this.state.status}
                onChangeText={(val) => this.setState({ status: val })} />
            </Item>
            {this.__renderButtonEditProfile()}
          </View>
        </Content>
      </Container >
    );
  }
}

const styles = StyleSheet.create({
  contentEditProfile: {
    paddingVertical: 25,
    paddingHorizontal: 15
  },
  btnEditProfile: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#07bf3f',
    elevation: 3
  }
})

export default EditProfile