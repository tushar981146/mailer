import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reducer from './allDataSlice';

export const listNames = createAsyncThunk('listNames', async () => {
    const res = await fetch('https://potfolio-backend-je57.onrender.com/form/uniqueId');
    return res.json();
});

export const listNameSlice = createSlice({
    name: 'listName',
    initialState: {
        listNameIsLoading: false,
        listName: [],
        listNameError: null,
        uniqueName: {},
    },
    extraReducers: (builder) => {
        builder.addCase(listNames.pending, (state, action) => {
            state.listNameIsLoading = true;
        });

         builder.addCase(listNames.fulfilled, (state, action) => {
            state.listNameIsLoading = false;
            state.listName = action.payload;
        });
        builder.addCase(listNames.rejected, (state, action) => {
            state.listNameIsLoading = false;
            state.listNameError = action.error.message;
            console.error('Error fetching list names:', action.error);
        }); 
    },

    reducers: {
        uniqueName: (state, action) => {
            state.uniqueName = action.payload;
        }
    }
});

export const { uniqueName } = listNameSlice.actions;

export default listNameSlice.reducer;