import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button} from 'react-native';
import { AsyncCalls, Colors } from 'miReact/src/commons'

export default class HousesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      selected: null
    }
  }

  componentWillMount() {
    return AsyncCalls.fetchHousesList().then(response => {
        this.setState({ list: response })
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

        <Button
          title={'Seleccionar casa'}
          onPress = { () => this.setState({ selected: item }) }
          color = { botonStyle }
        />
      </View>
    )
  }

  render() {
      const nombre = this.state.selected ? this.state.selected.nombre : ''

      return(
        <View>

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
  cell: {
    height: 100,
    marginVertical: 10,
    padding: 10
  },
  title: {
    fontSize : 20,
    textAlign: 'center',
    marginVertical: 20
  }
});
