import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import dataReducer from "../features/data/dataSlice";
import authReducer, { authMiddleware } from "../features/auth/authSlice";
import todoReducer from "../features/todo/todoSlice";
import interactionsReducer from "../features/interactions/interactionsSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    data: dataReducer,
    auth: authReducer,
    todo: todoReducer,
    interactions: interactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;