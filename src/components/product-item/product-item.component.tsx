import { ComponentType, FunctionComponent } from 'react'
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

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const BsCartPlusIcon = BsCartPlus as unknown as ComponentType<{
    size?: number
  }>

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton startIcon={BsCartPlusIcon}>
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
