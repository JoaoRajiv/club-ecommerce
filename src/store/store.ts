import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// @ts-expect-error
import persistReducer from "redux-persist/es/persistReducer";
// @ts-expect-error
import persistStore from "redux-persist/es/persistStore";
// @ts-expect-error
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const persistConfig = {
	key: "root",
	storage,
	whiteList: ["cartReducer"],
};

const persitedRootReducer: typeof rootReducer = persistReducer(
	persistConfig,
	rootReducer,
);

export const store = configureStore({
	reducer: persitedRootReducer,
	middleware: [thunk, logger],
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
