import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Styles
import '../css/BackButton.styles.css'

class BackButton extends Component {
  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { theme } = this.props
    const path = this.props.location.pathname

    return path !== '/' ? (
      <button className={`BackButton ${theme}`} onClick={this.goBack}>
        <i className="fas fa-arrow-left" /> Back
      </button>
    ) : (
      ''
    )
  }
}

const mapStateToProps = state => ({
  theme: state.settings.theme
})

export default withRouter(connect(mapStateToProps)(BackButton))
