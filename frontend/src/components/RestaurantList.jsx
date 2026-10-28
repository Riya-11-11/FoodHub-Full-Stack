import RestaurantCard from "./RestaurantCard";
import "./RestaurantList.css";
import { useState, useEffect } from "react";

function RestaurantList({
  pageNumber,
  // selectedCuisine,
  // searchText,
  // selectedSort,
  appliedSelectedCuisine,
  appliedSearchText,
  appliedSelectedSort,
}) {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(
      `${import.meta.env.VITE_API_URL}/api/restaurants?page=${pageNumber}&limit=10&cuisine=${appliedSelectedCuisine}&search=${appliedSearchText}&sort=${appliedSelectedSort}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        console.log("Restaurants received:", data.data);

        setRestaurantsData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [
    pageNumber,
    appliedSelectedCuisine,
    appliedSearchText,
    appliedSelectedSort,
  ]);

  return (
    <main className="restaurants-section" id="restaurants">
      <div className="section-heading">
        <div>
          <h2>Popular Restaurants</h2>
          <p>Top rated and most loved restaurants near you</p>
        </div>

        <a href="#restaurants" className="view-all">
          View All <span>→</span>
        </a>
      </div>
      {loading ? (
        <p>Loading restaurants...</p>
      ) : error ? (
        <p>Error fetching restaurants. Please try again later.</p>
      ) : restaurantsData.length > 0 ? (
        <div className="restaurant-grid">
          {restaurantsData.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <p>No restaurants found.</p>
      )}
    </main>
  );
}

export default RestaurantList;
