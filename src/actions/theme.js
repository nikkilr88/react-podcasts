export const switchTheme = () => (dispatch, getState) => {
  const state = getState()
  const theme = state.theme.theme === 'light' ? 'dark' : 'light'

  localStorage.setItem('theme', theme)

  dispatch({
    type: 'SWITCH_THEME',
    theme
  })
}
