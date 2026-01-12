import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategory, getProduct } from "../API/fetchDatabase";


export const getCategoryThunk = createAsyncThunk(
    'catalog/categories',
    async (_ , ThunkAPI)=>{
        try{
            const res = await getCategory();

            if(!res.ok){
                return ThunkAPI.rejectWithValue(res.error);
            }
            const loadedCategories = Object.keys(res.data).map((id) => ({id, ...res.data[id]}));
            return loadedCategories;
        }catch(err){
            return ThunkAPI.rejectWithValue(err.message);
        }
    }
);
export const getProductThunk = createAsyncThunk(
  "catalogue/getProduct",
  async (_, ThunkAPI) => {
    try {
      const res = await getProduct();
      if (!res.ok) {
        return ThunkAPI.rejectWithValue(res.error);
      }
      const loadedProducts = Object.keys(res.data).map((id) => ({
        id,
        ...res.data[id],
      }));
      return loadedProducts;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState ={
    categories:[],
    products:[],
    loading:false,
    error:null,
};

const catalogSlice = createSlice({
    name:'catalog',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCategoryThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
            .addCase(getCategoryThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
            })
            .addCase(getCategoryThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            })
            .addCase(getProductThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
            })
            .addCase(getProductThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            })
            .addCase(getProductThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            })
    }
});

export const catalogActions = catalogSlice.actions;
export default catalogSlice.reducer;