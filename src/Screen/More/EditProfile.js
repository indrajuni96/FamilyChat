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
  Item,
  Label,
  Input
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as firebase from "firebase"

class EditProfile extends Component {
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
              <Input style={{ color: '#252d39' }} defaultValue={firebase.auth().currentUser.displayName} />
            </Item>
            <Item stackedLabel>
              <Label>Phone</Label>
              <Input style={{ color: '#252d39' }} defaultValue="+82 003 843 234" />
            </Item>
            <Item stackedLabel style={{ marginTop: 10 }}>
              <Label>Email</Label>
              <Input style={{ color: '#252d39' }} defaultValue={firebase.auth().currentUser.email} />
            </Item>

            <TouchableOpacity style={styles.btnEditProfile} onPress={() => alert('Edit Profile')}>
              <Text style={{ color: '#ffff', fontSize: 18 }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
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