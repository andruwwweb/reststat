import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import companyReducer from './companyReducer';

const rootReducer = combineReducers({
    auth: authReducer.reducer,
    user: userReducer.reducer,
    error: errorReducer.reducer,
    company: companyReducer.reducer,
});

export default rootReducer