import { createSlice} from '@reduxjs/toolkit'

const initialState = { load: false,
  show:false,
  contractInstance:undefined,
  tokenInstance:undefined
  }
const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setShow(state,action) {
      state.show = action.payload
    },
    setLoad(state, action) {      
      state.load = true
    }
  }  
})

export 

export const {setShow, setLoad,loader} = mainSlice.actions

export default mainSlice.reducer