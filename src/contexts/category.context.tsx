import { collection, getDocs } from 'firebase/firestore'
import { createContext, FunctionComponent, useState } from 'react'

// Utilities
import { db } from '../config/firebase.config'
import Category from '../types/category.types'

interface ICategoryContext {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  fetchCategories: () => Promise.resolve()
})

const CategoryContextProvider: FunctionComponent = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)

      const categoriesFromFirestore: Category[] = []

      const querySnapshot = await getDocs(collection(db, 'categories'))

      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data() as Category)
      })

      setCategories(categoriesFromFirestore)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
