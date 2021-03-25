import { createReducer, } from '@reduxjs/toolkit'
import {setAddress,fetchAddress} from "../action/userAction";
const initialState = { address: "0x000",
balace:0,
approve:0,
allowance:0
}
export default createReducer(initialState,(builder) => {
  builder  
    .addCase(setAddress, (state, action) => {
      console.log(action.payload.address);
      state.address = action.payload.address
    })
    .addCase(fetchAddress, (state, action) => {
      console.log("hola",action);
      //state.address = action.payload.address

    })
})

