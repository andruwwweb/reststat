import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    authReducer: authReducer.reducer,
    userReducer: userReducer.reducer,
    errorReducer: errorReducer.reducer,
});

export default rootReducer