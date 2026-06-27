// automaticaly: combines reducers, thunk middleware, DevTools
import { configureStore } from '@reduxjs/toolkit'; 
import accountReducer from './features/accounts/accountSlice.jsx';
import customerReducer from './features/customers/customerSlice.jsx';

// Ključna stvar — kada promena jedne vrednosti automatski uzrokuje promenu druge, 
// Redux daje preglednost jer sve ide kroz jedan tok (action → reducer → novi state).
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer
  }
})

export default store;

