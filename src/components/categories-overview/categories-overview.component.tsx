import { FunctionComponent, useContext, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// Styles
import { Container } from './categories-overview.styles'

// Components
// import CategoryOverview from '../category-overview/category-overview.component'
import Loading from '../loading/loading.component'
import { CategoryContext } from '../../contexts/category.context'
import CategoryOverview from '../category-overview/category-overview.component'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  // const dispatch = useDispatch()

  useEffect(() => {
    if (!categories?.length) {
      fetchCategories()
    }
  }, [categories?.length, fetchCategories])

  if (isLoading) return <Loading message='Carregando categorias...' />

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
