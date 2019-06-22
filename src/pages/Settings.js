import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switchTheme } from '../actions/theme'
import '../css/SettingsPage.css'

class SettingsPage extends Component {
  handleChange = e => {
    this.props.switchTheme(e.target.value)
  }

  render() {
    const themes = ['light', 'dark']

    const themeRadioButtons = themes.map(theme => (
      <label key={theme}>
        <input
          type='radio'
          name='theme'
          value={theme}
          onChange={this.handleChange}
          checked={theme === this.props.theme}
        />
        {theme}
      </label>
    ))
    return (
      <div className='SettingsPage'>
        <h1 className='SettingsPage-title'>Settings</h1>

        <section>
          <h2>Theme</h2>
          {themeRadioButtons}
        </section>
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
