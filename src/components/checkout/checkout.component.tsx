import { ComponentType, FunctionComponent, useContext, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs'

import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'

import {
  CheckoutContainer,
  CheckoutTitle,
  CheckoutProducts,
  CheckoutTotal
} from './checkout.styles'
import axios from 'axios'
import Loading from '../loading/loading.component'

const Checkout: FunctionComponent = () => {
  const BsBagCheckIcon = BsBagCheck as unknown as ComponentType<{}>

  const { products, productsTotalPrice } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(false)

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL!}/create-checkout-session`,
        {
          products
        }
      )
      window.location.href = data.url
      console.log('Resposta da API:', data.url)
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CheckoutContainer>
      {isLoading && <Loading />}
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

          <CustomButton
            startIcon={<BsBagCheckIcon />}
            onClick={handleFinishPurchaseClick}
          >
            Finalizar Compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho está vazio!</p>
      )}
    </CheckoutContainer>
  )
}

export default Checkout
