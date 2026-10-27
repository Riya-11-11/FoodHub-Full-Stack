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

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/restaurants?page=${pageNumber}&limit=10&cuisine=${appliedSelectedCuisine}&search=${appliedSearchText}&sort=${appliedSelectedSort}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data);
        console.log("Restaurants received:", data.data);

        setRestaurantsData(data.data);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
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

      <div className="restaurant-grid">
        {restaurantsData.map((restaurant) => (
          <RestaurantCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}

export default RestaurantList;
