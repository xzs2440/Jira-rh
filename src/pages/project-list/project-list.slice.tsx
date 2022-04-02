import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
interface State {
  projectModalOpen: boolean;
}
const initialState: State = {
  projectModalOpen: false,
};
export const projectListSlice = createSlice({
  name: "projectListSlice", // name:标识这个slice本身
  initialState, // 维护一个状态树-默认状态
  reducers: {
    // 同步函数
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});
export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
