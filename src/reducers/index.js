import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import customer from './customer';
import user from './user';


const reducers = {
  routing: routerReducer,
  settings,
  customer,
  user
};

module.exports = combineReducers(reducers);
