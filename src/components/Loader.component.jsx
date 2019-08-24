import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import '../css/Loader.styles.css'

const Loader = ({ theme }) => {
  return <div className={`loader ${theme}`} />
}

const mapStateToProps = state => ({
  theme: state.settings.theme
})

export default connect(mapStateToProps)(Loader)
