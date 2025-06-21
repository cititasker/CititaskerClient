import { createSlice } from "@reduxjs/toolkit";

interface IState {
  showWaitlistForm: boolean;
}

const initialState: IState = {
  showWaitlistForm: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    toggleWaitlistModal: (state) => {
      state.showWaitlistForm = !state.showWaitlistForm;
    },
    updateModalState: (state, { payload }) => {
      state.showWaitlistForm = payload;
    },
  },
});

export const { toggleWaitlistModal, updateModalState } = generalSlice.actions;
export default generalSlice.reducer;
