import type { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header.component";
import ProductDetails from "../../components/product-details/product-details.component";

const ProductDetailsPage: FunctionComponent = () => {
	const { id, productId } = useParams();

	if (!id || !productId) {
		return <p>Produto não encontrado</p>;
	}

	return (
		<>
			<Header />
			<ProductDetails categoryId={id} productId={productId} />
		</>
	);
};

export default ProductDetailsPage;
