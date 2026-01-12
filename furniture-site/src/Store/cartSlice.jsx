import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart, deleteCartItem, updateCartItem, clearCart } from "../API/CartAPI";


export const getCartThunk = createAsyncThunk(
    'cart/getCart',
    async(_, ThunkAPI)=>{
        try{
            const res = await getCart();
            
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            // Handle case where cart is empty (res.data is null)
            const loadedCart = res.data ? Object.keys(res.data).map((_id) => ({_id, ...res.data[_id]})) : [];
            return loadedCart;
        }catch(err){
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);

export const addToCartThunk = createAsyncThunk(
    'cart/addToCart',
    async(newItem, ThunkAPI) => {
        try {
            const res = await addToCart(newItem);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            // Firebase POST returns {name: "generated_id"}
            return { ...newItem, _id: res.data.name };
        } catch (err) {
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteCartItemThunk = createAsyncThunk(
    'cart/deleteCartItem',
    async(id, ThunkAPI) => {
        try {
            const res = await deleteCartItem(id);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return id;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateCartItemThunk = createAsyncThunk(
    'cart/updateCartItem',
    async(updatedItem, ThunkAPI) => {
        try {
            const res = await updateCartItem(updatedItem);
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return updatedItem;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);

export const clearCartThunk = createAsyncThunk(
    'cart/clearCart',
    async(_, ThunkAPI) => {
        try {
            const res = await clearCart();
            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return;
        } catch (err) {
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);

const initialState = {
    cartItems:[],
    totalPrice:0,
    totalQuantity:0,
    loading : false,
    error : null,
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            // Get Cart
            .addCase(getCartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
                state.totalPrice = 0;
                state.totalQuantity = 0;

                state.cartItems.forEach(item =>{
                    state.totalQuantity += Number(item.quantity);
                    state.totalPrice += Number(item.price) * Number(item.quantity);
                })
            })
            .addCase(getCartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to Cart
            .addCase(addToCartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCartThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems.push(action.payload);
                state.totalQuantity += Number(action.payload.quantity);
                state.totalPrice += Number(action.payload.price);               

            })
            .addCase(addToCartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Cart Item
            .addCase(deleteCartItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            })
            .addCase(deleteCartItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Cart Item
            .addCase(updateCartItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.cartItems.findIndex(item => item.id === action.payload.id);
                if(index !== -1){
                    state.cartItems[index] = action.payload;
                }
            })
            .addCase(updateCartItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear Cart
            .addCase(clearCartThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCartThunk.fulfilled, (state) => {
                state.loading = false;
                state.cartItems = [];
            })
            .addCase(clearCartThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;