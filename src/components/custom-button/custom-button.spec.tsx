import { render } from "@testing-library/react";
import CustomButton from "./custom-button.component";

describe("CustomButton", () => {
	it("should render with correct children", () => {
		const { getByText } = render(<CustomButton>Test</CustomButton>);
		getByText("Test");
	});
});
