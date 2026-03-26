import { ComponentType, FunctionComponent, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

// Utilities
import { db } from '../../config/firebase.config'
import Category from '../../types/category.types'

// Components
import ProductItem from '../product-item/product-item.component'
import Loading from '../loading/loading.component'

// Styles
import {
  Container,
  CategoryTitle,
  IconContainer,
  ProductsContainer
} from './category-details.styles'

interface CategoryDetailsProps {
  categoryId: string
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId
}) => {
  const BiChevronLeftIcon = BiChevronLeft as unknown as ComponentType<{
    size?: number
  }>
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true)

        const querySnapshot = await getDocs(
          query(collection(db, 'categories'), where('id', '==', categoryId))
        )

        const category = querySnapshot.docs[0]?.data()

        setCategory(category as Category)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleBackClick}>
          <BiChevronLeftIcon size={36} />
        </IconContainer>
        <p>Explorar: {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  )
}

export default CategoryDetails
