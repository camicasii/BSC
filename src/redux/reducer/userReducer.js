import { createReducer, } from '@reduxjs/toolkit'
import {setAddress,setBalance,setAllowance} from "../action/userAction";

const initialState = {
address: "0x000",
balance:0,
approve:0,
allowance:0
}

export default createReducer(initialState,(builder) => {
  builder  
    .addCase(setAddress, (state, action) => {
      console.log(action.payload.address);
      state.address = action.payload.address
    })
    .addCase(setBalance, (state, action) => {           
      state.balance=action.payload.value
    })
    .addCase(setAllowance, (state, action) => { 
      state.allowance=action.payload.value
    })
    
    
})

