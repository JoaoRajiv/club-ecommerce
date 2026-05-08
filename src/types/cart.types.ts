import type Product from './product.types'

interface CartProduct extends Product {
  quantity: number
}

export default CartProduct
