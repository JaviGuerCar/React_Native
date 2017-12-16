import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { AsyncCalls, Colors } from 'miReact/src/commons'
import { fetchAlternativo } from 'miReact/src/webservices/webservices'

export default class HousesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      selected: null
    }
  }

  componentWillMount() {
      fetchAlternativo('/casas').then( response => {
          console.log("fetch response: ", response)
          this.setState({ list: response.records })
      }).catch( error => {
          console.log("error: ", error)
      })
    }

  checkIsSelected(item){
    if(this.state.selected && (this.state.selected.id == item.id)){
      return true
    } else {
      return false
    }
  }

  renderItem(item, index){
    const isSelected = this.checkIsSelected(item)
    const cellStyle = isSelected ? { backgroundColor: 'pink'} : {backgroundColor: 'grey'}
    const titleStyle = isSelected ? { color: 'grey'} : {color: 'black'}
    const botonStyle = isSelected ? 'grey' :  'black'

    return (
      <View style={[styles.cell, cellStyle]}>
        <Text style={titleStyle}>{ item.nombre }</Text>
        <Text style={titleStyle}>{ item.lema }</Text>

        <TouchableOpacity style={styles.button} 
          onPress = { () => this.setState({ selected: item }) }>
          <Text style={styles.buttonText}>{'Seleccionar casa'}</Text>
        </TouchableOpacity>

      </View>
    )
  }

  render() {
      const nombre = this.state.selected ? this.state.selected.nombre : ''

      return(
        <View style={styles.container}>

          <Text style= {styles.title} > { nombre }</Text>
          <FlatList
            data = { this.state.list }
            renderItem = { ({ item, index }) => this.renderItem(item, index) }
            keyExtractor = {( item, index ) => item.id }
            extraData = { this.state }
          />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cell: {
    height: 100,
    marginVertical: 10,
    padding: 10
  },
  title: {
    fontSize : 20,
    textAlign: 'center',
    marginVertical: 20
  },
  button: {
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 6,
    borderRadius: 6
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  }
});
