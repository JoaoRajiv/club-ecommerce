import { ComponentType, FunctionComponent, useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

// Utilities
// import { useAppSelector } from '../../hooks/redux.hooks'
// import { toggleCart } from '../../store/toolkit/cart/cart.slice'
// import {
//   selectProductsCount,
//   selectProductsTotalPrice
// } from '../../store/reducers/cart/cart.selectors'

// Components
// import CustomButton from '../custom-button/custom-button.component'
// import CartItem from '../cart-item/cart-item.component'

// Styles
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'

const Cart: FunctionComponent = () => {
  const BsCartCheckIcon = BsCartCheck as unknown as ComponentType<{
    size?: number
  }>
  const { products, productsTotalPrice, productsCount, isVisible, toggleCart } =
    useContext(CartContext)
  // const { isVisible, products } = useAppSelector((state) => state.cartReducer)

  // const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  // const productsCount = useAppSelector(selectProductsCount)

  const navigate = useNavigate()

  // const dispatch = useDispatch()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
    toggleCart()
  }

  const handleEscapeAreaClick = () => {
    // dispatch(toggleCart())
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

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
        )}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
