import { signOut } from "firebase/auth";
import type { ComponentType } from "react";
import { BsCart } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.config";
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectProductsCount } from "../../store/toolkit/cart/cart.selectors";
import { toggleCart } from "../../store/toolkit/cart/cart.slice";
import { logoutUser } from "../../store//toolkit/user/user.slice";
import {
	HeaderContainer,
	HeaderItem,
	HeaderItems,
	HeaderTitle,
} from "./header.styles";

const Header = () => {
	const BsCartIcon = BsCart as unknown as ComponentType<{ size?: number }>;
	const { isAuthenticated, currentUser } = useAppSelector(
		(state) => state.userReducer,
	);
	const dispatch = useDispatch();
	const productsCount = useAppSelector(selectProductsCount);

	const navigate = useNavigate();
	const handleLoginClick = () => {
		navigate("/login");
	};
	const handleSignUpClick = () => {
		navigate("/sign-up");
	};
	const handleHomeClick = () => {
		navigate("/");
	};
	const handleExploreClick = () => {
		navigate("/explore");
	};
	const handleSignOutClick = () => {
		dispatch(logoutUser());
		signOut(auth);
	};
	const handleCartClick = () => {
		dispatch(toggleCart());
	};

	return (
		<HeaderContainer>
			<HeaderTitle onClick={handleHomeClick}>
				CLUB <span style={{ color: "#ffb813" }}>.</span>
			</HeaderTitle>
			<HeaderItems>
				{isAuthenticated && (
					<HeaderItem>Olá, {currentUser?.firstName}</HeaderItem>
				)}
				<HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
				{!isAuthenticated ? (
					<>
						<HeaderItem onClick={handleLoginClick}>Entrar</HeaderItem>
						<HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
					</>
				) : (
					<HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
				)}
			</HeaderItems>
			<HeaderItem onClick={handleCartClick}>
				<BsCartIcon size={18} />
				<p style={{ marginLeft: 5, color: "#ffb813", fontWeight: "bold" }}>
					{productsCount}
				</p>
			</HeaderItem>
		</HeaderContainer>
	);
};

export default Header;
