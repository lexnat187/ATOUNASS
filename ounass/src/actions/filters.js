import 'whatwg-fetch'
import {
  GET_FILTER_REQUEST,
  GET_FILTER_SUCCESS,
  GET_FILTER_FAILURE
} from './types'

const baseURL = 'http://localhost:3003/'
const brand = 'ounassfacets'

function getFilterRequest () {
  return {
    type: GET_FILTER_REQUEST,
    isFetching: true
  }
}

function getFilterSuccess (result) {
  return {
    type: GET_FILTER_SUCCESS,
    isFetching: false,
    filterResult: result
  }
}

function getFilterFailure (message) {
  return {
    type: GET_FILTER_FAILURE,
    isFetching: false,
    error: message
  }
}

export function getFilters ()  {
  return (dispatch, getState) => {
    dispatch(getFilterRequest())

    //localhost:3003/search/ounasssearch
    // try{
    //     let response = fetch(
            // `${baseURL}search/${brand}`,
            // {
            //     Method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }
    //     )
    //     let resJson = response.json()
    //     dispatch(getFilterSuccess(resJson))
    // } catch(error) {
    //     console.log('ERROR' + error)
    //     dispatch(getFilterFailure(error))
    // }

    
    return fetch( `${baseURL}search/${brand}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
      .then(
        response => response.json(),
        error => dispatch(getFilterFailure(error)) 
      )
      .then(json =>
            dispatch(getFilterSuccess(json))
      )

    // return dispatch(fetch(
    //     `${baseURL}search/${brand}`,
    //     {
    //         Method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    // ))
    //   .then(result => {
    //     dispatch(getFilterSuccess(result))
    //   })
    //   .catch(err => dispatch(getFilterFailure(err))
    // )
  }
}
