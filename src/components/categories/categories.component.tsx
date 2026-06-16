import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux.hooks";
import { fetchCategories } from "../../store/toolkit/category/category.slice";
import type Category from "../../types/category.types";
import CategoryItem from "../category-item/category-item.component";
import Loading from "../loading/loading.component";
import { CategoriesContainer, CategoriesContent } from "./categories.styles";

const Categories = () => {
	// const { categories, isLoading } = useContext(CategoryContext)

	const { categories, isLoading } = useAppSelector(
		(state) => state.categoryReducer,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategories() as any);
	}, [dispatch]);
	return (
		<>
			<CategoriesContainer>
				{isLoading && <Loading />}
				<CategoriesContent>
					{categories.map((category: Category) => (
						<div key={category.id} className="category-item">
							<CategoryItem category={category} />
						</div>
					))}
				</CategoriesContent>
			</CategoriesContainer>
		</>
	);
};

export default Categories;
