
import {
  CHANGE_USER_DATA,
  CHANGE_CURRENT_URL,
  CHANGE_LIST_PRODUCT,
  CHANGE_LIST_CATEGORY,
  CHANGE_LIST_USER,
} from './action'
const reducers = function (state = {}, action) {
  if (action.type === CHANGE_USER_DATA) {
    return {
      ...state,
      ...action.payload,
    }
  }else if(action.type === CHANGE_CURRENT_URL){
    return{
      ...state,
      ...action.payload,
    }
  }else if(action.type === CHANGE_LIST_PRODUCT){
    return{
      ...state,
      ...action.payload
    }
  }else if(action.type === CHANGE_LIST_CATEGORY){
    return{
      ...state,
      ...action.payload
    }
  }else if(action.type === CHANGE_LIST_USER){
    return{
      ...state,
      ...action.payload
    }
  }
  return state
}

export default reducers