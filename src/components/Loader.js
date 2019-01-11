import React, { Fragment } from 'react'
import '../css/Loader.css'

const Loader = props => {
  return (
    <Fragment>
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
      <div className={`loader-bg ${props.theme}`} />
    </Fragment>
  )
}

export default Loader
