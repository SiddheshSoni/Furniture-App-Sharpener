import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  addProduct,
  getCategory,
  getProduct,
  deleteProduct,
  updateProduct,
  deleteCategory,
  updateCategory,
  addSubCategory,
} from "../API/Dashboard";

const initialState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
};

export const addCategoryThunk = createAsyncThunk(
  "catalogue/addCategory",
  async (newCategory, ThunkAPI) => {
    try {
      const res = await addCategory(newCategory);
      if (!res.ok) {
        return ThunkAPI.rejectWithValue(res.error);
      }
      return { ...newCategory, id: res.data.name };
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getCategoryThunk = createAsyncThunk(
  "catalogue/getCategory",
  async (_, ThunkAPI) => {
    try {
      const res = await getCategory();
      if (!res.ok) {
        return ThunkAPI.rejectWithValue(res.error);
      }
      const loadedCategories = Object.keys(res.data).map((id) => ({
        id,
        ...res.data[id],
      }));
      return loadedCategories;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "catalogue/addProduct",
  async (newProduct, ThunkAPI) => {
    try {
      const res = await addProduct(newProduct);
      if (!res.ok) {
        return ThunkAPI.rejectWithValue(res.error);
      }
      return res.data;
    } catch (err) {
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

export const deleteProductThunk = createAsyncThunk(
  "catalogue/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const res = await deleteProduct(productId);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error);
      }
      return productId; // On success, return the ID of the deleted product
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "catalogue/updateProduct",
  async (productData, thunkAPI) => {
    try {
      // The productData should contain the id
      const { id, ...dataToUpdate } = productData;
      const res = await updateProduct(id, dataToUpdate);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error);
      }
      // On success, return the updated product data.
      // Assuming API returns the updated object, but returning productData is safer.
      return productData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  "catalogue/deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      const res = await deleteCategory(categoryId);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error);
      }
      return categoryId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateCategoryThunk = createAsyncThunk(
  "catalogue/updateCategory",
  async (categoryData, thunkAPI) => {
    try {
      const { id, ...dataToUpdate } = categoryData;
      const res = await updateCategory(id, dataToUpdate);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error);
      }
      return categoryData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addSubCategoryThunk = createAsyncThunk(
  "catalogue/addSubCategory",
  async ({ categoryId, subcategory }, thunkAPI) => {
    try {
      const res = await addSubCategory(categoryId, subcategory);
      if (!res.ok) {
        return thunkAPI.rejectWithValue(res.error);
      }

      return {
        categoryId,
        subId: res.data.name,
        name: subcategory,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProductThunk.rejected, (state, action) => {
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
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;

        const { categoryId, subId, name } = action.payload || {};
        const cat = state.category.find((c) => c.id === categoryId);

        if (cat) {
          if (!cat.subcategory) {
            cat.subcategory = {};
          }

          cat.subcategory[subId] = { name };
        }
      })
      .addCase(addSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const catalogueActions = catalogueSlice.actions;
export default catalogueSlice.reducer;
