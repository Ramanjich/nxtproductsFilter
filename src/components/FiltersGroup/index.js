import CategoryItems from '../CategoryItems'

import RatingsItems from '../RatingsItems'

import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    categoryOptions,
    onSearching,
    onCategory,
    onRating,
    onClickClearBtn,
    searchInput,
    onChangeInpuse,
  } = props

  const onChangeInput = event => {
    if (event.key === 'Enter') {
      onSearching()
    }
  }

  const onClickCategory = idC => {
    onCategory(idC)
  }

  const onRatingClick = idR => {
    onRating(idR)
  }

  const onClearFilterClick = () => {
    onClickClearBtn()
  }

  const onChangeSearch = event => {
    onChangeInpuse(event.target.value)
  }

  return (
    <div className="filters-group-container">
      <div className="search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-ele"
          onChange={onChangeSearch}
          onKeyDown={onChangeInput}
          value={searchInput}
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
          alt="search icon"
          className="icon-img"
        />
      </div>
      <h1 className="category-heading">Category</h1>
      {categoryOptions.map(eachOption => (
        <CategoryItems
          eachOption={eachOption}
          key={eachOption.categoryId}
          onClickCategory={onClickCategory}
        />
      ))}
      <h1 className="rating-heading">Ratings</h1>
      {ratingsList.map(eachList => (
        <RatingsItems
          eachList={eachList}
          key={eachList.ratingId}
          onRatingClick={onRatingClick}
        />
      ))}
      <button type="button" className="clear-btn" onClick={onClearFilterClick}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
