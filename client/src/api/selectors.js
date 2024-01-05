export const selectUserData = (state) => state.reducer.userReducer.data;
export const selectUserStatus = (state) => state.reducer.userReducer.status;
export const selectUserError = (state) => state.reducer.userReducer.error;
export const selectUserAuth = (state) => state.reducer.authReducer.isAuth;
export const selectError = (state) => state.reducer.errorReducer.isError;