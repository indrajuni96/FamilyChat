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
  Button,
  Icon,
  Text,
  Input,
  Item,
  Grid,
  Col,
  Row
} from 'native-base';
class Example extends Component {
  state = { name: '' }

  onPress = () => this.props.navigation.navigate('ChatRoom', { name: this.state.name })

  onChangeText = (name) => this.setState({ name })

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#252f4a' }} androidStatusBarColor='#202a43' noShadow={true}>
          <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 7 }}>
            <Text style={{ color: '#ffff', fontSize: 20 }}>More</Text>
          </View>
        </Header>
        <Content>
          <Grid style={{ marginLeft: 20, marginTop: 20 }}>
            <Row>
              <Text style={{ fontSize: 20 }}>Enter your name :</Text>
            </Row>
            <Row>
              <Col>
                <Item style={{ borderColor: 'transparent' }} >
                  <Icon active name='search' style={{ color: '#6f7687' }} />
                  <Input
                    placeholder='Search'
                    placeholderTextColor="#6f7687"
                    style={{ color: '#6f7687', height: 40 }}
                    onChangeText={this.onChangeText}
                    value={this.state.name}
                  />
                </Item>
              </Col>
            </Row>
            <Row>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ChatRoom', { name: this.state.name })}>
                <Text style={{ fontSize: 20 }}>Next</Text>
              </TouchableOpacity>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Example