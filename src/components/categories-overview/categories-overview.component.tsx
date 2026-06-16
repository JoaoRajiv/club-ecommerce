import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux.hooks";
import { fetchCategories } from "../../store/toolkit/category/category.slice";
import CategoryOverview from "../category-overview/category-overview.component";
// Components
import Loading from "../loading/loading.component";
// Styles
import { Container } from "./categories-overview.styles";

const CategoriesOverview: FunctionComponent = () => {
	const { categories, isLoading } = useAppSelector(
		(state) => state.categoryReducer,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!categories?.length) {
			dispatch(fetchCategories() as any);
		}
	}, [categories?.length, dispatch]);

	if (isLoading) return <Loading message="Carregando categorias..." />;

	return (
		<Container>
			{categories.map((category) => (
				<CategoryOverview key={category.id} category={category} />
			))}
		</Container>
	);
};

export default CategoriesOverview;
