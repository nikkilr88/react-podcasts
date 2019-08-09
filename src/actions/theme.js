export const switchTheme = theme => dispatch => {
  localStorage.setItem('theme', theme)

  dispatch({
    type: 'SWITCH_THEME',
    theme
  })
}
