import * as types from '../types/houses'
import { fetch, post } from 'miReact/src/webservices/webservices'

// Función que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value: value
    }
}

// Función que carga del WS el listado
export function fetchHousesList() {
    return (dispatch, getState) => {
        
        fetch('/casas').then( response => {
            console.log("fetch response: ", response)
            const list = response.records
            dispatch(updateHousesList(list))            
        }).catch( error => {
            console.log("error: ", error)
        })
    }
}