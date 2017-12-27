/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from './webservices/webservices'
import { Colors } from 'miReact/src/commons'

/*********************** CONST *************************/
import HousesList from './sections/houses/HousesList';
import CharacterList from './sections/characters/CharacterList';
import CharacterView from './sections/characters/CharacterView';
import CharacterNew from './sections/characters/CharacterNew';
/********************************************************/

/***************************** REDUX ********************************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

// Importamos nuestros reducers (Como tengo el index, no hace falta la ruta completa)
import * as reducers from './redux/reducers'
const reducer = combineReducers(reducers) //combinamos los reducers
const store = createStore( //Creamos el store con nuestros reducers y el middleware
  reducer,
  applyMiddleware(thunk)
)
/********************************************************************/

export default class App extends Component {

  componentWillMount() {
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // iOS StatusBar light style
  }

  renderAddCharacterButton(){
    return (
      <TouchableOpacity style = {styles.addButton} onPress={() => Actions.CharacterNew()}>
        <Text style = {styles.addButtonText}>{'Añadir'}</Text>
      </TouchableOpacity>
    )
  }

  render() {

    return (
      <Provider store = { store } >
        <Router>
          <Scene key="root">
            <Scene
              key = { 'HousesList' }
              component = { HousesList }
              hideNavBar
            />
            <Scene
              key = { 'CharacterList'}
              component = { CharacterList }
              navigationBarStyle = {styles.navBar}
              navBarButtonColor = {'white'}
              renderRightButton = { this.renderAddCharacterButton() }
            />
            <Scene
              key = { 'CharacterView'}
              component = { CharacterView }
              navigationBarStyle = {styles.navBar}
              navBarButtonColor = {'white'}  
            />
            <Scene
              key = { 'CharacterNew'}
              component = { CharacterNew }
              navigationBarStyle = {styles.navBar}
              navBarButtonColor = {'white'} 
              title = {'Añadir'}
            />

          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Colors.navBar
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  addButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
