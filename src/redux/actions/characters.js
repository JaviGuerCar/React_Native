import * as types from '../types/characters'
import { fetch, post } from 'miReact/src/webservices/webservices'

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
    console.log('updateCharacterSelected value: ', value)
    return {
        type: types.CHARACTERS_UPDATE_HOUSE,
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