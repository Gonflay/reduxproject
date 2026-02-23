import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMockData } from "../../api/fakeApi";

export const loadData = createAsyncThunk("data/loadData", async () => {
  return await fetchMockData();
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    status: "idle",
    error: null,
    products: [],
    posts: [],
    testimonials: [],
  },
  reducers: {
    // CREATE
    addPost(state, action) {
      const newPost = action.payload;
      state.posts.unshift(newPost);
    },
    // UPDATE
    updatePost(state, action) {
      const { id, patch } = action.payload;
      const idx = state.posts.findIndex((p) => p.id === id);
      if (idx !== -1) {
        state.posts[idx] = { ...state.posts[idx], ...patch };
      }
    },
    // DELETE
    deletePost(state, action) {
      const id = action.payload;
      state.posts = state.posts.filter((p) => p.id !== id);
    },
  },
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
  },
});

export const { addPost, updatePost, deletePost } = dataSlice.actions;
export default dataSlice.reducer;
