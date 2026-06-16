import styled from "styled-components";
import Colors from "../../theme/theme.colors";

interface ProductImageProps {
	imageUrl: string;
}

export const Container = styled.div`
  padding: 0px 40px 40px 40px;
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 8px;

  p {
    font-size: 21px;
    font-weight: 500;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 60px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

export const ProductImage = styled.div<ProductImageProps>`
  background-image: ${(props) => `url('${props.imageUrl}')`};
  height: 500px;
  width: 400px;
  min-width: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    height: 380px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex: 1;
`;

export const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${Colors.text.dark};
`;

export const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${Colors.text.dark};
`;

export const ProductDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${Colors.input.placeholder};
`;

export const AddToCartButton = styled.div`
  max-width: 300px;
  margin-top: 10px;
`;

export const NotFoundMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 40px;
  text-align: center;
`;
