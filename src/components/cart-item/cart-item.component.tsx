import { FunctionComponent } from 'react'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
// import {
//   decreaseCartProductQuantity,
//   increaseCartProductQuantity,
//   removeProductFromCart
// } from '../../store/toolkit/cart/cart.slice'
import {
  decreaseCartProductQuantity,
  increaseCartProductQuantity,
  removeProductFromCart
} from '../../store/reducers/cart/cart.action'

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

interface CartItemProps {
  product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
  const AiOutlineCloseIcon = AiOutlineClose as unknown as FunctionComponent<{
    size?: number
  }>
  const AiOutlineMinusIcon = AiOutlineMinus as unknown as FunctionComponent<{
    onClick?: () => void
    size?: number
  }>
  const AiOutlinePlusIcon = AiOutlinePlus as unknown as FunctionComponent<{
    onClick?: () => void
    size?: number
  }>

  const dispatch = useDispatch()

  const handleRemoveClick = () => {
    dispatch(removeProductFromCart(product.id))
  }

  const handleIncreaseClick = () => {
    dispatch(increaseCartProductQuantity(product.id))
  }

  const handleDecreaseClick = () => {
    dispatch(decreaseCartProductQuantity(product.id))
  }

  return (
    <CartItemContainer>
      <CartItemImage imageUrl={product.imageUrl} />

      <CartItemInfo>
        <p>{product.name}</p>
        <p>R${product.price}</p>

        <CartItemQuantity>
          <AiOutlineMinusIcon
            size={20}
            onClick={handleDecreaseClick}
            aria-label={`Decrease quantity of ${product.name}`}
          />
          <p>{product.quantity}</p>
          <AiOutlinePlusIcon
            size={20}
            onClick={handleIncreaseClick}
            aria-label={`Increase quantity of ${product.name}`}
          />
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
