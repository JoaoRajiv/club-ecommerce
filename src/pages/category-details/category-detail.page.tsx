import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import CategoryDetails from "../../components/category-details/category-detail.component";
import Header from "../../components/header/header.component";

const CategoryDetailsPage: FunctionComponent = () => {
	const { id } = useParams();
	if (!id) return <p>Categoria não encontrada</p>;
	return (
		<>
			<Header />
			<CategoryDetails categoryId={id} />
		</>
	);
};

export default CategoryDetailsPage;
