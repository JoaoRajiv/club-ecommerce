import { ComponentType, FunctionComponent, useContext } from 'react'
import { BsCartPlus } from 'react-icons/bs'

// Components
import CustomButton from '../custom-button/custom-button.component'

// Styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

// Utilities
import Product from '../../types/product.types'
import { CartContext } from '../../contexts/cart.context'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const BsCartPlusIcon = BsCartPlus as unknown as ComponentType<{
    size?: number
  }>
  const { addProductToCart } = useContext(CartContext)

  const handleAddToCartClick = () => {
    addProductToCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton
          startIcon={<BsCartPlusIcon />}
          onClick={handleAddToCartClick}
        >
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>

      <ProductInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
