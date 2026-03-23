import { useEffect, useState } from 'react'
import Category from '../../types/category.types'

import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/firebase.config'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFirestore: Category[] = []
      const querySnapshot = await getDocs(collection(db, 'categories'))
      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data() as Category)
      })
      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <CategoriesContainer>
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id} className='category-item'>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
