const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}

// reducers not allowed to modify state.
// Also they r not allowed to do any asynchronous work(or other side effects).


export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer': {
      return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };
    }
    case 'customer/updateName': {
      return { ...state, fullName: action.payload };
    }
    default:
      return state;
  }
}



// radi isto kao dispatch funkcija u useReducer hook-u


export function createCustomer(fullName, nationalId) {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: 'customer/updateName',  // acc
    payload: fullName,
  };
}
