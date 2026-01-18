import { offerSchemaType } from "@/schema/offer";
import { postTaskSchemaType } from "@/schema/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  taskId: number | null;
  task: Partial<postTaskSchemaType>;
  offer: Partial<offerSchemaType> & { payable_id?: number };
  taskDetails: ITask | null;
  taskersOffer: IOffer | null;
  isDataLoaded: boolean;
}

const initialState: TaskState = {
  taskId: null,
  task: {},
  offer: {},
  taskDetails: null,
  taskersOffer: null,
  isDataLoaded: false,
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
    setTaskDetails: (state, { payload }: PayloadAction<ITask>) => {
      state.taskDetails = payload;
    },
    setUserTaskOffer: (state, { payload }) => {
      state.taskersOffer = payload;
    },
    purgeStateData: (state, { payload }: PayloadAction<"task" | "offer">) => {
      if (payload === "task") {
        state.task = {};
        state.isDataLoaded = false;
      } else {
        state.offer = {};
      }
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
