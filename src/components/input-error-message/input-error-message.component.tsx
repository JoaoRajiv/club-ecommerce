import { ReactNode } from 'react'

// Styles
import { InputErrorMessageContainer } from './input-error-message.styles'

const InputErrorMessage = ({ children }: { children: ReactNode }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
