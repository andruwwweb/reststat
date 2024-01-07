import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { base } from '../api/base'
import { checkAuth } from '../services/auth';

const { API_BASE } = base

export const getCompany = createAsyncThunk('company/getCompany', async (endpoint) => {
    const token = checkAuth()
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
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

export const deleteCompany = createAsyncThunk('company/deleteCompany', async (id) => {
    const token = checkAuth()
    const res = await fetch(`${API_BASE}company/delete/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
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

export const createCompany = createAsyncThunk('company/createCompany', async (data) => {
    const token = checkAuth()
    const res = await fetch(`${API_BASE}company/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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
    data: [],
    status: 'idle',
    error: null,
    createCompanyStatus: 'idle',
    createCompanyError: null,
    deleteCompanyStatus: 'idle',
    deleteCompanyError: null,
}

const companyReducer = createSlice({
    name: 'company',
    initialState,
    reducers: {
        resetStatus: (state => {
            state.status = 'idle';
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompany.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCompany.fulfilled, (state, action) => {
                state.status = 'success';
                state.data = action.payload;
            })
            .addCase(getCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCompany.pending, (state) => {
                state.createCompanyStatus = 'loading';
            })
            .addCase(createCompany.fulfilled, (state) => {
                state.createCompanyStatus = 'success';
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.createCompanyStatus = 'failed';
                state.createCompanyError = action.error.message;
            })
            .addCase(deleteCompany.pending, (state) => {
                state.deleteCompanyStatus = 'loading';
            })
            .addCase(deleteCompany.fulfilled, (state) => {
                state.deleteCompanyStatus = 'success';
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.deleteCompanyStatus = 'failed';
                state.deleteCompanyError = action.error.message;
            });
    },
});

export const { resetStatus } = companyReducer.actions;
export default companyReducer;