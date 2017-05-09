import React, { Component } from 'react';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);

    firebase.initializeApp({
        apiKey: "AIzaSyAW-9X4h-r3OQ3ZIRINZyvlIZIgAnbWyWs",
        authDomain: "test1-ecf53.firebaseapp.com",
        databaseURL: "https://test1-ecf53.firebaseio.com",
        projectId: "test1-ecf53",
        storageBucket: "test1-ecf53.appspot.com",
        messagingSenderId: "495012802420"
    });
  }

  componentWillMount() {
    let ref = firebase.database().ref('chat_msg');

    ref.once('value', function(snapshot) {
      let obj = snapshot.val();
      Object.keys(obj).forEach(function(key) {
        console.log(">>> ", key, obj[key]);
      });
    });

    this.setState({
      messages: [
        {
          _id: 1,
          text: '안뇽 바보야',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  componentDidMount() {
    console.log("qqqq");

  }


  _handleShowData(data) {
    console.log(data);
  }

  onSend(messages = []) {
    //const {currentUser} = firebase.auth();

    let msgObj = messages[0];

console.log(msgObj);
console.log(typeof msgObj.text);
console.log(typeof msgObj.createdAt);

    let ref = firebase.database().ref('chat_msg');

    this.setState((previousState) => {
      ref.push({
        message : msgObj.text,
        message2: msgObj.text,
        createdAt: msgObj.createdAt.toString(),
      })
         .then(() => {
           console.log("ok");

            ref.on('child_added', function(data) {
              console.log(data);
      //      addCommentElement(postElement, data.key, data.val().text, data.val().author);
            });
        });

      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
