const initialState = {
  theme: localStorage.getItem('theme') || 'light'
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        // TODO: change 'theme:' to 'settings:'
        theme: action.theme
      }
    default:
      return state
  }
}

export default settingsReducer
