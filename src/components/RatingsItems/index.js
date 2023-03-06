import './index.css'

const RatingsItems = props => {
  const {eachList, onRatingClick} = props
  const {imageUrl, ratingId} = eachList

  const onClickBtnR = () => {
    onRatingClick(ratingId)
  }

  return (
    <li className="rating-items">
      <button type="button" className="rating-Btn" onClick={onClickBtnR}>
        <img src={imageUrl} alt={`rating ${ratingId}`} className="rating-img" />{' '}
        & up
      </button>
    </li>
  )
}

export default RatingsItems
