import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useContext, useEffect, type ComponentType } from 'react'
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

import validator from 'validator'

import { useForm } from 'react-hook-form'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { auth, db, googleProvider } from '../../config/firebase.config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { UserContext } from '../../contexts/user.context'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const FiLogInIcon = FiLogIn as unknown as ComponentType<{ size?: number }>
  const BsGoogleIcon = BsGoogle as unknown as ComponentType<{ size?: number }>

  const navigate = useNavigate()

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit
  } = useForm<LoginForm>()

  const { isAuthenticated } = useContext(UserContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log(userCredentials)
    } catch (error) {
      const _error = error as AuthError
      console.log(_error)
      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError('password', { type: 'invalid' })
      }

      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError('email', { type: 'notFound' })
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredentials.user.uid)
        )
      )
      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0] || ''
        const lastName =
          userCredentials.user.displayName?.split(' ').slice(1).join('') || ''
        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
        console.log('Novo usuário criado no Firestore')
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }

  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline>
            Bem-vindo de volta! Faça login para continuar.
          </LoginHeadline>
          <CustomButton
            startIcon={<BsGoogleIcon size={18} />}
            onClick={handleGoogleSignIn}
          >
            Entrar com Google
          </CustomButton>
          <LoginSubtitle>Ou entre com o seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              type='email'
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                }
              })}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === 'invalid' && (
              <InputErrorMessage>
                O e-mail não foi encontrado.
              </InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Por favor, insira um e-mail válido.
              </InputErrorMessage>
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              type='password'
              placeholder='Digite sua senha'
              {...register('password', { required: true })}
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === 'invalid' && (
              <InputErrorMessage>A senha é inválida.</InputErrorMessage>
            )}
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
