import { connect } from 'react-redux'
import { Products } from 'ATCOMMON'

import { baseIMGURL } from '../../../config'

const mapStateToProps = (state) => ({
    searchResult: state.search.searchResult,
    baseIMGURL
})


export default connect(mapStateToProps, null)(Products)
