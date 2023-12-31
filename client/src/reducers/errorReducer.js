import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isError: false,
}
const errorReducer = createSlice({
    name: 'error',
    initialState,
    reducers: {
      switchError: (state) => {
        state.isError = !state.isError;
      },
    },
  });

export const { switchError } = errorReducer.actions;
export default errorReducer