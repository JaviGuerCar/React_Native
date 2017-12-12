import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Screen2 extends Component{

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Pantalla 2</Text>
        <Text>{ this.props.texto }</Text>
        <Text>Que maravilla React</Text>
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
    color: 'blue'
  },
});
