import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import { AsyncCalls, Colors } from 'miReact/src/commons'
import { fetchAlternativo } from 'miReact/src/webservices/webservices'
import HousesCell from './HousesCell'

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

  onSelect(house) {
    console.log("house: ", house)
    this.setState({ selected: house })
  }

  renderItem(item, index){
    return (
      <HousesCell 
        item = { item }
        onSelect = { (house) => this.onSelect(house)}  
      />
    )
  }

  render() {
      return(
        <View style={styles.container}>

          <FlatList
            data = { this.state.list }
            renderItem = { ({ item, index }) => this.renderItem(item, index) }
            keyExtractor = {( item, index ) => item.id }
            extraData = { this.state }
            numColumns = { 2 }
          />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(42,42,42)',
    paddingVertical: 30
  }
});
