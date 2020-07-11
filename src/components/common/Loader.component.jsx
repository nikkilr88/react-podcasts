import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

// Styles
import { StyledLoader } from './Loader.styles'

const Loader = () => {
  const currentTheme = useContext(ThemeContext)

  return <StyledLoader theme={currentTheme} />
}

export default Loader
