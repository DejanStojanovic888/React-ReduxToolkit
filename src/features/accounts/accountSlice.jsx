const initialStateAccount = { 
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

export default function accountReducer(state = initialStateAccount, action) {   // default value for state is initialStateAccount
  switch (action.type) {
    case 'account/deposit': {
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

// Ovde vraca funkciju ako nije USD
// ali ta funkcija ne return-uje nefo opet dispatch-uje??? 11min
export function deposit(amount, currency) {
  if (currency === "USD") return { type: 'account/deposit', payload: amount };
  return async function (dispatch, getState) {
    try {
      const res = await fetch(`https://api.frankfurter.dev/v2/rate/${currency}/USD`);
      const data = await res.json();
      const converted = amount * data.rate;
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