import { useEffect } from 'react'

import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import Loading from '../loading/loading.component'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/toolkit/category/category.slice'
import type Category from '../../types/category.types'
import { useAppSelector } from '../../hooks/redux.hooks'

const Categories = () => {
  // const { categories, isLoading } = useContext(CategoryContext)

  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [dispatch])
  return (
    <>
      <CategoriesContainer>
        {isLoading && <Loading />}
        <CategoriesContent>
          {categories.map((category: Category) => (
            <div key={category.id} className='category-item'>
              <CategoryItem category={category} />
            </div>
          ))}
        </CategoriesContent>
      </CategoriesContainer>
    </>
  )
}

export default Categories
