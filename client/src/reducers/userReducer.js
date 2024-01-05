import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base } from '../api/base'

const { API_BASE } = base

export const getUser = createAsyncThunk('user/getUser', async ({ endpoint, data }) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        let errorMessage = 'An error occurred';
        try {
            const errorBody = await res.json();
            errorMessage = errorBody.message || errorMessage;
        } catch (error) {
            errorMessage
        }
        throw new Error(errorMessage);
    }
    else {
        return res.json();
    }
});

const initialState = {
    data: null,
    status: 'idle',
    error: null,
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        resetStatus: (state => {
            state.status = 'idle';
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setUser, resetStatus } = userReducer.actions;
export default userReducer;