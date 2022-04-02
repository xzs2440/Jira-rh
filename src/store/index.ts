import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "store/auth.slice";
import { projectListSlice } from "pages/project-list/project-list.slice";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
