import { createAction, nanoid,createAsyncThunk } from '@reduxjs/toolkit'


export const setLoad = createAction('main/setLoad', function(load) {    
    return {
        payload: {
        load,
          id: nanoid(),
          createdAt: new Date().toISOString(),
        },
      }
    }) 


export const initContract = createAction('main/initContract', function() {  
    console.log("initContract");    
    return {
      payload: {      
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    }    
  }
)
  
    