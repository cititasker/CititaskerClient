"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user";
import taskReducer from "./slices/task";
import generalReducer from "./slices/general";

const taskPersistConfig = {
  key: "task",
  storage,
  whitelist: ["task", "offer"],
  transforms: [
    {
      in: (state: any) => {
        if (!state?.task?.images) return state;

        return {
          ...state,
          task: {
            ...state.task,
            images: state.task.images.map((img: any) => ({
              src: img.src || img.url,
              name: img.name,
              new: img.new,
            })),
          },
        };
      },
      out: (state: any) => state,
    },
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  task: persistReducer(taskPersistConfig, taskReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
        ],
        ignoredPaths: ["task.task.images.file"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
