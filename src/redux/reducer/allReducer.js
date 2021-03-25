import {combineReducers } from '@reduxjs/toolkit'
import user from "../reducer/userReducer";
import main  from "../reducer/mainReducer";
import game from "../slice/gameSlice";

const rootReducer = combineReducers({
    user,
    main,
    game
})

export default  rootReducer