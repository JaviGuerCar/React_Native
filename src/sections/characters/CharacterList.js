import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Colors } from 'miReact/src/commons'

// Importamos la Celda
import CharacterCell from './CharacterCell'

// REDUX imports
import { connect } from 'react-redux'
import * as CharactersActions from 'miReact/src/redux/actions/characters'


class CharacterList extends Component {

    componentWillMount() {
        const houseId = this.props.house ? this.props.house.id : null
        this.props.fetchCharacterList(houseId)
    }

    onSelect(character) {
        this.props.updateSelected(character)
      }

    renderItem(item, index){
        return (
            <CharacterCell
                item = { item }
                onSelect = { (character) => this.onSelect(character) }
            />
        )
    }
    
    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data = { this.props.list }
                    renderItem = {({item, index}) => this.renderItem(item, index)}
                    keyExtractor = { (item, index) => index}
                    extraData = { this.props }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        house: state.houses.item,
        list: state.characters.list
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharacterList: (houseId) => {
            dispatch(CharactersActions.fetchCharacterList(houseId))
          },

          updateSelected: (character) => {
              console.log('updateSelected character', character)
            // dispatch(HousesActions.updateHouseSelected(character))
            // Actions.CharacterList( {title: house.nombre} )
          }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterList)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background
    }
  });