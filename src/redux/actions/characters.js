import * as types from '../types/characters'
import { fetch, post, remove } from 'miReact/src/webservices/webservices'
import { Actions } from 'react-native-router-flux'

// Función que devuelve el action que actualiza
function updateCharactersList(value) {
    return {
        type: types.CHARACTERS_UPDATE_LIST,
        value: value
    }
}

function setCharactersFetching(value) {
    return {
        type: types.CHARACTERS_SET_FETCHING,
        value: value
    }
}

export function updateCharacterSelected(value) {
    //console.log('updateCharacterSelected value: ', value)
    return {
        type: types.CHARACTERS_UPDATE_CHARACTER,
        value
    }
}

// Función que carga del WS el listado
export function fetchCharacterList(houseId) {
    return (dispatch, getState) => {
        
        // Ponemos setCharactersFetching a true, ya que está cargando
        dispatch(setCharactersFetching(true))
        dispatch(updateCharactersList([]))
        
        // Podemos obtener el state de aquí o del MapStatetoProps
        // const state = getState()
        // houseId = state.houses.item ? state.houses.item.id : null
        const fetchURL = '/personajes?casa=' + houseId

        fetch(fetchURL).then( response => {
            // Aqui ya ha cargado, lo ponemos a false
            dispatch(setCharactersFetching(false))
            console.log("fetchCharacterList response: ", response)
            const list = response.records
            dispatch(updateCharactersList(list)) // Actualizamos el reducer con el listado           
        }).catch( error => {
            console.log("fetchCharacterList error: ", error)
            dispatch(setCharactersFetching(false))
        })
    }
}

// Función eliminar character
export function deleteCharacter(character){
    return (dispatch, getState) => {
        dispatch(setCharactersFetching(true))
        const state = getState()
        const house = state.houses.item

        const fetchURL = '/personajes/' + character.id
        remove(fetchURL).then( response => {
            // Aqui ya ha cargado, lo ponemos a false
            dispatch(setCharactersFetching(false))
            console.log("deleteCharacter response: ", response)
             
            if (response.status && response.status == 'ok') {
                dispatch(fetchCharacterList(house.id))
                dispatch(updateCharacterSelected(null))
                Actions.pop()
            }
            
        }).catch( error => {
            console.log("deleteCharacter error: ", error)
            dispatch(setCharactersFetching(false))
        })

    }
}

export function postCharacter(data) {
    return (dispatch, getState) => {

        dispatch(setCharactersFetching(true))
        const state = getState()
        const house = state.houses.item

        const fetchUrl = '/personajes'
        post(fetchUrl, data).then( response => {

            dispatch(setCharactersFetching(false))
            console.log("postCharacter response: ", response)

            if (response.record) {
                dispatch(fetchCharactersList(house.id))
                dispatch(updateCharacterSelected(null))
                Actions.pop()
            }

        }).catch( error => {
            dispatch(setCharactersFetching(false))
            console.log("postCharacter error: ", error)
        })
    }
} 