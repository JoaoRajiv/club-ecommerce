import {
  createContext,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import CartProduct from '../types/cart.types'
import Product from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  productsTotalPrice: number
  productsCount: number
  products: CartProduct[]
  toggleCart: () => void
  addProductToCart: (product: Product) => void
  removeProductFromCart: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
  clearProducts: () => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  productsTotalPrice: 0,
  productsCount: 0,
  products: [],
  toggleCart: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  clearProducts: () => {}
})

const CartContextProvider: FunctionComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  useEffect(() => {
    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem('cartProducts')!
    )

    setProducts(productsFromLocalStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(products))
  }, [products])

  const productsTotalPrice = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.price * currentProduct.quantity
    }, 0)
  }, [products])

  const productsCount = useMemo(() => {
    return products.reduce((acc, currentProduct) => {
      return acc + currentProduct.quantity
    }, 0)
  }, [products])

  const toggleCart = () => {
    setIsVisible((prev) => !prev)
  }

  const addProductToCart = useCallback((product: Product) => {
    setProducts((currentProducts) => {
      // Otimização: percorre o array apenas uma vez
      const productIndex = currentProducts.findIndex(
        (item) => item.id === product.id
      )

      if (productIndex >= 0) {
        // Copia o array e o item para manter a imutabilidade, mas altera só o índice exato
        const updatedProducts = [...currentProducts]
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + 1
        }
        return updatedProducts
      }

      return [...currentProducts, { ...product, quantity: 1 }]
    })
  }, [])

  const removeProductFromCart = (productId: string) => {
    setProducts((products) =>
      products.filter((product) => product.id !== productId)
    )
  }

  const increaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((products) =>
      products
        .map((product) =>
          product.id === productId
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    )
  }

  const clearProducts = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        productsTotalPrice,
        productsCount,
        toggleCart,
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        clearProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
