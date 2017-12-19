import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Button, TouchableOpacity, ActivityIndicator} from 'react-native';
import { AsyncCalls, Colors } from 'miReact/src/commons'
import HousesCell from './HousesCell'

// REDUX imports
import { connect } from 'react-redux'
import * as HousesActions from 'miReact/src/redux/actions/houses'

class HousesList extends Component {

  componentWillMount() {
      this.props.fetchHousesList()
  }

  onSelect(house) {
      this.props.updateSelected(house)
  }

  renderFooter(){
    // devuelve un Act.Indicator que se anima si la prop isFetching es true
    return <ActivityIndicator animating={this.props.isFetching} size='large' color='grey'/>
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
    console.log('this.props.list: ', this.props.list)
      return(
        <View style={styles.container}>

          <FlatList
            data = { this.props.list }
            ListFooterComponent = {() => this.renderFooter()}
            renderItem = { ({ item, index }) => this.renderItem(item, index) }
            keyExtractor = {( item, index ) => item.id }
            extraData = { this.state }
            numColumns = { 2 }
          />
        </View>
      )
  }
}

const mapStateToProps = (state) => {
  //console.log("state: ", state)
  return {
    // devolvemos el list del reducer houses del estado
    list: state.houses.list,
    selected: state.houses.item,
    isFetching: state.houses.isFetching
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchHousesList: () => {
      dispatch(HousesActions.fetchHousesList())
    },

    updateSelected: (house) => { 
      dispatch(HousesActions.updateHouseSelected(house))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HousesList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(42,42,42)',
    paddingVertical: 30
  }
});
