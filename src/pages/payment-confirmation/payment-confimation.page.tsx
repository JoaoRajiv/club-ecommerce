import type { ComponentType, FunctionComponent } from "react";
import { useEffect } from "react";
import {
	AiOutlineCheckCircle,
	AiOutlineCloseCircle,
	AiOutlineHome,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../../components/custom-button/custom-button.component";
// Components
import Header from "../../components/header/header.component";
import { clearCartProducts } from "../../store/toolkit/cart/cart.slice";
// Utilities
import Colors from "../../theme/theme.colors";
// Styles
import {
	PaymentConfirmationContainer,
	PaymentConfirmationContent,
} from "./payment-confimation.styles";

const PaymentConfirmationPage: FunctionComponent = () => {
	const AiOutlineCheckCircleIcon =
		AiOutlineCheckCircle as unknown as ComponentType<{
			size?: number;
			color?: string;
		}>;
	const AiOutlineCloseCircleIcon =
		AiOutlineCloseCircle as unknown as ComponentType<{
			size?: number;
			color?: string;
		}>;
	const AiOutlineHomeIcon = AiOutlineHome as unknown as ComponentType<{
		size?: number;
	}>;

	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	const status = searchParams.get("success");
	const isCanceled = searchParams.get("canceled") === "true";

	useEffect(() => {
		if (status === "true") {
			dispatch(clearCartProducts());
		}
	}, [dispatch, status]);

	const handleGoToHomePageClick = () => {
		navigate("/");
	};

	return (
		<>
			<Header />
			<PaymentConfirmationContainer>
				<PaymentConfirmationContent>
					{status === "true" && (
						<>
							<AiOutlineCheckCircleIcon size={120} color={Colors.success} />
							<p>Sua compra foi finalizada com sucesso!</p>
						</>
					)}

					{(status === "false" || isCanceled) && (
						<>
							<AiOutlineCloseCircleIcon size={120} color={Colors.error} />
							<p>
								Ocorreu um erro ao finalizar sua compra. Por favor, tente
								novamente.
							</p>
						</>
					)}

					<CustomButton
						startIcon={<AiOutlineHomeIcon />}
						onClick={handleGoToHomePageClick}
					>
						Ir para a Página Inicial
					</CustomButton>
				</PaymentConfirmationContent>
			</PaymentConfirmationContainer>
		</>
	);
};

export default PaymentConfirmationPage;
