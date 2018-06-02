import 'whatwg-fetch'
import {
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAILURE
} from './types'

const baseURL = 'http://localhost:3003/'
const brand = 'ounasssearch'

function getSearchRequest (search, colour) {
  return {
    type: GET_SEARCH_REQUEST,
    searchQuery: search,
    searchFilter: colour,
    isFetching: true
  }
}

function getSearchSuccess (result) {
  return {
    type: GET_SEARCH_SUCCESS,
    isFetching: false,
    searchResult: result
  }
}

function getSearchFailure (message) {
  return {
    type: GET_SEARCH_FAILURE,
    isFetching: false,
    error: message
  }
}

export function search (search, colour)  {
  return (dispatch, getState) => {
    dispatch(getSearchRequest(search))

    const payload = {
      search,
      colour
    }

    let myHeaders = new Headers()

    myHeaders.append('Content-Type', 'application/json')

    return fetch( `${baseURL}search/${brand}`,
      {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(payload)
      })
      .then(
        response => response.json(),
        error => dispatch(getSearchFailure(error))
      )
      .then(json => dispatch(getSearchSuccess(json))
      )
  }
}
