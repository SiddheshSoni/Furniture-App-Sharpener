import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Authentication from "../API/Authentication";

// 
const token = localStorage.getItem('idToken');
const isLoggedIn = !!token;
const userId = localStorage.getItem('user');
//

//LoginTHUNK
export const LoginThunk = createAsyncThunk(
    'auth/login',
    async ({email, password, authMode}, ThunkAPI)=>{
        try{
            const res = await Authentication(email, password, authMode);

            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            return res.data;
        }catch(error){
            return ThunkAPI.rejectWithValue(error.message);
        }
    }
);


const initialState = {
    idToken: token,
    isLoggedIn,
    userId,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        onLogout(state){
            state.isLoggedIn = false;
            state.idToken = null;
            state.userId = null;
            state.loading = false;
            state.error = null;
            //remove from local storage in logout function no side effects here
        }
    },
    extraReducers: (builder)=>{
        builder 
            .addCase(LoginThunk.pending , (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(LoginThunk.fulfilled , (state, action)=>{
                state.isLoggedIn = true;
                state.idToken = action.payload.idToken;
                if(action.payload.email){
                    state.userId = action.payload.email.replace(/[.#$[\]]/g, "_");
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(LoginThunk.rejected , (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const authActions = authSlice.actions;
export default authSlice.reducer;