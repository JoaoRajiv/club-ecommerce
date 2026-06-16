import { collection, getDocs, query, where } from "firebase/firestore";
import type { ComponentType, FunctionComponent } from "react";
import { useCallback, useEffect, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { db } from "../../config/firebase.config";
import { addProductToCart } from "../../store/toolkit/cart/cart.slice";
import type Category from "../../types/category.types";
import type Product from "../../types/product.types";
import CustomButton from "../custom-button/custom-button.component";
import Loading from "../loading/loading.component";
import {
	AddToCartButton,
	BackButton,
	Container,
	Content,
	NotFoundMessage,
	ProductDescription,
	ProductImage,
	ProductInfo,
	ProductName,
	ProductPrice,
} from "./product-details.styles";

interface ProductDetailsProps {
	categoryId: string;
	productId: string;
}

const ProductDetails: FunctionComponent<ProductDetailsProps> = ({
	categoryId,
	productId,
}) => {
	const BiChevronLeftIcon = BiChevronLeft as unknown as ComponentType<{
		size?: number;
	}>;
	const BsCartPlusIcon = BsCartPlus as unknown as ComponentType<{
		size?: number;
	}>;

	const [product, setProduct] = useState<Product | null>(null);
	const [categoryName, setCategoryName] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleBackClick = useCallback(() => {
		navigate(`/category/${categoryId}`);
	}, [navigate, categoryId]);

	const handleAddToCartClick = useCallback(() => {
		if (product) {
			dispatch(addProductToCart(product));
		}
	}, [dispatch, product]);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setIsLoading(true);
				setIsNotFound(false);

				const querySnapshot = await getDocs(
					query(collection(db, "categories"), where("id", "==", categoryId)),
				);

				const category = querySnapshot.docs[0]?.data() as Category | undefined;

				if (!category) {
					setIsNotFound(true);
					return;
				}

				setCategoryName(category.displayName);

				const foundProduct = category.products.find((p) => p.id === productId);

				if (!foundProduct) {
					setIsNotFound(true);
					return;
				}

				setProduct(foundProduct);
			} catch (error) {
				console.log(error);
				setIsNotFound(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProduct();
	}, [categoryId, productId]);

	if (isLoading) return <Loading />;

	if (isNotFound || !product) {
		return (
			<Container>
				<BackButton onClick={handleBackClick}>
					<BiChevronLeftIcon size={36} />
					<p>Voltar</p>
				</BackButton>
				<NotFoundMessage>Produto não encontrado.</NotFoundMessage>
			</Container>
		);
	}

	return (
		<Container>
			<BackButton onClick={handleBackClick}>
				<BiChevronLeftIcon size={36} />
				<p>{categoryName}</p>
			</BackButton>

			<Content>
				<ProductImage imageUrl={product.imageUrl} />

				<ProductInfo>
					<ProductName>{product.name}</ProductName>
					<ProductPrice>R${product.price}</ProductPrice>
					<ProductDescription>
						Produto da categoria {categoryName}. Qualidade premium com design
						exclusivo para o seu estilo.
					</ProductDescription>

					<AddToCartButton>
						<CustomButton
							startIcon={<BsCartPlusIcon />}
							onClick={handleAddToCartClick}
						>
							Adicionar ao carrinho
						</CustomButton>
					</AddToCartButton>
				</ProductInfo>
			</Content>
		</Container>
	);
};

export default ProductDetails;
