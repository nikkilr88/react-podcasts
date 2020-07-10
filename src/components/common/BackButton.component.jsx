import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Data
import themes from '../../themes'

// Styles
import { StyledBackButton } from './BackButton.styles'

const BackButton = ({ history, theme, location: { pathname } }) => {
  const goBack = () => {
    history.goBack()
  }

  return pathname !== '/' ? (
    <StyledBackButton theme={themes[theme]} onClick={goBack}>
      <i className="fas fa-arrow-left" /> Back
    </StyledBackButton>
  ) : null
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default withRouter(connect(mapStateToProps)(BackButton))
