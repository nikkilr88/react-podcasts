export const switchTheme = () => (dispatch, getState) => {
  const state = getState()
  const theme = state.theme.theme === 'light' ? 'dark' : 'light'

  dispatch({
    type: 'SWITCH_THEME',
    theme
  })
}
