import { createAsyncThunk } from '@reduxjs/toolkit'
import { setBalance,setAllowance } from "./userAction";
import Web3Singleton from "../../util/Web3Singleton";


export const asyncGetBalance = createAsyncThunk(
    'users/asyncGetBalance',    
    async (_,thunkAPI) => {      
      let value=0;
      if(await Web3Singleton.getInstance().setContract()){
         value = await Web3Singleton.getInstance().getBalance()
      }
      thunkAPI.dispatch(setBalance(value))
    })

export const asyncGetAllowance = createAsyncThunk(
        'users/asyncGetAllowance',    
        async (_,thunkAPI) => {          
          let value=0;
          if(await Web3Singleton.getInstance().setContract()){
             value = await Web3Singleton.getInstance().getAllowance()
          }          
          thunkAPI.dispatch(setAllowance(value))
        })
    