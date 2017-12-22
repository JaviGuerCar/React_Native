import React, { Component } from 'react'
import { TouchableOpacity, Image, StyleSheet, Dimensions, Platform } from 'react-native'

export default class HousesCell extends Component { 
    
    // Propiedades por defecto, sirven para evitar fallos y documentar el comp.
    static defaultProps = {
        onSelect    : () => {},
        item        : {},
    }

    render() {
        //console.log("this.props", this.props)
        const item = this.props.item
        const onSelect = this.props.onSelect

        const image = item.image_dir ? { uri: item.image_dir } : null
        
        return (
            <TouchableOpacity style={styles.container} onPress = { () => onSelect(item) }>
                <Image source={image} style={styles.imageStyle} resizeMode={'cover'}/>
            </TouchableOpacity>
        )
    } 
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: Dimensions.get('window').width / 2 - 20, //857x600px,
        height: (Dimensions.get('window').width /2 -20) * (857/600),

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(255,255,255,0.1)',
                shadowOpacity: 1,
                shadowOffset: {height:4, width:4},
                shadowRadius: 2
            },
            android: {
                elevation: 4,
            }
        })
    },
    imageStyle: {
       position: 'absolute',
       top: 0,
       bottom:0,
       right: 0,
       left: 0
    }
})