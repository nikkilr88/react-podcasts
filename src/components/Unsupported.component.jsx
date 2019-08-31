import React, { Component } from 'react'

import '../css/Unsupported.styles.css'

class Unsupported extends Component {
  render() {
    return (
      <div className="Unsupported-bg">
        <div className="Unsupported-box">
          <div className="Unsupported-icon-wrapper">!</div>
          <h1>Uh-oh!</h1>
          <p>It looks like you're using an unspported browser.</p>
          <small>
            How about <a href="https://www.google.com/chrome/">Chrome</a> or{' '}
            <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a>?
          </small>
        </div>
      </div>
    )
  }
}

export default Unsupported
