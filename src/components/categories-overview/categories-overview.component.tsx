import { FunctionComponent, useContext, useEffect } from 'react'
// import { useDispatch } from 'react-redux'

// Styles
import { Container } from './categories-overview.styles'

// Components
// import CategoryOverview from '../category-overview/category-overview.component'
import Loading from '../loading/loading.component'
import { CategoryContext } from '../../contexts/category.context'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  // const dispatch = useDispatch()

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      {categories.map((category) => (
        <div key={category.id} className='category-overview-item'>
          {/* <CategoryOverview category={category} /> */}
          <h2>{category.displayName}</h2>
        </div>
      ))}
    </Container>
  )
}

export default CategoriesOverview
