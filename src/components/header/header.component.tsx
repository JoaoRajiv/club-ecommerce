import { signOut } from 'firebase/auth'
import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { BsCart } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase.config'
import { ComponentType } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/reducers/user/user.action'
import { toggleCart } from '../../store/reducers/cart/cart.action'
import { useAppSelector } from '../../hooks/redux.hooks'
import { selectProductsCount } from '../../store/reducers/cart/cart.selectors'

const Header = () => {
  const BsCartIcon = BsCart as unknown as ComponentType<{ size?: number }>
  const { isAuthenticated, currentUser } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const dispatch = useDispatch()
  const productsCount = useAppSelector(selectProductsCount)

  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignUpClick = () => {
    navigate('/sign-up')
  }
  const handleHomeClick = () => {
    navigate('/')
  }
  const handleExploreClick = () => {
    navigate('/explore')
  }
  const handleSignOutClick = () => {
    dispatch(logoutUser())
    signOut(auth)
  }
  const handleCartClick = () => {
    dispatch(toggleCart())
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleHomeClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        {isAuthenticated && (
          <HeaderItem>Olá, {currentUser.firstName}</HeaderItem>
        )}
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated ? (
          <>
            <HeaderItem onClick={handleLoginClick}>Entrar</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        ) : (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={handleCartClick}>
          <BsCartIcon size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
