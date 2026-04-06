import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("todos") || "[]");

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: saved,
    selectedId: null,
  },
  reducers: {
    addTodo(state, action) {
      state.items.unshift(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.items));
    },
    updateTodo(state, action) {
      const { id, patch } = action.payload;
      const idx = state.items.findIndex((t) => t.id === id);
      if (idx !== -1) {
        state.items[idx] = { ...state.items[idx], ...patch };
        localStorage.setItem("todos", JSON.stringify(state.items));
      }
    },
    deleteTodo(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
      if (state.selectedId === action.payload) state.selectedId = null;
      localStorage.setItem("todos", JSON.stringify(state.items));
    },
    toggleTodo(state, action) {
      const idx = state.items.findIndex((t) => t.id === action.payload);
      if (idx !== -1) {
        state.items[idx].done = !state.items[idx].done;
        localStorage.setItem("todos", JSON.stringify(state.items));
      }
    },
    selectTodo(state, action) {
      state.selectedId = action.payload;
    },
    clearSelected(state) {
      state.selectedId = null;
    },
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  selectTodo,
  clearSelected,
} = todoSlice.actions;
export default todoSlice.reducer;