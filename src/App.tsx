import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/cart.component";
import Loading from "./components/loading/loading.component";
import { auth, db } from "./config/firebase.config";
import AuthenticationGuard from "./guards/authentication.guard";
import { useAppSelector } from "./hooks/redux.hooks";
import CategoryDetailsPage from "./pages/category-details/category-detail.page";
import ProductDetailsPage from "./pages/product-details/product-detail.page";
import CheckoutPage from "./pages/checkout/checkout.page";
import ExplorePage from "./pages/explore/explore.page";
// Pages
import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import PaymentConfirmationPage from "./pages/payment-confirmation/payment-confimation.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import { loginUser, logoutUser } from "./store/toolkit/user/user.slice";
import type User from "./types/user.types";

const App: FunctionComponent = () => {
	const [isInitializing, setIsInitializing] = useState(true);

	const dispatch = useDispatch();

	const { isAuthenticated } = useAppSelector(
		(rootReducer) => rootReducer.userReducer,
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			const isSigningOut = isAuthenticated && !user;
			if (isSigningOut) {
				dispatch(logoutUser());
				return setIsInitializing(false);
			}

			const isSigningIn = !isAuthenticated && user;
			if (isSigningIn) {
				const querySnapshot = await getDocs(
					query(collection(db, "users"), where("id", "==", user.uid)),
				);
				const userFromFirestore = querySnapshot.docs[0]?.data();

				dispatch(loginUser(userFromFirestore as User));

				return setIsInitializing(false);
			}
			return setIsInitializing(false);
		});

		return unsubscribe;
	}, [dispatch, isAuthenticated]);

	if (isInitializing) {
		return <Loading message="Loading, please wait..." />;
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/explore" element={<ExplorePage />} />
				<Route path="/category/:id" element={<CategoryDetailsPage />} />
				<Route
					path="/category/:id/product/:productId"
					element={<ProductDetailsPage />}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route
					path="/checkout"
					element={
						<AuthenticationGuard>
							<CheckoutPage />
						</AuthenticationGuard>
					}
				/>
				<Route
					path="/payment-confirmation"
					element={<PaymentConfirmationPage />}
				/>
			</Routes>
			<Cart />
		</BrowserRouter>
	);
};

export default App;
