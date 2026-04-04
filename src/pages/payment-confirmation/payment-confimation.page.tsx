import { ComponentType, FunctionComponent, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome
} from 'react-icons/ai'

// Styles
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confimation.styles'

// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'

// Utilities
import Colors from '../../theme/theme.colors'
import { CartContext } from '../../contexts/cart.context'
import { useDispatch } from 'react-redux'
import { clearCartProducts } from '../../store/reducers/cart/cart.action'

const PaymentConfirmationPage: FunctionComponent = () => {
  const AiOutlineCheckCircleIcon =
    AiOutlineCheckCircle as unknown as ComponentType<{
      size?: number
      color?: string
    }>
  const AiOutlineCloseCircleIcon =
    AiOutlineCloseCircle as unknown as ComponentType<{
      size?: number
      color?: string
    }>
  const AiOutlineHomeIcon = AiOutlineHome as unknown as ComponentType<{
    size?: number
  }>

  const { clearProducts } = useContext(CartContext)
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled') === 'true'

  useEffect(() => {
    if (status === 'true') {
      dispatch(clearCartProducts())
    }
  }, [status])

  const handleGoToHomePageClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />
      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircleIcon size={120} color={Colors.success} />
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircleIcon size={120} color={Colors.error} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente.
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHomeIcon />}
            onClick={handleGoToHomePageClick}
          >
            Ir para a Página Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmationPage
