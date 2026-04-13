import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("interactions") || "{}");

const interactionsSlice = createSlice({
  name: "interactions",
  initialState: saved,
  reducers: {
    toggleLike(state, action) {
      const id = action.payload;
      if (!state[id]) state[id] = { liked: false, favorited: false, ratings: [] };
      state[id].liked = !state[id].liked;
      localStorage.setItem("interactions", JSON.stringify(state));
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (!state[id]) state[id] = { liked: false, favorited: false, ratings: [] };
      state[id].favorited = !state[id].favorited;
      localStorage.setItem("interactions", JSON.stringify(state));
    },
    addRating(state, action) {
      const { id, rating } = action.payload;
      if (!state[id]) state[id] = { liked: false, favorited: false, ratings: [] };
      state[id].ratings = [...(state[id].ratings || []), rating];
      localStorage.setItem("interactions", JSON.stringify(state));
    },
  },
});

export const { toggleLike, toggleFavorite, addRating } = interactionsSlice.actions;
export default interactionsSlice.reducer;