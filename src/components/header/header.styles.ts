import styled from "styled-components";
import Colors from "../../theme/theme.colors";

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${Colors.background.dark};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: ${Colors.text.white};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderTitle = styled.h2`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${Colors.text.white};
  transition: color 0.2s ease;

  &:hover {
    cursor: pointer;
    color: #ffb813;
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

export const HeaderItems = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-evenly;
  }
`;

export const HeaderItem = styled.div`
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: ${Colors.text.white};
  transition: color 0.2s ease;

    @media (max-width: 768px) {
      margin-right: 0;
    }

  &:hover {
    cursor: pointer;
    color: #ffb813;
  }
`;
