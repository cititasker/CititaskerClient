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
  // Transform to ensure only serializable data is persisted
  transforms: [
    {
      in: (inboundState: any) => {
        // Transform images to remove any File objects before persisting
        if (inboundState?.task?.images) {
          return {
            ...inboundState,
            task: {
              ...inboundState.task,
              images: inboundState.task.images.map((img: any) => ({
                src: img.src,
                name: img.name || "",
                new: img.new || false,
                // Explicitly exclude any File objects or other non-serializable data
              })),
            },
          };
        }
        return inboundState;
      },
      out: (outboundState: any) => {
        // No transformation needed on the way out
        return outboundState;
      },
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
        // Ignore redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
        ],
        // Ignore specific paths that might contain non-serializable data
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        ignoredPaths: ["task.task.images.file"], // Ignore the file property if it exists
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
