import { FunctionComponent } from 'react'
import Header from '../../components/header/header.component'
import CategoryDetails from '../../components/category-details/category-detail.component'
import { useParams } from 'react-router-dom'

const CategoryDetailsPage: FunctionComponent = () => {
  const { id } = useParams()
  if (!id) return <p>Categoria não encontrada</p>
  return (
    <>
      <Header />
      <CategoryDetails categoryId={id} />
    </>
  )
}

export default CategoryDetailsPage
