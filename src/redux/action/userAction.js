import { createAction, nanoid,createAsyncThunk } from '@reduxjs/toolkit'
 export const setAddress = createAction('users/setAddress', function (address) {   
  return {
      payload: {
        address,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    }
  })    
  export const setBalance = createAction('users/setBalance',function (value) {       
    return {
      payload: {
        value,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    }
  })

  export const setAllowance = createAction('users/setAllowance',function (value) {       
    return {
      payload: {
        value,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    }
  })

  