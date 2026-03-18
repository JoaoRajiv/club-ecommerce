import './header.styles.css'
import { BsCart } from 'react-icons/bs'

const Header = () => {
  return (
    <header className='header-container'>
      <h2 className='header-title'>CLUB CLOTHING</h2>
      <div className='header-items'>
        <div className='header-item'>Explorar</div>
        <div className='header-item'>Login</div>
        <div className='header-item'>Criar Conta</div>
        <div className='header-item'>
          {/* @ts-expect-error: Conflito temporário de tipagem do React 17 */}
          <BsCart size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </div>
      </div>
    </header>
  )
}

export default Header
