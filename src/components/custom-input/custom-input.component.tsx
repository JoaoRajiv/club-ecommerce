import React from "react";
import { CustomInputContainer } from "./custom-input.styles";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	hasError?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
	(props, ref) => {
		return <CustomInputContainer {...props} ref={ref} />;
	},
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
