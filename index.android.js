/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Example from './client/index';
//import Example from './client/index2';
//import MessengerContainer from './client/index3';

//AppRegistry.registerComponent('chat', () => chat);
AppRegistry.registerComponent('chat', () => Example);
//AppRegistry.registerComponent('chat', () => MessengerContainer);
