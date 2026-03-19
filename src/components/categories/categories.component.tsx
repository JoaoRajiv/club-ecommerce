import { useState } from 'react'
import Category from '../../types/category.types'
import './categories.styles.css'
// import axios from 'axios'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  // const fetchCategories = async () => {
  //   try {
  //     const {data} = await axios.get(`${env.apiUrl}/api/categories`)
  //     setCategories(data)
  //   } catch (error) {
  //     console.error('Error fetching categories:', error)
  //   }
  // }

  // useEffect(() => {
  //   fetchCategories()
  // }, [])
  return (
    <div className='categories-container'>
      <div className='categories-content'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Categories
