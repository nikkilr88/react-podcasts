import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import '../css/Loader.css'

const Loader = ({ theme }) => {
  return <div className={`loader ${theme}`} />
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(Loader)
