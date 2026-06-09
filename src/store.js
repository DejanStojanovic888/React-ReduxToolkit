import { createStore } from 'redux';  // deprecated method(ReduxToolkit is recommended)

const initialState = { 
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

// reducers not allowed to modify state.
// Also they r not allowed to do any asynchronous work(or other side effects).
function reducer(state = initialState, action) {   // default value for state is initialState
  switch (action.type) {
    case 'account/deposit': {
      return { ...state, balance: state.balance + action.payload };
    }
    case 'account/withdraw': {
      return { ...state, balance: state.balance - action.payload };
    }
    case 'account/requestLoan': {
      if (state.loan > 0) return state;
      // LATER
      return { ...state, loan: action.payload };
    }
    case 'account/payLoan': {
      return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };
    }
    default:
      return state;
  }
}

const store = createStore(reducer);

// radi isto kao dispatch funkcija u useReducer hook-u
store.dispatch({ type: 'account/deposit', payload: 500 });
store.dispatch({ type: 'account/withdraw', payload: 200 });
console.log(store.getState());
store.dispatch({ type: "account/requestLoan", payload: { amount: 1000, purpose: "Buy an expensive car" } });
console.log(store.getState());
