import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Styles
import { Container } from './categories-overview.styles'

// Components
import Loading from '../loading/loading.component'
import CategoryOverview from '../category-overview/category-overview.component'
import { useAppSelector } from '../../hooks/redux.hooks'
import { fetchCategories } from '../../store/reducers/category/category.action'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!categories?.length) {
      dispatch(fetchCategories() as any)
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
