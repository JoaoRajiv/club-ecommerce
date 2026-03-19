import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import './header.styles.css'
import { BsCart } from 'react-icons/bs'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar Conta</HeaderItem>
        <HeaderItem>
          {/* @ts-expect-error: Conflito temporário de tipagem do React 17 */}
          <BsCart size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
