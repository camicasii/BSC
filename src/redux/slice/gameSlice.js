import { createSlice } from '@reduxjs/toolkit'
const initialState = { 
bet: 1,
guess:50,
payOut:2.0000,
radioValue:false,
profit:1.8000,
rollCount:0
}
const userSlice = createSlice({
  name: 'game',
  initialState,
  reducers:{
    setBet(state,action) {      
      state.bet = action.payload
      state.profit =  calculateProfit(state.radioValue, state.guess,state.bet).toFixed(4);
      state.payOut = calculatePayout(state.radioValue,state.guess).toFixed(4);      
    },
    setGuess(state, action) {         
      state.guess = action.payload
      state.profit =  calculateProfit(state.radioValue, state.guess,state.bet).toFixed(4);
      state.payOut = calculatePayout(state.radioValue,state.guess).toFixed(4);
    },
    setRollCount(state) {      
      state.rollCount++
    },
    setPayOut(state, action) {      
    },
    setProfit(state, action) {            
    },
    setRadioValue(state, action) {
      state.radioValue = action.payload
      state.profit =  calculateProfit(state.radioValue, state.guess,state.bet).toFixed(4);
      state.payOut = calculatePayout(state.radioValue,state.guess).toFixed(4);
    }    
  }  
})
function calculateProfit(state, guess_, bet) {
  if (guess_ > 98) guess_ = 98;
  if (guess_ < 2) guess_ = 2;
  const prof = calculatePayout(state, guess_);
  return bet * prof * 0.9;
}
function calculatePayout(state,guess_) {
  if (guess_ > 98) guess_ = 98;
  if (guess_ < 2) guess_ = 2;
  const scale = state ? guess_ : 100 - guess_;
  return 100 / scale;
}
export const { setGuess,
  setBet,
  setPayOut,
  setProfit,
  setRadioValue,
  setRollCount} = userSlice.actions
export default userSlice.reducer