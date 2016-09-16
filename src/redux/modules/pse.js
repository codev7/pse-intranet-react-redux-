// ------------------------------------
// Constants
// ------------------------------------
export const EXAMPLE = 'EXAMPLE'

// ------------------------------------
// Actions
// ------------------------------------
const exampleAction = (dispatch, value) => {
  return (
    dispatch({
      type: EXAMPLE,
      value: value
    })
  )
}

export const actions = {
  exampleAction
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EXAMPLE]: (state, action) => {
    return ({ ...state })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
export default function PSEReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
