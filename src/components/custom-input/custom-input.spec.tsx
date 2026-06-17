import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

	it("should render without error if hasError is false", () => {
		const { getByPlaceholderText } = render(
			<CustomInput placeholder="O e-mail é obrigatório." hasError={false} />,
		);
		const input = getByPlaceholderText("O e-mail é obrigatório.");
		expect(input).toHaveStyle({ border: "none" });
	});

	it("should change value when user types", async () => {
		const { getByPlaceholderText, getByDisplayValue } = render(
			<CustomInput placeholder="O e-mail é obrigatório." hasError={false} />,
		);
		const input = getByPlaceholderText("O e-mail é obrigatório.");
		userEvent.type(input, "test@test.com");
		getByDisplayValue("test@test.com");
	});
});
