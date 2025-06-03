import { configureStore } from "@reduxjs/toolkit";
import dataSlice  from "./allDataSlice";
import listNameSlice from "./listNameSlice";
import MessagesSlice from "./allMessagesSlice";

export const store =  configureStore({
    reducer: {
        allData: dataSlice,
        storeListName: listNameSlice,
        Messages: MessagesSlice
    }
})