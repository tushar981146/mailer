import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";






export const allMessagesFetch = createAsyncThunk("allMessages", async (items) => {
    console.log("Fetching all messages with items:", items);

    let value;
    if (items) {
        Object.values(items).forEach((item) => {
             value = item;
        });

        const res = await fetch("https://potfolio-backend-je57.onrender.com/form/uniqueId", 
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ value }),
        }
        );

        if(!res.ok) {
            throw new Error("Network response was not ok");
        }

        return res.json();

    }


    
});

const MessagesSlice = createSlice({
    name: "allMessages",
    initialState: {
        allMessages: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allMessagesFetch.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(allMessagesFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allMessages = action.payload;
            })
            .addCase(allMessagesFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});
export default MessagesSlice.reducer;