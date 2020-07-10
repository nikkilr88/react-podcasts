export const switchTheme = theme => dispatch => {
  localStorage.setItem('theme', theme)

  dispatch({
    type: 'SWITCH_THEME',
    theme,
  })
}

export const switchDisplay = displayValue => dispatch => {
  localStorage.setItem('display', displayValue)

  dispatch({
    type: 'SWITCH_DISPLAY',
    displayValue,
  })
}
