"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  isAuth: boolean;
  role: string | null;
  user: Partial<IUser>;
}

const initialState: UserState = {
  isAuth: false,
  role: null,
  user: {},
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    logout: (state) => {
      state.user = {};
      state.isAuth = false;
    },
    setUser: (state, { payload }) => {
      state.isAuth = true;
      state.user = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRole, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
