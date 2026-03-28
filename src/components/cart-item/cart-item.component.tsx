import { FunctionComponent, useContext } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'
// import { useDispatch } from 'react-redux'
// import {
//   decreaseCartProductQuantity,
//   increaseCartProductQuantity,
//   removeProductFromCart
// } from '../../store/toolkit/cart/cart.slice'

// Utilities
import CartProduct from '../../types/cart.types'

// Styles
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart-item.styles'
import { CartContext } from '../../contexts/cart.context'

interface CartItemProps {
  product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const AiOutlineCloseIcon = AiOutlineClose as unknown as FunctionComponent<{
    size?: number
  }>

  const {
    removeProductFromCart,
    increaseProductQuantity,
    decreaseProductQuantity
  } = useContext(CartContext)
  // const dispatch = useDispatch()

  const handleRemoveClick = () => {
    removeProductFromCart(product.id)
  }

  // const handleIncreaseClick = () => {
  //   dispatch(increaseCartProductQuantity(product.id))
  // }

  // const handleDecreaseClick = () => {
  //   dispatch(decreaseCartProductQuantity(product.id))
  // }

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <p>{product.quantity}</p>
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton
        onClick={handleRemoveClick}
        aria-label={`Remove ${product.name}`}
      >
        <AiOutlineCloseIcon size={25} />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
