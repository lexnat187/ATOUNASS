import {GET_FILTER_REQUEST, GET_FILTER_SUCCESS, GET_FILTER_FAILURE} from '../actions/types'

// The search reducer.
export default function filters (state = {}, action) {
  switch (action.type) {
    case GET_FILTER_REQUEST:
      return Object.assign({}, state, {
        error: '', searchText: 'Please wait...', filterResult: {}
      })
    case GET_FILTER_SUCCESS:
      return Object.assign({}, state, {
        error: '', searchText: '', filterResult: JSON.parse(action.filterResult)
      })
    case GET_FILTER_FAILURE:
      return Object.assign({}, state, {
        error: action.error, searchText: 'No results available at this time.', filterResult: {}
      })
    default:
      return state
  }
}
