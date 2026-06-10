
const initialStateAccount = { 
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

export default function accountReducer(state = initialStateAccount, action) {   // default value for state is initialStateAccount
  switch (action.type) {
    case 'account/deposit': {
      return { ...state, balance: state.balance + action.payload, isLoading: false };
    }
    case 'account/withdraw': {
      return { ...state, balance: state.balance - action.payload };
    }
    case 'account/requestLoan': {
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount };
    }
    case 'account/payLoan': {
      return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };
    }
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

// Ovde vraca funkciju ako nije USD
// ali ta funkcija ne return-uje nefo opet dispatch-uje??? 11min
export function deposit(amount, currency) {
  if (currency === "USD") return { type: 'account/deposit', payload: amount };

  // loading: true
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" }) // dispatch is only available inside cos its in argument of async function
    try {
      const res = await fetch(`https://api.frankfurter.dev/v2/rate/${currency}/USD`);
      const data = await res.json();
      const converted = amount * data.rate;

      // ovde mora dispatch(ne moze return jer je async funkcija thunk middleware)
      // Async funkcija uvek vraća Promise. Redux store ne zna šta da radi sa Promise-om.
      dispatch({ type: "account/deposit", payload: converted });
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
    }
  } 
}



export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}


export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}