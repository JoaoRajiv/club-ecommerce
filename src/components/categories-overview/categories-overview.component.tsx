import type { FunctionComponent } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { fetchCategories } from "../../store/toolkit/category/category.slice";
import type Category from "../../types/category.types";
import CategoryOverview from "../category-overview/category-overview.component";
// Components
import Loading from "../loading/loading.component";
// Styles
import { Container } from "./categories-overview.styles";

const CategoriesOverview: FunctionComponent = () => {
	const { categories, isLoading } = useAppSelector(
		(state) => state.categoryReducer,
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!categories?.length) {
			dispatch(fetchCategories() as any);
		}
	}, [categories?.length, dispatch]);

	if (isLoading) return <Loading message="Carregando categorias..." />;

	return (
		<Container>
			{categories.map((category: Category) => (
				<CategoryOverview key={category.id} category={category} />
			))}
		</Container>
	);
};

export default CategoriesOverview;
