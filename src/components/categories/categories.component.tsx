import { useEffect, useState } from 'react'
import Category from '../../types/category.types'
import './categories.styles.css'
import CategoryItem from '../category-item/category-item.component'
// import axios from 'axios'

// Inserindo o mock aqui para facilitar, mas o ideal é mover para outro arquivo.
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'hats',
    displayName: 'Chapéus',
    imageUrl:
      'https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '2',
    name: 'sneakers',
    displayName: 'Tênis',
    imageUrl:
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    name: 'jackets',
    displayName: 'Jaquetas',
    imageUrl:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '4',
    name: 'womens',
    displayName: 'Feminino',
    imageUrl:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '5',
    name: 'mens',
    displayName: 'Masculino',
    imageUrl:
      'https://images.unsplash.com/photo-1490578474895-699bc4e3f44f?auto=format&fit=crop&w=500&q=80'
  }
]

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories)

  // const fetchCategories = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/categories`
  //     )
  //     setCategories(data)
  //   } catch (error) {
  //     console.error('Error fetching categories:', error)
  //   }
  // }

  useEffect(() => {
    // fetchCategories()
  }, [])
  return (
    <div className='categories-container'>
      <div className='categories-content'>
        {categories.map((category) => (
          <div key={category.id} className='category-item'>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
