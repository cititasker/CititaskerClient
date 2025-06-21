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
  },
});

export const { toggleWaitlistModal } = generalSlice.actions;
export default generalSlice.reducer;
