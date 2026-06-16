import type React from "react";
import type { ButtonHTMLAttributes, FunctionComponent } from "react";
import { CustomButtonContainer, IconContainer } from "./custom-button.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	startIcon?: React.ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
	startIcon,
	children,
	...rest
}) => {
	return (
		<CustomButtonContainer {...rest}>
			{startIcon && <IconContainer>{startIcon}</IconContainer>}
			{children}
		</CustomButtonContainer>
	);
};

export default CustomButton;
