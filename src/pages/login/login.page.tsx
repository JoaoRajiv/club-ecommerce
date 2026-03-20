import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>
            Bem-vindo de volta! Faça login para continuar.
          </LoginHeadline>
          {/* @ts-expect-error: Conflito temporário de tipagem do React 17 */}
          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com Google
          </CustomButton>
          <LoginSubtitle>Ou entre com o seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>
            <input type='email' placeholder='Digite seu e-mail' />
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <input type='password' placeholder='Digite sua senha' />
          </LoginInputContainer>
          {/* @ts-expect-error: Conflito temporário de tipagem do React 17 */}
          <CustomButton startIcon={<FiLogIn size={18} />}>Entrar</CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
