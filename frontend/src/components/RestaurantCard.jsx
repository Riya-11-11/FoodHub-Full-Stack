import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-image">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
        />

        <button
          className="favorite-button"
          aria-label={`Favorite ${restaurant.name}`}
        >
          ♡
        </button>
      </div>

      <div className="restaurant-details">
        <div className="rating-row">
          <span className="rating-badge">
            ★ {restaurant.rating}
          </span>

          <span className="review-count">
            ({restaurant.reviews})
          </span>
        </div>

        <h3>{restaurant.name}</h3>

        <div className="cuisine-tags">
            <span>{restaurant.cuisine}</span>
        </div>

        <div className="restaurant-footer">
          <p className="restaurant-address">
            <span>📍</span>
            {restaurant.address}
          </p>

          <button
            className="restaurant-arrow"
            aria-label={`View ${restaurant.name}`}
          >
            ›
          </button>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;