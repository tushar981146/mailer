import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//action to fetch all data from the server
export const fetchMailData = createAsyncThunk('fetchMailData', async () => {
    const res = await fetch('http://localhost:3000/form');
    return res.json();
});



    


export const dataSlice = createSlice({
    name: 'allData',
    initialState: {
        allDataIsLoading: false,
        Alldata: [],
        
    },
    extraReducers: (builder) => {

        // all data builder
        builder.addCase(fetchMailData.pending, (state, action) => {
            state.allDataIsLoading = true;
        });

        builder.addCase(fetchMailData.fulfilled, (state, action) => {
            state.allDataIsLoading = false;
            state.Alldata = action.payload;
        });

        builder.addCase(fetchMailData.rejected, (state, action) => {
            state.isloading = false;
           
            console.log('Error fetching data:', action);
            console.log("state", state);
        });

        
    }
})

export default dataSlice.reducer;