// automatically creates action creators(from reducers), makes writing reducers easier(ne mora switch), we can mutate state inside reducers
// uses library called Immer(converts mutable state to immutable state)
import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false
}

// reducer + actions:
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {  // DRUGO
       state.balance += action.payload;
       state.isLoading = false;
    },
    withdraw(state, action) {
       state.balance -= action.payload; 
    },

    // RTK action creators po defaultu primaju jedan argument koji 
    // postaje "payload". Kada trebaš više argumenata, prepare ih hvata i formira payload objekat koji reducer onda čita.
    requestLoan: {
      // obzirom da imamo DVA ARGUMENTA(amount i purpose) moramo da napravimo prepare funkciju
      // "prepare" ustvari priprema kakav ce da nam bude "payload" (MOJE:)
      prepare(amount, purpose) {
        // return-ujemo object(da nam on postane payload object u reducer-u)
        return {
          payload: { amount, purpose }
        }
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount; 
        state.loanPurpose = action.payload.purpose; 
        state.balance += action.payload.amount; 
      },
    },
    payLoan(state) {
      state.balance -= state.loan; 
      state.loan = 0; 
      state.loanPurpose = ''; 
    },
    convertingCurrency(state) { 
      state.isLoading = true; 
    }
  }
})

// izbacili smo iz export-a deposit(kasnije ga exportujemo). Jer to treba prvo da se izvrsi pa tek onda se ide u reducer.
export const { withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions  // convertingCurrency sam ubacio ovde

// deposit nije exportovan iz accountSlice.actions jer je ručno definisan van slice-a.
// Ovde vraca funkciju ako nije USD
// ali ta funkcija ne return-uje nego opet dispatch-uje??? 11min
// ovde nismo iskoristili the "automatic action creator" that has been created by createSlice() function. We used our own.
export function deposit(amount, currency) {  // PRVO
  // "type" mora da bude ovog oblika: "account/deposit"
  if (currency === "USD") return { type: 'account/deposit', payload: amount };
  // Ova funkcija je MIDDLEWARE izmedju dispatch-a i reducer-a u storu
  return async function (dispatch, getState) {
    // loading: true
    dispatch({ type: "account/convertingCurrency" }) // dispatch is only available inside cos its in argument of async function
    try {
      const res = await fetch(`https://api.frankfurter.dev/v2/rate/${currency}/USD`);
      const data = await res.json();
      const converted = amount * data.rate; 

      // ovde mora dispatch(ne moze return jer je async funkcija thunk middleware)
      // Async funkcija uvek vraća Promise. Redux store ne zna šta da radi sa Promise-om.
      // Ukratko:
      //    return { type: "account/deposit" }  →  radi samo u sinhronoj funkciji
      //    dispatch({ type: "account/deposit" }) →  radi i u async funkciji
      dispatch({ type: "account/deposit", payload: converted });
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
    }
  } 
}
// Dakle slice je samo "fabrika" koja generiše i REDUCER i ACTIONS — ali ih exportuješ odvojeno jer idu na različita mesta.
export default accountSlice.reducer


/*
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
// ali ta funkcija ne return-uje nego opet dispatch-uje??? 11min
export function deposit(amount, currency) {
  if (currency === "USD") return { type: 'account/deposit', payload: amount };

  // Ova funkcija je middleware izmedju dispatch-a i reducer-a u storu
  return async function (dispatch, getState) {
    // loading: true
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
*/