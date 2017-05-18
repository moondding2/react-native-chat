import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Button,
  AppState
} from 'react-native';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';
import PushNotification from 'react-native-push-notification';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }

  isBackground = false;

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);

    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },
    });

    let ref = firebase.database().ref('chat_msg');

    let oldMessage = [];
    let tmpObj = null;
    ref.orderByChild('timestamp').once('value', (snapshot) => {
      snapshot.forEach(function(child) {
          tmpObj = {
            _id: child.key,
            text: child.val().messages.text,
            createdAt: new Date(child.val().createdAt),
            timestamp: child.val().timestamp,
            user: {
              _id: child.val().messages.user._id,
              name: 'React Native',
              avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
          };

          oldMessage.push(tmpObj);
      });

      this.setState({
        isFetching: true,
        messages: oldMessage
      });
    });

    ref.on('child_added', (data) => {
      if ( !this.state.isFetching ) return;

      let msgObj = data.val().messages;
      let message = {
        _id: msgObj._id,
        text: msgObj.text,
        user: {
          _id: msgObj.user._id,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        createdAt: new Date(data.val().createdAt)
      };

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    this.setState({
      isFetching: false
    })
  }

  handleAppStateChange = (appState) => {
    console.log("appState ===> ", appState);

    if ( appState === 'background' ) {
      this.isBackground = true;
    } else {
      this.isBackground = false;
    }
  }

  onSend(messages = []) {
    let ref = firebase.database().ref('chat_msg');
    let now = new Date().getTime();

    ref.push({
      messages: messages[0],
      createdAt: now,
      timestamp: 9999999999999 - new Date().getTime()
    }).then(() => {
       if ( this.isBackground ) {
         // 앱이 닫혀 있는 경우에만 push를 보낸다.
         PushNotification.localNotificationSchedule({
           message: messages[0].text,
           date: new Date(Date.now() + (1 * 1000))
         });
       }
    });
  }

  render() {
    const { messages } = this.state;

    let user = firebase.auth().currentUser;
    let uid = null;
    if ( user !== undefined && user !== null ) {
      uid = user.uid;
    }

    return (
        <GiftedChat
          messages={messages}
          onSend={this.onSend}
          user={{
            _id: uid,
          }}
          isAnimated={true} />
    );
  }
}
