import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Screen1 extends Component {

  _goScreen2() {
      Actions.screen2({ texto: 'Texto de prueba'})
  }
  render() {
    return (

      <View style={styles.container}>
          <Text style={styles.texto}>Primera Pantalla</Text>
          <Button
            onPress={ () => this._goScreen2() }
            title="Ir a la pantalla 2"
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF',
   },
   texto: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'red'
  },
});
