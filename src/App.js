/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import HousesList from './sections/houses/HousesList';
import * as webservices from './webservices/webservices'

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
  }

  render() {

    return (
      <Router>
        <Scene key="root">
          <Scene
            key = { 'HousesList' }
            component = { HousesList }
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({

});
