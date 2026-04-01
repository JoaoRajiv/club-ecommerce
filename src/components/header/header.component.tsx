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
import { UserContext } from '../../contexts/user.context'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/reducers/user/user.action'

const Header = () => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const dispatch = useDispatch()
  const { toggleCart, productsCount } = useContext(CartContext)
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

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleHomeClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated ? (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        ) : (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          {/* @ts-expect-error: Conflito temporário de tipagem do React 17 */}
          <BsCart size={25} />
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
