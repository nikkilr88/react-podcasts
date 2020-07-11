import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

// Styles
import { StyledBackButton } from './BackButton.styles'

const BackButton = ({ history, location: { pathname } }) => {
  const currentTheme = useContext(ThemeContext)

  const goBack = () => {
    history.goBack()
  }

  return pathname !== '/' ? (
    <StyledBackButton theme={currentTheme} onClick={goBack}>
      <i className="fas fa-arrow-left" /> Back
    </StyledBackButton>
  ) : null
}

export default withRouter(BackButton)
