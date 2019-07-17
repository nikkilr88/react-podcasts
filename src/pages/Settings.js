import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switchTheme } from '../actions/theme'

import '../css/SettingsPage.styles.css'

class SettingsPage extends Component {
  handleChange = e => {
    this.props.switchTheme(e.target.value)
  }

  render() {
    const { theme } = this.props
    const themes = ['light', 'dark', 'black']

    const themeRadioButtons = themes.map(theme => (
      <label className={`Setting-radio Setting-radio-${theme}`} key={theme}>
        {theme}
        <input
          type='radio'
          name='theme'
          value={theme}
          onChange={this.handleChange}
          checked={theme === this.props.theme}
        />
        <span className='checkmark' />
      </label>
    ))
    return (
      <div className={`SettingsPage ${theme}`}>
        <div className='SettingsPage-setting'>
          <h2 className='Setting-title'>Theme</h2>
          {themeRadioButtons}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
})

export default connect(
  mapStateToProps,
  { switchTheme }
)(SettingsPage)
