import * as types from '../types/houses'
import { fetch, post } from 'miReact/src/webservices/webservices'

// Función que devuelve el action que actualiza
function updateHousesList(value) {
    return {
        type: types.HOUSES_UPDATE_LIST,
        value: value
    }
}

function setHousesFetching(value) {
    return {
        type: types.HOUSES_SET_FETCHING,
        value: value
    }
}

export function updateHouseSelected(value) {
    console.log('updateHouseSelected value: ', value)
    return {
        type: types.HOUSES_UPDATE_HOUSE,
        value
    }
}

// Función que carga del WS el listado
export function fetchHousesList() {
    return (dispatch, getState) => {
        
        // Ponemos setHousesFetching a true, ya que está cargando
        dispatch(setHousesFetching(true))

        fetch('/casas').then( response => {
            // Aqui ya ha cargado, lo ponemos a false
            dispatch(setHousesFetching(false))

            console.log("fetch response: ", response)
            const list = response.records
            dispatch(updateHousesList(list))            
        }).catch( error => {
            console.log("error: ", error)
        })
    }
}

