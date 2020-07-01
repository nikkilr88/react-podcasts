const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  display: localStorage.getItem('display') || 'grid',
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        // TODO: change 'theme:' to 'settings:'
        theme: action.theme,
      }

    case 'SWITCH_DISPLAY':
      return {
        ...state,
        display: action.displayValue,
      }

    default:
      return state
  }
}

export default settingsReducer
