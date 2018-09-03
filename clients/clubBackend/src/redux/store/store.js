import { createStore, applyMiddleware, combineReducers } from 'redux';
import user from '../reducers/user';
import customer from '../reducers/customer';
import flashmessages from '../reducers/flashmessages';
import globalDialogs from '../reducers/globalDialog';
import session from '../reducers/session';
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  // console.log('nextPage state', store.getState());
  return result;
};

export default createStore(combineReducers({
  user,
  customer,
  flashmessages,
  globalDialogs,
  session
}), applyMiddleware(logger, thunk));
