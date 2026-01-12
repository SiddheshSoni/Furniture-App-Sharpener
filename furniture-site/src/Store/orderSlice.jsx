import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders, sendOrder } from "../API/Order";

export const getOrderThunk = createAsyncThunk(
    'orders/getOrder',
    async(_, ThunkAPI)=>{
        try{
            const res = await getOrders();

            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            const userId = localStorage.getItem('user');
            const userOrders = Object.keys(res.data).map((id)=>({id, ...res.data[id]})).filter( order => order.user === userId);

            return userOrders;
        }
        catch(err){
            return ThunkAPI.rejectWithValue(err);
        }
    }
);

export const sendOrderThunk = createAsyncThunk(
    'orders/newOrder',
    async( newOrder, ThunkAPI)=>{
        try {
            const res = await sendOrder(newOrder);

            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return { ...newOrder, id: res.data.name };
        } catch (error) {
            return ThunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    orders:[],
    loading:false,
    error:null,
};

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendOrderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOrderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(sendOrderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;