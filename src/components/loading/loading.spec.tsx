import { render } from "@testing-library/react";
import Loading from "./loading.component";

describe("Loading", () => {
	it("should show a message if there is one", () => {
		const { getByText } = render(
			<Loading message="Entrando, por favor aguarde..." />,
		);
		getByText("Entrando, por favor aguarde...");
	});
});
