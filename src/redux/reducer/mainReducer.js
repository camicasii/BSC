import { createReducer} from '@reduxjs/toolkit'
import {setLoad,initContract} from "../action/mainAction";

const initialState = { 
    load: false,
    show:false ,
    init:false  
    }

export default createReducer(initialState,(builder) => {
        builder  
          .addCase(setLoad, (state, action) => {              
            state.load = action.payload.load
          })
          .addCase(initContract, (state, action) => {                       
            state.init=!state.init    
          })      
    })