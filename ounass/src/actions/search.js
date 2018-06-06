import 'whatwg-fetch'
import {
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAILURE
} from './types'

import { baseAPIURL, brandSearch } from '../config'


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

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function search (search, colour)  {
  return async (dispatch, getState) => {
    dispatch(getSearchRequest(search, colour))
    
    const payload = {
      search: toTitleCase(search),
      colour: toTitleCase(colour)
    }

    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    try {
      let response = await fetch( `${baseAPIURL}search/${brandSearch}`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(payload)
      })
      let responseJson = await response.json()
      dispatch(getSearchSuccess(responseJson))
    } catch (error) {
      dispatch(getSearchFailure(error))
    }
  }
}
