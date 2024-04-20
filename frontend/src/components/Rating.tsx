function getStarIcon(rating: number, starIndex: number) {
  const predecessorHalf = starIndex - 0.5
  if (rating >= starIndex) {
    return 'fas fa-star'
  } else {
    if (rating >= predecessorHalf) {
      return 'fas fa-star-half-alt'
    } else {
      return 'far fa-star'
    }
  }
}

function Rating(props: {
  rating: number,
  numReviews: number,
  caption?: string,
}) {
  const {rating, numReviews, caption} = props
  return <div className="rating">
    <span>
      <i className={getStarIcon(rating, 1)}/>
    </span>
    <span>
      <i className={getStarIcon(rating, 2)}/>
    </span>
    <span>
      <i className={getStarIcon(rating, 3)}/>
    </span>
    <span>
      <i className={getStarIcon(rating, 4)}/>
    </span>
    <span>
      <i className={getStarIcon(rating, 5)}/>
    </span>
    {caption ? (
      <span>{caption}</span>
    ) : numReviews != 0 ? (
      <span>{` ${numReviews} reviews`}</span>
    ) : (
      ''
    )}
  </div>
}

export default Rating

