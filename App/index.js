import React, { Component } from 'react';
import DismissKeyboard from "dismissKeyboard";
import Firebase from './include/firebase';
import * as firebase from 'firebase';
import Login from './view/login';
import Chat from './view/chat';


export default class Home extends Component {
  constructor(props) {
    super(props);
    Firebase.initialise();
  }

  state = {
    isLoggedIn: false,
    response: '',
  }

  // 회원가입
  signup = (username, password) => {
    DismissKeyboard();

    firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => {
          this.setState({
              isLoggedIn: true,
              response: "account created"
          });
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
  }

  // 로그인
  login = (username, password) => {
    DismissKeyboard();

    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(
        () => {
          this.setState({
            isLoggedIn: true,
            response: "Logged In!"
          });
        }
      )
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  // 로그아웃
  logout = () => {
    DismissKeyboard();

    try {
        firebase.auth().signOut();
        this.setState({
          isLoggedIn: false,
          response: "Logged Out!"
        });
    } catch (error) {
        this.setState({
            response: error.toString()
        })
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return(
        <Chat onLogoutPress={this.logout} />
      );
    } else {
      return(
        <Login
          onSignupPress={this.signup}
          onLoginPress={this.login} />
      );
    }
  }

}
