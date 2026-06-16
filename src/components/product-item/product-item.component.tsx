import type { ComponentType, FunctionComponent, MouseEvent } from "react";
import { useCallback } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../store/toolkit/cart/cart.slice";

// Utilities
import type Product from "../../types/product.types";
// Components
import CustomButton from "../custom-button/custom-button.component";
// Styles
import {
	ProductContainer,
	ProductImage,
	ProductInfo,
} from "./product-item.styles";

interface ProductItemProps {
	product: Product;
	categoryId: string;
}

const ProductItem: FunctionComponent<ProductItemProps> = ({
	product,
	categoryId,
}) => {
	const BsCartPlusIcon = BsCartPlus as unknown as ComponentType<{
		size?: number;
	}>;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleAddToCartClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			dispatch(addProductToCart(product));
		},
		[dispatch, product],
	);

	const handleProductClick = useCallback(() => {
		navigate(`/category/${categoryId}/product/${product.id}`);
	}, [navigate, categoryId, product.id]);

	return (
		<ProductContainer>
			<ProductImage imageUrl={product.imageUrl} onClick={handleProductClick}>
				<CustomButton
					startIcon={<BsCartPlusIcon />}
					onClick={handleAddToCartClick}
				>
					Adicionar ao carrinho
				</CustomButton>
			</ProductImage>

			<ProductInfo onClick={handleProductClick}>
				<p>{product.name}</p>
				<p>R${product.price}</p>
			</ProductInfo>
		</ProductContainer>
	);
};

export default ProductItem;
