import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
//import signup from './signup/reducer'
import login from './login/reducer'
//import widgets from './widgets/reducer'
import country from './countries/reducer'

const IndexReducer = combineReducers({
  client,
  login,
  form,
  country
  //import
})

export default IndexReducer
