import { render } from "@testing-library/react";
import Colors from "../../theme/theme.colors";
import CustomInput from "./custom-input.component";

describe("CustomInput", () => {
	it("should render with error if hasError is true", () => {
		const { getByPlaceholderText } = render(
			<CustomInput placeholder="O e-mail é obrigatório." hasError={true} />,
		);
		const input = getByPlaceholderText("O e-mail é obrigatório.");
		expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` });
	});
});
