import { applyMiddleware, combineReducers, createStore } from 'redux';  // deprecated method(ReduxToolkit is recommended)
import accountReducer from './features/accounts/accountSlice.jsx';
import customerReducer from './features/customers/customerSlice.jsx';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

