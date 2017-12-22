import React, {Component} from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class CharacterCell extends Component {
    
    static defaultProps = {
        item: {},
        onSelect: () => {},
    }

    render(){

        const { item, onSelect } = this.props
        const nombre = item.nombre ? item.nombre : ''
        const edad = item.edad ? item.edad : ''
        const image = item.image_dir ? { uri: item.image_dir } : null

        return(
            <TouchableOpacity onPress={ () => onSelect(item)}>
                <Image source={ image } style={ styles.imageStyle } resizeMode={'cover'}/>
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{ nombre } </Text> 
                    <Text style={styles.age}>{ edad } </Text> 
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
       width: '100%',
       height: 200
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(100,100,100,0.5)'        
    },
    name: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    age: {
        fontSize: 16,
        color: 'white'
    },
})