const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  display: localStorage.getItem('display') || 'grid'
}

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_THEME':
      return {
        ...state,
        theme: action.theme
      }

    case 'SWITCH_DISPLAY':
      return {
        ...state,
        display: action.displayValue
      }

    default:
      return state
  }
}

export default themeReducer
