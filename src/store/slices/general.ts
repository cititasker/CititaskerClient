import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  showWaitlistForm: boolean;
  showSidebar: boolean;
}

const initialState: IState = {
  showWaitlistForm: false,
  showSidebar:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("dashboard-sidebar-open") ?? "false")
      : false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleWaitlistModal: (state) => {
      state.showWaitlistForm = !state.showWaitlistForm;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { toggleWaitlistModal, setSidebarOpen } = generalSlice.actions;
export default generalSlice.reducer;
