import { ComponentType, FunctionComponent } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Utilities
import { useAppSelector } from '../../hooks/redux.hooks'
// import { toggleCart } from '../../store/toolkit/cart/cart.slice'
import {
  selectProductsCount,
  selectProductsTotalPrice
} from '../../store/reducers/cart/cart.selectors'

// Components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal,
  EmptyCart
} from './cart.styles'
import {
  clearCartProducts,
  toggleCart
} from '../../store/reducers/cart/cart.action'

const Cart: FunctionComponent = () => {
  const BsCartCheckIcon = BsCartCheck as unknown as ComponentType<{
    size?: number
  }>
  const { isVisible, products } = useAppSelector((state) => state.cartReducer)

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  const productsCount = useAppSelector(selectProductsCount)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    dispatch(toggleCart())
  }

  const handleClearCartClick = () => {
    dispatch(clearCartProducts())
  }

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart())
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>
        <EmptyCart onClick={handleClearCartClick}>Limpar Carrinho</EmptyCart>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 ? (
        <>
          <CartTotal>Total: R${productsTotalPrice}</CartTotal>
          <CustomButton
            startIcon={<BsCartCheckIcon />}
            onClick={handleGoToCheckoutClick}
          >
            Ir para o Checkout
          </CustomButton>
        </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )
        }
      </CartContent>
    </CartContainer>
  )
}

export default Cart
