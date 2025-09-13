import { offerSchemaType } from "@/schema/offer";
import { postTaskSchemaType } from "@/schema/task";
import { purgeData } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  taskId: number | null;
  task: Partial<postTaskSchemaType>;
  offer: Partial<offerSchemaType>;
  taskDetails: Partial<ITask>;
  taskersOffer: IOffer | null;
}

const initialState: TaskState = {
  taskId: null,
  task: {},
  offer: {},
  taskDetails: {},
  taskersOffer: null,
};

const taskDetailIdSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskData: (state, { payload }) => {
      state.task = {
        ...state.task,
        ...payload,
      };
    },
    setOfferData: (state, { payload }) => {
      state.offer = payload;
    },
    setTaskDetails: (state, { payload }) => {
      state.taskDetails = payload;
    },
    setUserTaskOffer: (state, { payload }) => {
      state.taskersOffer = payload;
    },
    purgeStateData: (state, action: PayloadAction<"task" | "offer">) => {
      state[action.payload] = {};
    },
    // Reset entire state to initial
    resetTaskState: () => initialState,
  },
});

export const {
  setTaskData,
  setTaskDetails,
  setOfferData,
  setUserTaskOffer,
  resetTaskState,
  purgeStateData,
} = taskDetailIdSlice.actions;

export default taskDetailIdSlice.reducer;
