import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user";
import taskReducer from "./slices/task";
import generalReducer from "./slices/general";

// const persistConfig = {
//   key: "root",
//   storage,
//   whilelist: ["task"],
// };

const taskPersistConfig = {
  key: "task",
  storage,
  whitelist: ["task", "offer"],
};

const rootReducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  task: persistReducer(taskPersistConfig, taskReducer),
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

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
        ],
        ignorePath: ["result"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
