import styled from 'styled-components'
import Colors from '../../theme/theme.colors'

interface CategoryItemContainerProps {
  backgroundImage: string
}

export const CategoryItemContainer = styled.div<CategoryItemContainerProps>`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  min-height: 320px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-image: ${(props) => `linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.16) 45%, rgba(0, 0, 0, 0.70) 100%), url('${props.backgroundImage}')`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.18) 40%, rgba(0, 0, 0, 0.72) 100%);
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    min-height: 300px;
  }
`

export const CategoryName = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 24px 20px 20px;
  color: ${Colors.text.white};
  text-align: left;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  transition: transform 0.35s ease;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }

  p {
    margin: 0;
  }

  & p:nth-child(1) {
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.2;
  }

  & p:nth-child(2) {
    margin-top: 6px;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`
