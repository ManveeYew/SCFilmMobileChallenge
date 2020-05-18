import { combineReducers } from 'redux';

import get from './get';
import list from './list';

export default combineReducers({
  get,
  list,
});
