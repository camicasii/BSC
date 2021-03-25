import { configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import  state from '../reducer/allReducer'
export default configureStore({
  reducer: {state}
  
  
})