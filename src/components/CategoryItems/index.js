import './index.css'

const CategoryItems = props => {
  const {eachOption, onClickCategory} = props
  const {name, categoryId} = eachOption

  const onClickBtnc = () => {
    onClickCategory(categoryId)
  }

  return (
    <li className="category-items" onClick={onClickBtnc}>
      <p>{name}</p>
    </li>
  )
}

export default CategoryItems
