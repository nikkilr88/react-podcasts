import React, { Fragment } from 'react'
import { connect } from 'react-redux'

// Data
import themes from '../../themes'

// Styles
import { StyledLoader } from './Loader.styles'

const Loader = ({ theme }) => <StyledLoader theme={themes[theme]} />

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps)(Loader)
