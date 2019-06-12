import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import '../css/Loader.css'

const Loader = props => {
  return (
    <Fragment>
      <div className='loader-wrapper'>
        <div className='loader' />
      </div>
      <div className={`loader-bg ${props.theme}`} />
    </Fragment>
  )
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(mapStateToProps)(Loader)
