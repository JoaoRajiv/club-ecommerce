import React from "react";
import ReactDOM from "react-dom";
// @ts-expect-error
import "./index.css";

import { Provider } from "react-redux";
// @ts-expect-error
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import CategoryContextProvider from "./contexts/category.context";
import UserContextProvider from "./contexts/user.context";
import { persistedStore, store } from "./store/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistedStore}>
				<UserContextProvider>
					<CategoryContextProvider>
						<App />
					</CategoryContextProvider>
				</UserContextProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);
