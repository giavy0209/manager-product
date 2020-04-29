
import { CHANGE_COUNT } from './actionsType'
const initialState = {
    count: 0,
}
  
const reducers = function (state = initialState, action) {
    if (action.type === CHANGE_COUNT) {
      return {
        ...state,
        count: action.payload.count
      }
    }
    return state
}

export default reducers