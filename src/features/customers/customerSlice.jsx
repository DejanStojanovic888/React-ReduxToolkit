import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}
const customerSlice = createSlice({
  name: 'customer',
  initialState: initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(), // ovo ne sme da bude u reducer-u(uvek to treba uraditi u okviru prepare f-je)
                                                 // isto bi vazilo da radimo prepare random ID(4:00 na lekciji 277 Jonas)
                                                 // reducers not allowed to modify state.
                                                 // Also they r not allowed to do any asynchronous work(or other side effects).
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName: (state, action) => {
      state.fullName = action.payload;
    },
  }
})

export const { createCustomer, updateName } = customerSlice.actions
export default customerSlice.reducer

// reducers not allowed to modify state.
// Also they r not allowed to do any asynchronous work(or other side effects).
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case 'customer/createCustomer': {
//       return { ...state, fullName: action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt };
//     }
//     case 'customer/updateName': {
//       return { ...state, fullName: action.payload };
//     }
//     default:
//       return state;
//   }
// }
// // radi isto kao dispatch funkcija u useReducer hook-u
// export function createCustomer(fullName, nationalId) {
//   return {
//     type: 'customer/createCustomer',
//     payload: {
//       fullName,
//       nationalId,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: 'customer/updateName',  
//     payload: fullName,
//   };
// }
