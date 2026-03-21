import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import type { ComponentType } from 'react'
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import CustomInput from '../../components/custom-input/custom-input.component'

import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const FiLogInIcon = FiLogIn as unknown as ComponentType<{ size?: number }>

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log('Form Data:', data)
  }

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
            <CustomInput
              type='email'
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', { required: true })}
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              type='password'
              placeholder='Digite sua senha'
              {...register('password', { required: true })}
            />
          </LoginInputContainer>
          <CustomButton
            startIcon={<FiLogInIcon size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
