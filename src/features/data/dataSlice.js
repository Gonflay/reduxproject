import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMockData } from "../../api/fakeApi";

export const loadData = createAsyncThunk("data/loadData", async () => {
  return await fetchMockData();
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    products: [],
    posts: [],
    testimonials: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products || [];
        state.posts = action.payload.posts || [];
        state.testimonials = action.payload.testimonials || [];
      })
      .addCase(loadData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Ошибка загрузки";
      });
  }
});

export default dataSlice.reducer;
