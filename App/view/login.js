import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';
import AppStyles from '../style';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: "a@test.com",
      // password: "123456",
      username: "",
      password: "",
    };
  }

  _handleChangeUsername(text) {
    this.setState({username: text});
  }

  _handleChangePassword(text) {
    this.setState({password: text});
  }

  _handleLoginProcess = () => {
    const { username, password } = this.state;
    this.props.onLoginPress(username, password);
  }

  _handleSingupProcess = () => {
    const { username, password } = this.state;
    this.props.onSignupPress(username, password);
  }

  render() {
    console.log(AppStyles);

      return (
          <View style={AppStyles.container}>
            <Text style={{fontSize: 27}}>
                Login
            </Text>
            <TextInput
              placeholder='Username' value={this.state.username}
              onChangeText={(text) => this._handleChangeUsername(text)} />
            <TextInput
              placeholder='Password'
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(text) => this._handleChangePassword(text)} />
            <View style={{margin:7}} />
            <Button
              onPress={this._handleSingupProcess}
              title="회원가입"
              color="#841584"
              accessibilityLabel="This sounds great!" />
            <View style={{margin:7}} />
            <Button
              onPress={this._handleLoginProcess}
              title="로그인" />
          </View>
      )
  }
}
