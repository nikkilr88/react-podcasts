import React from 'react'
import { connect } from 'react-redux'
import { switchTheme } from '../actions/settings'

// Styles
import '../css/SettingsPage.styles.css'

const SettingsPage = ({ theme: currentTheme, switchTheme }) => {
  const themeOptions = ['light', 'dark', 'black']

  const handleChange = event => {
    switchTheme(event.target.value)
  }

  // TODO: Make accessible!!!
  const themeRadioButtons = themeOptions.map(theme => (
    <label className={`Setting-radio Setting-radio-${theme}`} key={theme}>
      {theme}
      <input
        type="radio"
        name="theme"
        value={theme}
        onChange={handleChange}
        checked={theme === currentTheme}
      />
      <span className="checkmark" />
    </label>
  ))
  return (
    <div className={`SettingsPage ${currentTheme}`}>
      <div className="SettingsPage-setting">
        <h2 className="Setting-title">Theme</h2>
        {themeRadioButtons}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  theme: state.settings.theme,
})

export default connect(mapStateToProps, { switchTheme })(SettingsPage)
